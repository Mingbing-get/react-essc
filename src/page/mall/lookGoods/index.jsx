import React from 'react';
import './index.css';

import LookGoodsItem from './lookGoodsItem';

export default class LookGoods extends React.Component {
    constructor(){
        super();
        this.state = {
            data:null
        };
    };

    componentDidMount(){
        fetch('/api/querygoods?userzhanghu='+this.props.zhanghu)
            .then(res=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    data.data.forEach(value=>{
                        value.images = value.images.split(';');
                    });
                    this.setState({
                        data:data.data
                    });
                }
            })
            .catch((error)=>{});
    };

    boxClick = (e, id)=>{
        e.stopPropagation();
        this.props.history.push('/updategoods/'+id);
    };

    render(){
        return (
            <div>
                {
                    this.state.data&&
                    this.state.data.map(value=>{
                        return (
                            <LookGoodsItem
                                data={value}
                                key={value.id}
                                boxClick={(e, id)=>{this.boxClick(e, id)}}
                            />
                        );
                    })
                }
            </div>
        );
    };
}