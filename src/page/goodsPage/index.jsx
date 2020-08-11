import React from 'react';
import './index.css';
import TopBar from '../../component/topBar';
import Serch from '../../component/serch';
import Card from '../../component/card';

import LS from '../../interface/TDLocalStorage.js';

export default class goodsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            serchValue:props.match.params.serch,
            goodsData:null
        };
    };

    componentDidMount(){
        this.getGoodsData();
    };

    setSerchValue = (value)=>{
        this.setState({
            serchValue:value
        });
    };

    serchclick = (e)=>{
        e.stopPropagation();
        this.serch();
    };

    serchkeyup = (e)=>{
        if (e.keyCode !== 13)
            return;
        this.serch();
    };

    serch = ()=>{
        if (!this.state.serchValue)
            return;
        if (this.props.match.params.serch === this.state.serchValue)
            return;
        //保存搜索历史到本地
        let temp = {
            time:(new Date()).format('yyyy/MM/dd hh:mm:ss'),
            content:this.state.serchValue
        };
        LS.addLocalStorage('serchHistory',temp);
        this.props.history.replace('/goodspage/'+this.state.serchValue);
        this.getGoodsData();
    };

    getGoodsData = ()=>{
        fetch('/api/serch?serch='+this.state.serchValue)
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    data.data.forEach((value)=>{
                        value.images = value.images.split(';');
                    });
                    this.setState({
                        goodsData:data.data
                    });
                }
            })
            .catch((error)=>{});
    };

    itemClick = (e, id)=>{
        e.stopPropagation();
        this.props.history.push('/details/'+id);
    };

    render(){
        return(
            <div>
                <TopBar
                    right={<button className='index-serch-button' onClick={(e)=>{this.serchclick(e)}}>搜索</button>}
                >
                    <Serch
                        placeholder='搜索商品'
                        value={this.state.serchValue}
                        setValue={(value)=>{this.setSerchValue(value)}}
                        onkeyup={(e)=>{this.serchkeyup(e)}}
                    />
                </TopBar>
                <Card
                    header={false}
                >
                    {
                        this.state.goodsData?
                            this.state.goodsData.map((value, index)=>{
                                return (
                                    <Card.CardItem
                                        data={value}
                                        key={index}
                                        onItemClick={(e, id)=>{this.itemClick(e, id)}}
                                    />
                                );
                            })
                            :
                            ''
                    }
                </Card>
            </div>
        );
    };
}