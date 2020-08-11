import React from 'react';
import './index.css';
import Router from '../../router';
import TopBar from '../../component/topBar';

import { connect } from 'react-redux';

import LS from "../../interface/TDLocalStorage";

class Message extends React.Component{
    constructor(){
        super();
        this.state = {
            friends:null
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
        let data = {
            friends:user.friends,
            zhanghu:user.zhanghu
        };
        fetch('/api/friends', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    this.setState({
                        friends:data.data
                    });
                }
            })
            .catch((error)=>{});

        let socket = this.props.socket;
        if (socket){
            this.reserverMessage(socket);
        }
    };

    componentDidUpdate(oldprops){
        if (oldprops.socket === this.props.socket)
            return;
        this.reserverMessage(this.props.socket);
    }

    friendClick = (e, firend)=>{
        e.stopPropagation();
        this.props.history.push('/talkbox/'+firend);
    };

    //收到消息
    reserverMessage = (socket)=>{
        socket.on('message', (data)=>{
            if (window.location.href.indexOf('/message') !== -1){
                let index = this.state.friends.findIndex(value => {
                    return value.zhanghu === data.sender;
                });
                let temp =  {...this.state.friends[index], count:this.state.friends[index].count+1};
                this.setState({
                    friends:[...this.state.friends.slice(0,index),temp,...this.state.friends.slice(index+1)]
                });
            }
        });
    };

    render(){
        return(
            <div className='essc-message-firden'>
                <TopBar>
                    消息
                </TopBar>
                {
                    this.state.friends&&
                        this.state.friends.map((value)=>{
                            return (
                                <div className='friends-box' key={value.zhanghu} onClick={(e)=>{this.friendClick(e,value.zhanghu)}}>
                                    <div style={{backgroundImage:'url('+value.touxiang+')'}}></div>
                                    <div className='friends-info'>
                                        <h3>{value.name}</h3>
                                    </div>
                                    {
                                        value.count && value.count !== 0 &&
                                        <span>{value.count}</span>
                                    }
                                </div>
                            );
                        })
                }
                <Router/>
            </div>
        );
    };
}

const mapStoreToProps = (store)=>{
    return {
        user:store.loginReducer,
        socket:store.socketReducer
    };
};

Message = connect(mapStoreToProps)(Message);

export default Message;