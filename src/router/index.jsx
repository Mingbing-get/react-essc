import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default class Router extends React.Component{
    render(){
        return (
            <div className='router-box'>
                <NavLink exact={true} to='./' className='fa fa-home'>
                    首页
                </NavLink>
                <NavLink exact={true} to='./message' className='fa fa-commenting-o'>
                    消息
                </NavLink>
                <NavLink exact={true} to='./shopcar' className='fa fa-shopping-cart'>
                    购物车
                </NavLink>
                <NavLink exact={true} to='./mine' className='fa fa-user'>
                    我的
                </NavLink>
            </div>
        );
    };
}