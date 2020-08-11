import React from 'react';
import './index.css';
import Input from '../../component/input';
import TopBar from '../../component/topBar';
import message from '../../component/message';

class Login extends React.Component {

    constructor(){
        super();
        this.state={
            countValue:'',
            countStatus:null,
            countContent:'',
            nameValue:'',
            nameStatus:null,
            nameContent:'',
            sexVlaue:'男',
            passwordValue:'',
            passwordStatus:null,
            confirmPasswordContent:'',
            confirmPasswordValue:'',
            confirmPasswordStatus:null,
            passwordContent:''
        };
    };

    setCountValue = (value)=>{
        this.setState({
            countValue:value
        });
    };

    setNameValue = (value)=>{
        this.setState({
            nameValue:value
        });
    };

    setPasswordValue = (value)=>{
        this.setState({
            passwordValue:value
        });
    };

    setConfirmPasswordValue = (value)=>{
        this.setState({
            confirmPasswordValue:value
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

    //验证姓名是否符合要求
    nameBlur = ()=>{
        if (!this.state.nameValue){
            this.setState({
                nameStatus:'error',
                nameContent:'姓名不能为空!'
            });
            return false;
        }
        if (this.state.nameValue.length>7){
            this.setState({
                nameStatus:'error',
                nameContent:'姓名不能超过7个字!'
            });
            return false;
        }
        this.setState({
            nameStatus:'success',
            nameContent:''
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

    //验证确认密码是否一致
    confirmPasswordBlur = ()=>{
        if (!this.state.confirmPasswordValue){
            this.setState({
                confirmPasswordStatus:'error',
                confirmPasswordContent:'确认密码不能为空!'
            });
            return false;
        }
        if (this.state.passwordValue !== this.state.confirmPasswordValue){
            this.setState({
                confirmPasswordStatus:'error',
                confirmPasswordContent:'密码不一致!'
            });
            return false;
        }
        this.setState({
            confirmPasswordStatus:'success',
            confirmPasswordContent:''
        });
        return true;
    };

    //修改性别
    sexChange = (e)=>{
        this.setState({
            sexVlaue:e.target.value
        });
    };

    //点击注册
    registerClick = (e)=>{
        e.stopPropagation();
        if (this.countBlur() && this.nameBlur() && this.passwordBlur() && this.confirmPasswordBlur()){
            let data = {
                zhanghu:this.state.countValue,
                mima:this.state.passwordValue,
                name:this.state.nameValue,
                sex:this.state.sexVlaue
            };
            fetch('/api/adduser', {
                method:'post',
                body:JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then((res)=>res.json())
                .then((data)=>{
                    if (data.status === 1){
                        message.destroy();
                        message.success('注册成功!');
                        window.history.back();
                    }
                    else {
                        message.destroy();
                        message.error('注册失败！');
                    }
                })
                .catch((error)=>{
                    message.destroy();
                    message.error('注册失败！');
                });
        }
        else {
            message.destroy();
            message.error('注册失败！');
        }
    };

    render(){
        return (
            <div>
                <TopBar>
                    用户注册
                </TopBar>
                <div className='register-box'>
                    <div className='register-title'>用户注册</div>
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
                        <label htmlFor='name'>姓名：</label>
                        <Input
                            id='name'
                            placeholder='请输入姓名'
                            status={this.state.nameStatus}
                            point={true}
                            pointContent={this.state.nameContent}
                            value={this.state.nameValue}
                            setValue={(value)=>{this.setNameValue(value)}}
                            onBlur={this.nameBlur}
                        />
                    </div>
                    <div>
                        <label>性别：</label>
                        <div className='register-radio-box'>
                            <input type='radio' name='sex' id='radio1' value='男' onChange={(e)=>{this.sexChange(e)}} defaultChecked='checked'/>
                            <label htmlFor='radio1'>男</label>
                            <input type='radio' name='sex' id='radio2' value='女' onChange={(e)=>{this.sexChange(e)}}/>
                            <label htmlFor='radio2'>女</label>
                        </div>
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
                    <div>
                        <label htmlFor='confirmPassword'>确认密码：</label>
                        <Input
                            id='confirmPassword'
                            type='password'
                            placeholder='请输确认密码'
                            status={this.state.confirmPasswordStatus}
                            point={true}
                            pointContent={this.state.confirmPasswordContent}
                            value={this.state.confirmPasswordContent}
                            setValue={(value)=>{this.setConfirmPasswordValue(value)}}
                            onBlur={this.confirmPasswordBlur}
                        />
                    </div>
                    <div className='register-btn'>
                        <button
                            onClick={(e)=>{this.registerClick(e)}}
                        >
                            注册
                        </button>
                    </div>
                </div>
            </div>
        );
    };
}

export default Login;