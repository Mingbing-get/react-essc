import React from 'react';
import './index.css';
import OrederItem from './orderItem';
import model from "../../../component/model";
import message from '../../../component/message';

class OrderBox extends React.Component {

    constructor(){
        super();
        this.state = {
            data:null
        };
    };

    componentDidMount(){
        fetch('/api/zdgoods?ids=('+this.props.item.goodsids+')')
            .then(res=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    let ids = this.props.item.goodsids.split(',');
                    let counts = this.props.item.counts.split(',');
                    let temp = {};
                    ids.forEach((value, index)=>{
                        temp[value] = counts[index];
                    });
                    for (let i = 0; i < data.data.length; i++){
                        data.data[i].images = data.data[i].images.split(';');
                        for (let key in temp){
                            if (data.data[i].id == key){
                                data.data[i].count = temp[key];
                                break;
                            }
                        }
                    }
                    this.setState({
                        data:data.data
                    });
                }
            })
            .catch((error)=>{});
    };

    countClick = (id)=>{
        model.confirm({
            title:'提示信息',
            content:'确认现在付款？',
            confirmContent:'确认',
            cancelContent:'取消',
            confirmClick:(e)=>{this.confirmClick(e, id)}
        })
    };

    confirmClick = (e, id)=>{
        e.stopPropagation();
        let counts = {};
        this.state.data.forEach(value=>{
            counts[value.id] = parseInt(value.count);
        });
        let data = {
            status:'已付款',
            id,
            counts:JSON.stringify(counts)
        };
        fetch('/api/updingdan', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    this.props.moveToYdata(id);
                    message.destroy();
                    message.success('购买成功!');
                }
                else {
                    message.destroy();
                    message.waring('购买失败!');
                }
            })
            .catch((error)=>{
                message.destroy();
                message.waring('购买失败!');
            });
    };

    render(){
        return(
            <div className='order-box'>
                {
                    this.state.data&&
                        this.state.data.map(value=>{
                            return (
                                <OrederItem key={value.id} data={value}/>
                            );
                        })
                }
                {
                    this.props.status === '已付款'?
                        <div className='order-box-foot'>
                            <p>已付款<span>￥{this.props.price.toFixed(2)}</span></p>
                        </div>
                        :
                        <div className='order-box-foot'>
                            <button onClick={()=>{this.countClick(this.props.id)}}>去付款</button>
                            <span>￥{this.props.price.toFixed(2)}</span>
                        </div>
                }
            </div>
        );
    };
}

export default OrderBox;