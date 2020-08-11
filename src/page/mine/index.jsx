import React from 'react';
import './index.css';
import Router from '../../router';
import TopBar from '../../component/topBar';
import Info from './info';
import Strip from '../../component/strip';

import LS from '../../interface/TDLocalStorage.js';

import { connect } from 'react-redux';

class Mine extends React.Component{
    constructor(){
        super();
        this.state={
            user:null,
            addmeCount:0
        };
    };

    componentDidMount(){
        let user = this.props.user;
        if (!user.login){
            user = {...LS.getLocalStorage('login')};
            if (user.zhanghu)
                user.login = true;
        }
        if (user.login){
            this.setState({
                user
            });
            fetch('/api/newfriendcount?zhanghu='+user.zhanghu)
                .then(res=>res.json())
                .then(data=>{
                    if (data.status === 1){
                        this.setState({
                            addmeCount:data.count
                        });
                    }
                })
                .catch(error=>{});
            return;
        }
        this.setState({
            user:{login:false, name:'未登录', touxiang:'/public/image/upload_8268d35451ea49d3f597b199ada965b9.png'}
        });
    };

    infoClick = (e)=>{
        if (!this.state.user.login){
            this.props.history.push('/login');
            return;
        }
        this.props.history.push('/updatemine');
    };

    orderClick = (e)=>{
        e.stopPropagation();
        if (!this.state.user.login){
            this.props.history.push('/login');
            return;
        }
        this.props.history.push('/order/'+this.state.user.zhanghu);
    };

    mallClick = (e)=>{
        e.stopPropagation();
        if (!this.state.user.login){
            this.props.history.push('/login');
            return;
        }
        this.props.history.push('/mall/'+this.state.user.zhanghu);
    };

    friendClick = (e)=>{
        e.stopPropagation();
        if (!this.state.user.login){
            this.props.history.push('/login');
            return;
        }
        this.props.history.push('/newfriend/'+this.state.user.zhanghu);
    };

    render(){
        return(
            <div className='mine-box'>
                <TopBar>
                    我的
                </TopBar>

                {
                    this.state.user&&
                    <Info
                        user={this.state.user}
                        infoClick={(e)=>{this.infoClick(e)}}
                    />
                }

                <Strip
                    onClick={(e)=>{this.orderClick(e)}}
                >
                    我的订单
                </Strip>
                <Strip
                    onClick={(e)=>{this.mallClick(e)}}
                >
                    我的商城
                </Strip>
                <Strip
                    onClick={(e)=>{this.friendClick(e)}}
                >
                    新朋友
                    {
                        this.state.addmeCount !== 0&&
                        <span className='huizhang'>{this.state.addmeCount}</span>
                    }
                </Strip>
                <Router/>
            </div>
        );
    };
}

const mapStoreToProps = (store)=>{
    return {
        user:store.loginReducer
    };
};

Mine = connect(mapStoreToProps)(Mine);

export default Mine;