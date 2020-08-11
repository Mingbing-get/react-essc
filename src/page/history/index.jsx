import React from 'react';
import './index.css';
import TopBar from '../../component/topBar';
import Table from '../../component/table';
import Pagination from '../../component/pagination';

import LS from '../../interface/TDLocalStorage.js';

export default class History extends React.Component {

    constructor(){
        super();
        this.state={
            showCount:10,
            currentPage:1,
            totalPage:0,
            serchHistory:null
        };
    };

    componentDidMount(){
        let temp = LS.getLocalStorage('serchHistory');
        this.setState({
            serchHistory:temp,
            totalPage:Math.ceil(temp.length/this.state.showCount)
        });
    };

    deleteClick = (e, index)=>{
        e.stopPropagation();
        let temp = [...this.state.serchHistory.slice(0,index),...this.state.serchHistory.splice(index+1)];
        let currenttotal = Math.ceil(temp.length/this.state.showCount);
        localStorage.setItem('serchHistory', JSON.stringify(temp));
        this.setState({
            serchHistory:temp,
            totalPage:currenttotal,
        });
    };

    clearClick = (e)=>{
        e.stopPropagation();
        localStorage.clear('serchHistory');
        this.setState({
            serchHistory:null,
            totalPage:0
        });
    };

    historyToSerch = (e, data)=>{
        e.stopPropagation();
        let temp = [...this.state.serchHistory.slice(0,data[0]-1),...this.state.serchHistory.splice(data[0])];
        temp.unshift({
            time:(new Date()).format('yyyy/MM/dd hh:mm:ss'),
            content:data[1]
        });
        localStorage.setItem('serchHistory', JSON.stringify(temp));
        this.props.history.push('/goodspage/'+data[1]);
    };

    changePage = (current)=>{
        this.setState({
            currentPage:current
        });
    };

    render(){
        return (
            <div>
                <TopBar>搜索历史</TopBar>
                {
                    this.state.serchHistory && this.state.serchHistory.length !== 0?
                        <Table
                            thead={['编号','内容','操作']}
                            firstBold={true}
                            title='搜索历史'
                            footer={
                                <div>
                                    <Pagination
                                        total={this.state.totalPage}
                                        showPage={3}
                                        changePage={(current)=>{this.changePage(current)}}
                                    />
                                    <button
                                        className='clearBtn'
                                        onClick={(e)=>{this.clearClick(e)}}
                                    >
                                        清空历史
                                    </button>
                                </div>
                                }
                        >
                            {
                                this.state.serchHistory.map((value, index)=>{
                                    if (index < (this.state.currentPage-1)*this.state.showCount || index >= this.state.currentPage*this.state.showCount)
                                        return;
                                    let temp = [index+1, value.content];
                                    return(
                                        <Table.TableRow
                                            key={index}
                                            data={temp}
                                            clickRow={(e, data)=>{this.historyToSerch(e, data)}}
                                            extra={<button
                                                className='deleteBtn'
                                                onClick={(e)=>{this.deleteClick(e, index)}}
                                            >删除</button>}
                                        />
                                    );
                                })
                            }
                        </Table>
                        :
                        <div className='nothingHistory'>没有历史记录...</div>
                }
            </div>
        );
    };
}