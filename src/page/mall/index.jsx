import React from 'react';
import './index.css';
import TopBar from '../../component/topBar';
import Tab from '../../component/tab';

import AddGoods from './addgoods';
import LookGoods from './lookGoods';

export default class Mall extends React.Component {
    render(){
        return(
            <div>
                <TopBar>
                    我的商城
                </TopBar>
                <Tab>
                    <ul>
                        <li>查看商品</li>
                        <li>添加商品</li>
                    </ul>
                    <ul>
                        <li>
                            <LookGoods zhanghu={this.props.match.params.zhanghu} history={this.props.history}/>
                        </li>
                        <li>
                            <AddGoods zhanghu={this.props.match.params.zhanghu}/>
                        </li>
                    </ul>
                </Tab>
            </div>
        );
    };
}