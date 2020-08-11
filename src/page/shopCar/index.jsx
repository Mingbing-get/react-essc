import React from 'react';
import './index.css';
import Router from '../../router';
import TopBar from "../../component/topBar";
import SelectCard from '../../component/selectCard';
import message from '../../component/message';
import model from '../../component/model';

import ActionBar from './actionBar';

import LS from '../../interface/TDLocalStorage.js';

import { connect } from 'react-redux';

class ShopCar extends React.Component{

    constructor(){
        super();
        this.state={
            carData:null,
            status:'管理',
            total:0,
            selectAll:false,
            selectIds:[]
        };
    };

    componentDidMount(){
        if (!this.props.user.login && !localStorage.getItem('login')){
            this.props.history.push('/login');
            return;
        }
        let user = this.props.user;
        if (!user.login)
            user = LS.getLocalStorage('login');
        fetch('/api/getcar?zhanghu='+user.zhanghu)
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    let totaltemp = 0;
                    let selectAllTemp = true;
                    let idsTemp = [];
                    data.data.forEach((value)=>{
                        value.images = value.images.split(';');
                        if (value.cselect==='是'){
                            idsTemp.push(value.id);
                            totaltemp += value.nowprice*value.count;
                        }
                        else
                            selectAllTemp = false;
                    });
                    this.setState({
                        carData:data.data,
                        total:totaltemp.toFixed(2),
                        selectAll:selectAllTemp,
                        selectIds:idsTemp
                    });
                }
            })
            .catch((error)=>{});
    };

    selectClick = (e, id)=>{
        e.stopPropagation();
        let index = 0;
        let selectAllTemp = true;
        let idsTemp = [];
        //找下标并且判断是否全选
        this.state.carData.forEach((value, i)=>{
            if (value.id === id){
                index = i;
                if (value.cselect === '是')
                    selectAllTemp = false
            }
            else {
                if (value.cselect === '否')
                    selectAllTemp = false
            }
        });

        //改变选择状态和选中状态的数据的数据
        let item = {...this.state.carData[index]};
        if (item.cselect === '是'){
            item.cselect = '否';
            idsTemp = this.state.selectIds.filter((value)=>{
                return value !== item.id
            });
        }
        else {
            item.cselect = '是';
            idsTemp = [...this.state.selectIds,item.id];
        }

        //计算改变后的合计
        let changeCount = item.nowprice*item.count;
        if (item.cselect === '否')
            changeCount = this.state.total-changeCount;
        else
            changeCount = changeCount+parseFloat(this.state.total);

        //网络请求同步
        let data = {
            id:item.id,
            cselect:item.cselect
        };
        fetch('/pai/updatecar', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status===1){
                    this.setState({
                        carData:[...this.state.carData.slice(0,index),item,...this.state.carData.slice(index+1)],
                        total:changeCount.toFixed(2),
                        selectAll:selectAllTemp,
                        selectIds:idsTemp
                    });
                }
            })
            .catch((error)=>{});
    };

    selectAllClick = (e)=>{
        e.stopPropagation();
        //准备数据
        let totalTemp = 0;
        let idsTemp = [];
        let datatemp = Array.from(this.state.carData,(value)=>{
            totalTemp += value.nowprice*value.count;
            idsTemp.push(value.id);
            value.cselect=this.state.selectAll?'否':'是';
            return value;
        });
        let data = {
            cselect:this.state.selectAll?'否':'是',
        };
        data.ids = idsTemp.join(',');
        data.ids = '('+data.ids+')';

        //请求服务器，同步数据
        fetch('/pai/updateallcar', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status===1){
                    this.setState({
                        total:this.state.selectAll?0:totalTemp.toFixed(2),
                        selectIds:this.state.selectAll?[]:idsTemp,
                        selectAll:!this.state.selectAll,
                        carData:datatemp
                    });
                }
            })
            .catch((error)=>{});
    };

    statusClick = (e)=>{
        e.stopPropagation();
        this.setState({
            status:this.state.status==='管理'?'完成':'管理'
        });
    };

    delClick=(e)=>{
        e.stopPropagation();
        if (this.state.selectIds.length===0){
            message.destroy();
            message.waring('请选择商品!');
            return;
        }
        let ids = this.state.selectIds.join(',');
        ids = '('+ids+')';
        fetch('/api/delectcarmore?ids='+ids)
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status===1){
                    let dataTemp = this.state.carData.filter((value) => {
                        let index = this.state.selectIds.findIndex((id)=>{
                            return id === value.id;
                        });

                        return index === -1;
                    });
                    this.setState({
                        carData:dataTemp,
                        total:'0.00',
                        selectIds:[],
                        selectAll:false
                    });
                    message.destroy();
                    message.success('删除成功!');
                }
                else {
                    message.destroy();
                    message.waring('删除失败!');
                }
            })
            .catch((error)=>{
                message.destroy();
                message.waring('删除失败!');
            });
    };

    countClick=(e)=>{
        e.stopPropagation();
        if (this.state.selectIds.length===0){
            message.destroy();
            message.waring('请选择商品!');
            return;
        }
        model.confirm({
            title:'提示信息',
            content:'确认购买该商品？',
            confirmContent:'确认购买',
            cancelContent:'加入订单',
            cancelClick:(e)=>{this.cancelClick(e)},
            confirmClick:(e)=>{this.confirmClick(e)}
        })
    };

    cancelClick = (e)=>{
        e.stopPropagation();
        this.addToDingdan('未付款');
    };

    confirmClick = (e)=>{
        e.stopPropagation();
        this.addToDingdan('已付款');
    };

    addToDingdan = (status)=>{
        let ids = '';
        let counts='';
        this.state.selectIds.forEach(value=>{
            for (let i = 0; i < this.state.carData.length; i++){
                if (this.state.carData[i].id === value){
                    counts += this.state.carData[i].count+',';
                    ids += this.state.carData[i].goodsid+',';
                    break;
                }
            }
        });
        counts = counts.substring(0,counts.length-1);
        ids = ids.substring(0,ids.length-1);
        let data={
            userzhanghu:this.props.user.zhanghu,
            goodsids:ids,
            counts,
            price:this.state.total,
            status
        };
        fetch('/api/savedingdan', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status===1){
                    message.destroy();
                    message.success(data.message);
                    let ids = this.state.selectIds.join(',');
                    ids = '('+ids+')';
                    fetch('/api/delectcarmore?ids='+ids)
                        .then((res)=>res.json())
                        .then((data)=>{
                            if (data.status===1){
                                let dataTemp = this.state.carData.filter((value) => {
                                    let index = this.state.selectIds.findIndex((id)=>{
                                        return id === value.id;
                                    });

                                    return index === -1;
                                });
                                this.setState({
                                    carData:dataTemp,
                                    total:'0.00',
                                    selectIds:[],
                                    selectAll:false
                                });
                            }
                        })
                }
                else {
                    message.destroy();
                    message.waring(data.message);
                }
            })
            .catch((error)=>{
                message.destroy();
                message.waring('购买失败!');
            });
    };

    boxClick = (e, id)=>{
        e.stopPropagation();
        this.props.history.push('/details/'+id);
    };

    render(){
        return(
            <div className='shopcar-box'>
                <TopBar
                    right={<span onClick={(e)=>{this.statusClick(e)}}>{this.state.status}</span>}
                >
                    购物车
                </TopBar>
                <ActionBar
                    status={this.state.status}
                    total={this.state.total}
                    selectAll={this.state.selectAll}
                    selectAllClick={(e)=>{this.selectAllClick(e)}}
                    delClick={(e)=>{this.delClick(e)}}
                    countClick={(e)=>{this.countClick(e)}}
                />
                {
                    this.state.carData && this.state.carData.length!==0?
                        this.state.carData.map((value)=>{
                            return (
                                <SelectCard
                                    data={value}
                                    key={value.id}
                                    selectClick={(e, id)=>{this.selectClick(e, id)}}
                                    boxClick={(e, id)=>{this.boxClick(e, id)}}
                                />
                            );
                        })
                        :
                        <div className='car-nothing'>没有数据...</div>
                }
                <Router/>
            </div>
        );
    };
}

const mapStoreToProps = (store)=>{
    return {
        user:store.loginReducer
    }
};

ShopCar = connect(mapStoreToProps)(ShopCar);

export default ShopCar;