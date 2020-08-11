import React from 'react';
import './index.css';
import Input from '../../component/input';
import TopBar from '../../component/topBar';
import message from '../../component/message';
import io from 'socket.io-client';

import { connect } from 'react-redux';
import { login } from '../../redux/action/login.js';
import { setSocket } from "../../redux/action/socket.js";

class Login extends React.Component {

    constructor(){
        super();
        this.state={
            countValue:'',
            countStatus:null,
            countContent:'',
            passwordValue:'',
            passwordStatus:null,
            passwordContent:'',
        };
    };

    setCountValue = (value)=>{
        this.setState({
            countValue:value
        });
    };

    setPasswordValue = (value)=>{
        this.setState({
            passwordValue:value
        });
    };

    //验证账户是否符合要求
    countBlur = ()=>{
        if (!this.state.countValue){
            this.setState({
                countStatus:'error',
                countContent:'账户不能为空!'
            });
            return false;
        }
        if (this.state.countValue.length<6 || this.state.countValue.length>11){
            this.setState({
                countStatus:'error',
                countContent:'账户长度不符合要求!'
            });
            return false;
        }
        this.setState({
            countStatus:'success',
            countContent:''
        });
        return true;
    };

    //验证密码是否符合要求
    passwordBlur = ()=>{
        if (!this.state.passwordValue){
            this.setState({
                passwordStatus:'error',
                passwordContent:'密码不能为空!'
            });
            return false;
        }
        if (this.state.passwordValue.length<6 || this.state.passwordValue.length>20){
            this.setState({
                passwordStatus:'error',
                passwordContent:'密码长度不符合要求!'
            });
            return false;
        }
        this.setState({
            passwordStatus:'success',
            passwordContent:''
        });
        return true;
    };

    //点击登录
    loginClick = (e)=>{
        e.stopPropagation();
        if (this.countBlur() && this.passwordBlur()){
            let data = {
                zhanghu:this.state.countValue,
                mima:this.state.passwordValue
            };
            fetch('/api/denglu', {
                method:'post',
                body:JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then((res)=>res.json())
                .then((rdata)=>{
                    if (rdata.status === 1){
                        message.destroy();
                        message.success('登录成功!');

                        let socket = io.connect('http://192.168.1.5:3000');
                        socket.emit('user', data.zhanghu);//将该用户告诉服务器我是谁
                        socket.on('agreefriend', (mdata)=>{
                            fetch('/api/getuserinfo?zhanghu='+data.zhanghu)
                                .then(res=>res.json())
                                .then(data=>{
                                    if (data.status === 1){
                                        this.props.login(data.user);
                                        localStorage.setItem('login',JSON.stringify(data.user));
                                    }
                                })
                                .catch(error=>{});
                        });
                        this.props.setSocket(socket);
                        this.props.login(rdata.user);
                        localStorage.setItem('login',JSON.stringify(rdata.user));
                        window.history.back();
                    }
                    else {
                        message.destroy();
                        message.error('信息不正确！');
                    }
                })
                .catch((error)=>{
                    message.destroy();
                    message.error('信息不正确！');
                });
        }
        else {
            message.destroy();
            message.error('信息不正确！');
        }
    };

    //点击注册
    goRegisterClick = (e)=>{
        e.stopPropagation();
        this.props.history.push('/register');
    };

    render(){
        return (
            <div>
                <TopBar>
                    用户登录
                </TopBar>
                <div className='login-box'>
                    <div className='login-title'>用户登录</div>
                    <div>
                        <label htmlFor='username'>账户：</label>
                        <Input
                            id='username'
                            focus={true}
                            placeholder='请输入账户(6~11)位'
                            status={this.state.countStatus}
                            point={true}
                            pointContent={this.state.countContent}
                            value={this.state.countValue}
                            setValue={(value)=>{this.setCountValue(value)}}
                            onBlur={this.countBlur}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>密码：</label>
                        <Input
                            id='password'
                            type='password'
                            placeholder='请输入密码(6~20)位'
                            status={this.state.passwordStatus}
                            point={true}
                            pointContent={this.state.passwordContent}
                            value={this.state.passwordContent}
                            setValue={(value)=>{this.setPasswordValue(value)}}
                            onBlur={this.passwordBlur}
                        />
                    </div>
                    <div className='login-btn'>
                        <button
                            onClick={(e)=>{this.loginClick(e)}}
                        >
                            登录
                        </button>
                        <button
                            onClick={(e)=>{this.goRegisterClick(e)}}
                        >
                            去注册
                        </button>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer,
        socket: state.socketReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login:(user)=>{ dispatch(login(user)) },
        setSocket:(socket)=>{dispatch(setSocket(socket))}
    }
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;