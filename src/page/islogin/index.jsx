import React from 'react';

import { connect } from 'react-redux';
import { login } from '../../redux/action/login.js';
import { setSocket } from '../../redux/action/socket.js';

import io from 'socket.io-client';

class IsLogin extends React.Component {

    componentDidMount(){
        fetch('/isdenglu')
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    let socket = io.connect('http://192.168.1.5:3000');
                    socket.emit('user', data.user.zhanghu);
                    this.props.setSocket(socket);
                    this.props.login(data.user);
                    localStorage.setItem('login',JSON.stringify(data.user));
                }
                else {
                    localStorage.clear('login');
                }
            })
            .catch((error)=>{
                localStorage.clear('login');
            })
    };

    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
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
        setSocket:(socket)=>{ dispatch(setSocket(socket)) }
    }
};

IsLogin = connect(mapStateToProps, mapDispatchToProps)(IsLogin);
export default IsLogin;