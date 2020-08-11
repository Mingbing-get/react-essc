import React from 'react';
import './index.css';
import TopBar from '../../component/topBar';
import Input from '../../component/input';
import message from '../../component/message';

import { connect } from 'react-redux';
import { login } from '../../redux/action/login.js';

class NewFriend extends React.Component {
    constructor(){
        super();
        this.state={
            newfriend:'',
            newfriendStatus:'',
            newfriendContent:'',
            addme:[],
            agree:[]
        };
    };

     componentDidMount(){
         fetch('/api/getfriend?zhanghu='+this.props.match.params.zhanghu)
             .then(res=>res.json())
             .then((data)=>{
                 if (data.status === 1){
                     let addme=[];
                     let agree=[];
                     data.data.forEach(value=>{
                         value.time = (new Date(value.time)).format('yyyy-MM-dd hh:mm:ss');
                         if (value.agree === '是')
                             agree.push(value);
                         else
                             addme.push(value);
                     });
                    this.setState({
                        addme,
                        agree
                    });
                 }
             })
             .catch((error)=>{});
     };

    setNewFriend = (value)=>{
        this.setState({
            newfriend:value
        });
    };

    addfriendClick = (e)=>{
        e.stopPropagation();
        if (this.state.newfriend.length === 0){
            this.setState({
                newfriendStatus:'error',
                newfriendContent:'新朋友账户不能为空!'
            });
            return;
        }
        this.setState({
            newfriendStatus:'',
            newfriendContent:''
        });
        let data={
            sender:this.props.match.params.zhanghu,
            receiver:this.state.newfriend,
            time:(new Date()).format('yyyy-MM-dd hh:mm:ss'),
            agree:'否'
        };
        fetch('/api/addfriend', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    message.destroy();
                    message.success('消息已发送!');
                }
                else {
                    this.setState({
                        newfriendStatus:'error',
                        newfriendContent:data.message
                    });
                }
            })
            .catch((error)=>{
                this.setState({
                    newfriendStatus:'error',
                    newfriendContent:'该用户不存在!'
                });
            });
    };

    agreeClick = (e, id)=>{
        e.stopPropagation();
        let index = this.state.addme.findIndex(value => {
            return value.id === id
        });
        fetch('/api/agreefriend', {
            method:'post',
            body:JSON.stringify(this.state.addme[index]),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.status===1){
                    let friendzhanghu = this.state.addme[index].sender;
                    this.setState({
                        agree:[this.state.addme[index], ...this.state.agree],
                        addme:[...this.state.addme.slice(0,index), ...this.state.addme.slice(index+1)]
                    });
                    this.props.login(data.user);
                    localStorage.setItem('login',JSON.stringify(data.user));
                    //告诉服务器，我同意了好友申请，让服务器通知申请的好友
                    this.props.socket.emit('agreefriend',friendzhanghu);
                }
                else {
                    message.destroy();
                    message.waring(data.message);
                }
            })
            .catch(error=>{
                message.destroy();
                message.waring('操作失败!');
            });
    };

    render(){
        return(
            <div>
                <TopBar>
                    新朋友
                </TopBar>
                <div className='newfriend-add'>
                    <Input
                        setValue={(value)=>{this.setNewFriend(value)}}
                        placeholder='请输入新朋友的账户(6~11)位'
                        status={this.state.newfriendStatus}
                        point={true}
                        pointContent={this.state.newfriendContent}
                    />
                    <button onClick={(e)=>{this.addfriendClick(e)}}>添加</button>
                </div>
                <div className='newfriend-addme-box'>
                    {
                        this.state.addme.map(value => {
                            return (
                                <div className='newfriend-addme-item' key={value.id}>
                                    <div style={{backgroundImage:'url('+value.touxiang+')'}}></div>
                                    <div className='info'>
                                        <h3>{value.name}</h3>
                                        <p>{value.time}</p>
                                    </div>
                                    <button onClick={(e)=>{this.agreeClick(e, value.id)}}>同意</button>
                                </div>
                            );
                        })
                    }
                    {
                        this.state.agree.map(value => {
                            return (
                                <div className='newfriend-addme-item' key={value.id}>
                                    <div style={{backgroundImage:'url('+value.touxiang+')'}}></div>
                                    <div className='info'>
                                        <h3>{value.name}</h3>
                                        <p>{value.time}</p>
                                    </div>
                                    <span>已同意</span>
                                </div>
                            );
                        })
                    }
                </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        login:(user)=>{ dispatch(login(user)) },
    }
};

NewFriend = connect(mapStoreToProps, mapDispatchToProps)(NewFriend);

export default NewFriend;