import React from 'react';
import './index.css';
import TopBar from '../../../component/topBar';
import Talk from '../../../component/talk';

import { connect } from 'react-redux';

class Message extends React.Component{
    constructor(){
        super();
        this.state = {
            message:'',
            firend:null,
            allMessage:[],
            page:1,
            pianyi:0
        };
    };

    componentDidMount(){
        const firendZhanghu = this.props.match.params.firend;
        let user = this.props.user;
        if (!user.login){
            user = JSON.parse(localStorage.getItem('login'));
        }
        //获取好友信息
        fetch('/api/userinfo?zhanghu='+firendZhanghu)
            .then(res=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    this.setState({
                        firend:data.data
                    });
                    //获取聊天信息
                    this.getMessages(user, firendZhanghu);
                }
            })
            .catch((error)=>{});
        //告诉服务器，我已经查看了信息，让数据库把所有的该好友发送的信息标记为已读
        fetch('/api/updateread?zhanghu='+user.zhanghu+'&friend='+firendZhanghu)
            .then(res=>res.json())
            .then(data=>{})
            .catch(error=>{});

        let socket = this.props.socket;
        if (socket){
            this.reserverMessage(socket, user);
        }
    };

    componentDidUpdate(oldprops){
        if (oldprops.socket === this.props.socket)
            return;
        if (!this.props.user.login)
            return;
        this.reserverMessage(this.props.socket, this.props.user);
    }

    //收到消息
    reserverMessage = (socket, user)=>{
        socket.on('message', (data)=>{
            if (window.location.href.indexOf('/talkbox/') !== -1){
                data.image = this.state.firend.touxiang;
                this.setState({
                    allMessage:[...this.state.allMessage, data],
                    pianyi:this.state.pianyi+1
                });
                //告诉服务器，我在消息界面，需要将消息标记为已读
                fetch('/api/updateread?zhanghu='+user.zhanghu+'&friend='+this.props.match.params.firend)
                    .then(res=>res.json())
                    .then(data=>{})
                    .catch(error=>{});
            }
        });
    };

    //获取历史消息
    getMessages = (user, firendZhanghu)=>{
        let postdata = {
            zhanghu:user.zhanghu+','+firendZhanghu,
            page:this.state.page,
            pianyi:this.state.pianyi
        };
        return fetch('/api/getmessages',{
            method:'post',
            body:JSON.stringify(postdata),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    if (data.data.length === 0){
                        return new Promise((resolve, reject)=>{
                            resolve(false);
                        });
                    }
                    data.data.forEach(value=>{
                        value.time = (new Date(value.time)).format('yyyy-MM-dd hh:mm:ss');
                        if (value.sender === user.zhanghu){
                            value.displayRight = true;
                            value.image = user.touxiang;
                        }
                        else {
                            value.image = this.state.firend.touxiang;
                        }
                    });
                    data.data.reverse();
                    this.setState({
                        allMessage:[...data.data, ...this.state.allMessage],
                        page:this.state.page+1
                    });
                    return new Promise((resolve, reject)=>{
                        resolve(true);
                    });
                }
                else {
                    return new Promise((resolve, reject)=>{
                        resolve(false);
                    });
                }
            })
            .catch((error)=>{
                return new Promise((resolve, reject)=>{
                    resolve(false);
                });
            });
    };

    //点击发送
    sendClick = (value)=>{
        let time = (new Date()).format('yyyy-MM-dd hh:mm:ss');
        this.props.socket.emit('message',{
            sender:this.props.user.zhanghu,
            receiver:this.state.firend.zhanghu,
            content:value,
            time
        });
        this.setState({
            allMessage:[...this.state.allMessage, {displayRight:true,image:this.props.user.touxiang,time,content:value}],
            pianyi:this.state.pianyi+1
        });
    };

    //加载更多
    loadMore = ()=>{
        return this.getMessages(this.props.user, this.state.firend.zhanghu);
    };

    render(){
        return(
            <div>
                <TopBar
                    style={{borderBottom:'1px solid rgba(0,0,0,0.3)'}}
                >
                    {this.state.firend&&this.state.firend.name}
                </TopBar>
                <Talk
                    header={false}
                    send={(value)=>{this.sendClick(value)}}
                    loadMore={()=>{return this.loadMore()}}
                >
                    {
                        this.state.allMessage.map((value, index) => {
                            return (
                                <Talk.TalkItem data={value} key={index}/>
                            );
                        })
                    }
                </Talk>
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