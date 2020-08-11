import React from 'react';
import './index.css';
import SelectRadio from '../../../component/selectRadio';

export default class ActionBar extends React.Component {
    render(){
        return (
            <div className='actionbar-box'>
                <p className='actionbar-select-all'><SelectRadio
                    selected={this.props.selectAll}
                    selectClick={this.props.selectAllClick?(e)=>{this.props.selectAllClick(e)}:null}
                />全选</p>
                {
                    this.props.status==='管理'?
                        <div className='actionbar-count'>
                            合计:<span>￥{this.props.total||0}</span>
                            <button onClick={(e)=>{this.props.countClick(e)}}>结算</button>
                        </div>
                        :
                        <div className='actionbar-del'>
                            <button onClick={(e)=>{this.props.delClick(e)}}>删除</button>
                        </div>
                }
            </div>
        );
    };
}