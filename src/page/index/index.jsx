import React from 'react';
import './index.css';
import Router from '../../router';
import TopBar from '../../component/topBar';
import Serch from '../../component/serch';
import Sarousel from '../../component/sarousel';
import Card from '../../component/card';

import LS from '../../interface/TDLocalStorage.js';

export default class Index extends React.Component{

    constructor(){
        super();
        this.state = {
            sarouselData:null,
            goodsData:null,
            serchValue:''
        };
    }

    componentDidMount(){
        //获取轮播图数据
        fetch('api/lunbo',{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status===1){
                    this.setState({
                        sarouselData:data.images
                    });
                }
            })
            .catch((error)=>{});
        //获取商品的数据
        fetch('/api/indexdata', {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    //根据不同数据的分类，将数据做成二维数组
                    let temp = {};
                    data.data.forEach((value)=>{
                        value.images = value.images.split(';');
                        if (temp[value.status])
                            temp[value.status].push(value);
                        else
                            temp[value.status] = [value];
                    });
                    let tempArray = [];
                    for (let key in temp){
                        tempArray.push({title:key, data:temp[key]});
                    }
                    this.setState({
                        goodsData:tempArray
                    });
                }
            })
            .catch((error)=>{});
    }

    gotoHistory = (e)=>{
        e.stopPropagation();
        this.props.history.push('/history');
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
        //保存搜索历史到本地
        let temp = {
            time:(new Date()).format('yyyy/MM/dd hh:mm:ss'),
            content:this.state.serchValue
        };
        LS.addLocalStorage('serchHistory',temp);
        this.props.history.push('/goodspage/'+this.state.serchValue);
    };

    itemClick = (e, id)=>{
        e.stopPropagation();
        this.props.history.push('/details/'+id);
    };

    render(){
        return (
            <div className='index-box'>
                <TopBar
                    left={<span className='fa fa-history index-history' onClick={(e)=>{this.gotoHistory(e)}}></span>}
                    right={<button className='index-serch-button' onClick={(e)=>{this.serchclick(e)}}>搜索</button>}
                    className='index-topBar'
                >
                    <Serch
                        placeholder='搜索商品'
                        value={this.state.serchValue}
                        setValue={(value)=>{this.setSerchValue(value)}}
                        onkeyup={(e)=>{this.serchkeyup(e)}}
                    />
                </TopBar>
                {
                    this.state.sarouselData?
                        <Sarousel
                            data={this.state.sarouselData}
                        />
                        :
                        ''
                }
                {
                    this.state.goodsData?
                        this.state.goodsData.map((value, index)=>{
                            return(
                                <Card title={value.title} key={index}>
                                    {
                                        value.data.map((itemValue, itemIndex)=>{
                                            return (
                                                <Card.CardItem
                                                    data={itemValue}
                                                    key={itemIndex}
                                                    onItemClick={(e, id)=>{this.itemClick(e, id)}}
                                                />
                                            );
                                        })
                                    }
                                </Card>
                            );
                        })
                        :
                        ''
                }
                <Router/>
            </div>
        );
    };
}
