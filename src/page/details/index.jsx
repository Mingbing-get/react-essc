import React from 'react';
import './index.css';
import TopBar from '../../component/topBar';
import Sarousel from '../../component/sarousel';
import Count from '../../component/count';
import Agument from '../../component/agument';
import message from '../../component/message';
import model from '../../component/model';
import CarAndBuy from '../../component/carAndBuy';

import { connect } from 'react-redux';

class Details extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            goodsData:null,
            yeshu:1,
            pianyi:0,
            agumentData:[],
            buyCount:1,
            disabled:false
        };
    };

    componentDidMount(){
        fetch('/api/xqgoods?id='+this.state.id)
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    data.data.images = data.data.images.split(';');
                    let imagesTemp = [];
                    data.data.images.forEach(value => {
                        imagesTemp.push({image:value});
                    });
                    data.data.images = imagesTemp;
                    this.setState({
                        goodsData:data.data
                    });
                    return fetch('/api/augment?yeshu='+this.state.yeshu+'&pianyi='+this.state.pianyi+'&goodsid='+data.data.id);
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    data.data.forEach((value)=>{
                        value.time = new Date(value.time).format('yyyy/MM/dd hh:mm:ss');
                    });
                    this.setState({
                        agumentData:[...this.state.agumentData,...data.data]
                    });
                }
            })
            .catch((error)=>{});
    };

    //获取更多数据
    loadMore = ()=>{
        let yeshu = this.state.yeshu+1;
        this.setState({
            yeshu
        });
        return fetch('/api/augment?yeshu='+yeshu+'&pianyi='+this.state.pianyi+'&goodsid='+this.state.id)
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    data.data.forEach((value)=>{
                        value.time = new Date(value.time).format('yyyy/MM/dd hh:mm:ss');
                    });
                    this.setState({
                        agumentData:[...this.state.agumentData,...data.data]
                    });
                    if (data.data.length !== 0){
                        return new Promise((resolve)=>{
                            resolve(true);
                        });
                    }
                    else {
                        return new Promise((resolve)=>{
                            resolve(false);
                        });
                    }
                }
                else {
                    return new Promise((resolve)=>{
                        resolve(false);
                    });
                }
            })
            .catch((error)=>{
                return new Promise((resolve)=>{
                    resolve(false);
                });
            });
    };

    //提交评论
    agumentClick = (agument)=>{
        if (!this.props.user.login){
            this.props.history.push('/login');
            return;
        }
        agument = agument.trim();
        if (!agument){
            message.destroy();
            message.waring('评论内容不能为空!');
            return;
        }
        let data = {
            time:(new Date()).getTime(),
            goodsid:this.state.id,
            userzhanghu:this.props.user.zhanghu,
            content:agument
        };
        fetch('/api/savesugment', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((res)=>res.json())
            .then((resData)=>{
                if (resData.status === 1){
                    message.destroy();
                    message.success('评论成功');
                    data.id = Math.random().toString().substring(3);
                    data.time = new Date(data.time).format('yyyy/MM/dd hh:mm:ss');
                    data.name = this.props.user.name;
                    data.touxiang = this.props.user.touxiang;
                    this.setState({
                        pianyi:this.state.pianyi+1,
                        agumentData:[data,...this.state.agumentData]
                    });
                }
            })
            .catch((error)=>{});
    };

    //改变购买的数量
    changeCount = (count)=>{
        this.setState({
            buyCount:count
        });
    };

    //点击加入购物车
    addCar = ()=>{
        if (!this.props.user.login){
            this.props.history.push('/login');
            return;
        }
        this.setState({
            disabled:true
        });
        let data = {
            userzhanghu:this.props.user.zhanghu,
            goodsid:this.state.id,
            count:this.state.buyCount,
            cselect:'是'
        };
        fetch('/api/savecar', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((res)=>res.json())
            .then((data)=>{
                this.setState({
                    disabled:false
                });
                if (data.status===1){
                    message.destroy();
                    message.success('加入购物车成功!');
                }
                else{
                    message.destroy();
                    message.success('加入购物车失败!');
                }
            })
            .catch((error)=>{
                this.setState({
                    disabled:false
                });
                message.destroy();
                message.success('加入购物车失败!');
            });
    };

    //点击购买
    addBuy = ()=>{
        if (!this.props.user.login){
            this.props.history.push('/login');
            return;
        }
        model.confirm({
            title:'提示信息',
            content:'确认购买该商品？',
            confirmContent:'确认购买',
            cancelContent:'加入订单',
            cancelClick:(e)=>{this.cancelClick(e)},
            confirmClick:(e)=>{this.confirmClick(e)}
        });
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
        let data={
            userzhanghu:this.props.user.zhanghu,
            goodsids:this.state.id,
            counts:''+this.state.buyCount,
            price:this.state.buyCount*this.state.goodsData.nowprice,
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

    render(){
        return(
            <div className='detail-all-box'>
                <TopBar>
                    商品详情
                </TopBar>
                <CarAndBuy
                    carClick={this.addCar}
                    buyClick={this.addBuy}
                    disabled={this.state.disabled}
                />
                {
                    this.state.goodsData && this.state.goodsData.images?
                        <div>
                            <Sarousel
                                data={this.state.goodsData.images}
                                showMove={false}
                            />
                            <div className='detail-box'>
                                <div className='detail-price'>
                                    <p>
                                        ￥{this.state.goodsData.nowprice}
                                        <span>￥{this.state.goodsData.price}</span>
                                    </p>
                                    <p>{this.state.goodsData.discription}</p>
                                </div>
                                <div className='detail-count'>
                                    购买数量
                                    <Count
                                        minCount={1}
                                        count={1}
                                        maxCount={this.state.goodsData.number}
                                        changeCount={(count)=>{this.changeCount(count)}}
                                    />
                                </div>
                            </div>
                            <Agument
                                loadMore={()=>{return this.loadMore()}}
                                agumentSubmit={(agument)=>{this.agumentClick(agument)}}
                            >
                                {
                                    this.state.agumentData !== []?
                                        this.state.agumentData.map((data)=>{
                                            return(
                                                <Agument.AgumentItem data={data} key={data.id}/>
                                            );
                                        })
                                        :
                                        ''
                                }
                            </Agument>
                        </div>
                        :
                        ''
                }
            </div>
        );
    };
}

const mapStateToProps = (state)=>{
    return {
        user: state.loginReducer,
    };
};

Details = connect(mapStateToProps)(Details);

export default Details;