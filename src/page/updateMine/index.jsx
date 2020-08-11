import React from 'react';
import './index.css';
import TopBar from '../../component/topBar';
import Strip from '../../component/strip';
import model from '../../component/model';
import message from '../../component/message';
import Input from '../../component/input';

import { connect } from 'react-redux';
import { logout } from '../../redux/action/login.js';
import { delSocket } from '../../redux/action/socket.js';
import LS from "../../interface/TDLocalStorage";

class UpdateMine extends React.Component {
    constructor(){
        super();
        this.state={
            user:null,
            nickName:'',
            sex:'',
            birthday:null
        };
    };

    componentDidMount(){
        if (this.props.user.login){
            this.setState({
                user:this.props.user
            });
            return;
        }
        if (localStorage.getItem('login')){
            this.setState({
                user:{login:true, ...LS.getLocalStorage('login')}
            });
            return;
        }
    };

    //点击修改昵称
    nicknameClick = (e)=>{
        this.setState({
            nickName:this.state.user.name
        });
        model.confirm({
            title:'修改昵称',
            content:<Input
                value={this.state.user.name}
                focus={true}
                setValue={(value)=>{this.setState({nickName:value})}}
                palceholder='请输入昵称'
            />,
            confirmContent:'确认',
            cancelContent:'取消',
            confirmClick:(e)=>this.confirmNickName(e)
        })
    };
    //确认修改昵称
    confirmNickName = (e)=>{
        if (this.state.nickName.length === 0){
            message.destroy();
            message.error('昵称不能为空');
            return true;
        }
        if (this.state.nickName.length > 7){
            message.destroy();
            message.error('昵称不能超过7位');
            return true;
        }
        this.setState({
            user:{...this.state.user, name:this.state.nickName}
        });
    };

    //点击修改性别
    sexClick = (e)=>{
        this.setState({
            sex:this.state.user.sex
        });
        model.confirm({
            title:'修改性别',
            content:<div className='update-sex-box'>
                <input type='radio' name='sex' value='男' id='sexMan'
                       defaultChecked={this.state.user.sex==='男'}
                       onChange={()=>{this.setState({sex:'男'})}}/>
                <label htmlFor='sexMan'>男</label>
                <input type='radio' name='sex' value='女' id='sexWoman'
                       defaultChecked={this.state.user.sex==='女'}
                       onChange={()=>{this.setState({sex:'女'})}}/>
                <label htmlFor='sexWoman'>女</label>
            </div>,
            confirmContent:'确认',
            cancelContent:'取消',
            confirmClick:(e)=>{this.setState({
                user:{...this.state.user, sex:this.state.sex}
            });}
        })
    };

    //点击修改生日
    birthdayClick = (e)=>{
        this.setState({
            birthday:this.state.user.birthday
        });
        model.confirm({
            title:'修改生日',
            content:<input type='date'
                           defaultValue={new Date(this.state.user.birthday).format('yyyy-MM-dd')}
                           onChange={(e)=>{this.setState({birthday:e.target.value})}}/>,
            confirmContent:'确认',
            cancelContent:'取消',
            confirmClick:(e)=>{this.setState({
                user:{...this.state.user, birthday:this.state.birthday}
            });}
        })
    };

    //点击修改头像
    touxiangClick = (e)=>{
        let tx = e.target.files[0];
        let formdata = new FormData();
        formdata.append('touxiang',tx);
        fetch('/api/touxiang',{
            method:'post',
            body:formdata,
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                "User-Token": '',
            }),
            contentType: false,
            processData: false,
        })
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    data.path = data.path.replace(/\\/g,'/');
                    this.setState({
                        user:{...this.state.user, touxiang:data.path}
                    });
                }
            })
            .catch((error)=>{});
    };

    //点击确认修改
    changeBtnClick = ()=>{
        let data = {};
        for (let key in this.state.user) {
            if (key !== 'login')
                data[key] = this.state.user[key];
        }
        data.mima='';
        fetch('/api/updateuser', {
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
                    message.success('修改成功!');
                }
                else {
                    message.destroy();
                    message.waring('修改失败!');
                }
            })
            .catch((error)=>{
                message.destroy();
                message.waring('修改失败!');
            });
    };

    //点击退出登录
    logoutClick = ()=>{
        model.confirm({
            title:'提示信息',
            content:'确认退出当前账号?',
            confirmContent:'确认',
            cancelContent:'取消',
            confirmClick:()=>{this.logoutConfirm()}
        })
    };
    //确认退出
    logoutConfirm = ()=>{
        fetch('/logout')
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    //退出成功，清理本地登录信息
                    localStorage.clear('login');
                    //通知服务器，退出登录
                    this.props.socket.emit('logout', this.props.user.zhanghu);
                    this.props.logout();
                    this.props.delSocket();
                    this.props.history.push('/mine');
                    message.destroy();
                    message.success('退出成功!');
                }
                else {
                    message.destroy();
                    message.waring('操作失败!');
                }
            })
            .catch((error)=>{
                message.destroy();
                message.waring('操作失败!');
            });
    };

    render(){
        return(
            <div>
                <TopBar>
                    我的信息
                </TopBar>
                <div className='touxiang-box'>
                    <label htmlFor='touxiang'>
                        <Strip
                            right={
                                this.state.user&&
                                    <div className='update-img' style={{backgroundImage:'url('+this.state.user.touxiang+')'}}></div>
                            }
                        >
                            我的头像
                        </Strip>
                    </label>
                    <input type='file' id='touxiang' accept='image/*' onChange={(e)=>{this.touxiangClick(e)}}/>
                </div>
                <Strip
                    right={
                        this.state.user&&
                        <div>{this.state.user.zhanghu}</div>
                    }
                >
                    我的账号
                </Strip>
                <Strip
                    right={
                        this.state.user&&
                        <div>{this.state.user.name}</div>
                    }
                    onClick={(e)=>{this.nicknameClick(e)}}
                >
                    我的昵称
                </Strip>
                <Strip
                    right={
                        this.state.user&&
                        <div>{this.state.user.sex}</div>
                    }
                    onClick={(e)=>{this.sexClick(e)}}
                >
                    我的性别
                </Strip>
                <Strip
                    right={
                        this.state.user&&
                        <div>{new Date(this.state.user.birthday).format('yyyy-MM-dd')}</div>
                    }
                    onClick={(e)=>{this.birthdayClick(e)}}
                >
                    我的生日
                </Strip>
                <div className='update-btn-box'>
                    <button onClick={this.changeBtnClick}>确认修改</button>
                    <button onClick={this.logoutClick}>退出登录</button>
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
        logout:()=>{ dispatch(logout()) },
        delSocket:()=>{ dispatch(delSocket()) }
    }
};

UpdateMine = connect(mapStoreToProps, mapDispatchToProps)(UpdateMine);

export default UpdateMine;