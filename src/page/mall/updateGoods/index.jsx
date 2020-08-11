import React from 'react';
import './index.css';

import Input from '../../../component/input';
import message from '../../../component/message';
import TopBar from '../../../component/topBar';

export default class AddGoods extends React.Component {
    constructor(){
        super();
        this.state = {
            title:'',
            titleStatus:'',
            titleContent:'',
            discription:'',
            oldprice:'',
            nowprice:'',
            nowpriceStatus:'',
            nowpriceContent:'',
            number:'',
            numberStatus:'',
            numberContent:'',
            images:[]
        };
    };

    componentDidMount(){
        fetch('/api/querygoodsbyid?id='+this.props.match.params.id)
            .then(res=>res.json())
            .then((data)=>{
                if (data.status===1){
                    this.setState({
                        title:data.data[0].title,
                        discription:data.data[0].discription,
                        oldprice:data.data[0].price,
                        nowprice:data.data[0].nowprice,
                        number:data.data[0].number,
                        images:data.data[0].images.split(';')
                    });
                }
            })
            .catch((error)=>{});
    };

    setTitle = (value)=>{
        this.setState({
            title:value
        });
    };

    titleBlur = ()=>{
        if (this.state.title.length===0){
            this.setState({
                titleStatus:'error',
                titleContent:'标题不能为空'
            });
            return false;
        }
        this.setState({
            titleStatus:'success',
            titleContent:''
        });
        return true;
    };

    setDiscript = (e)=>{
        this.setState({
            discription:e.target.value
        });
    };

    setOldprice = (value)=>{
        this.setState({
            oldprice:value
        });
    };

    setNowprice = (value)=>{
        this.setState({
            nowprice:value
        });
    };

    nowpriceBlur = ()=>{
        if (this.state.nowprice.length===0){
            this.setState({
                nowpriceStatus:'error',
                nowpriceContent:'需要给出现价'
            });
            return false;
        }
        this.setState({
            nowpriceStatus:'success',
            nowpriceContent:''
        });
        return true;
    };

    setNumber = (value)=>{
        this.setState({
            number:value
        });
    };

    numberBlur = ()=>{
        if (this.state.number.length===0){
            this.setState({
                numberStatus:'error',
                numberContent:'需要给出库存数量'
            });
            return false;
        }
        this.setState({
            numberStatus:'success',
            numberContent:''
        });
        return true;
    };

    //添加图片
    addpicClick = (e)=>{
        e.stopPropagation();
        if (e.target.files.length===0)
            return;
        let tx = e.target.files[0];
        let formdata = new FormData();
        formdata.append('yangping',tx);
        fetch('/api/yangping',{
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
                        images:[ ...this.state.images,data.path]
                    });
                }
            })
            .catch((error)=>{});
    };

    //点击取消图片
    delpicClick = (e, img)=>{
        e.stopPropagation();
        let index = this.state.images.findIndex(value => {
            return img === value;
        });
        this.setState({
            images:[...this.state.images.slice(0,index), ...this.state.images.slice(index+1)]
        });
    };

    //点击修改
    sellClick = ()=>{
        if (this.state.discription.length>250){
            message.destroy();
            message.waring('描述不能超过250字');
            return;
        }
        if (!(this.titleBlur() && this.nowpriceBlur() && this.numberBlur())){
            message.destroy();
            message.waring('输入信息不完全');
            return;
        }
        if (this.state.images.length===0){
            message.destroy();
            message.waring('至少上传一张图');
            return;
        }
        let data = {
            id:this.props.match.params.id,
            title:this.state.title,
            discription:this.state.discription,
            price:this.state.oldprice,
            nowprice:this.state.nowprice,
            number:this.state.number,
            images:this.state.images.join(';'),
            userzhanghu:this.props.zhanghu,
            status:'出售'
        };
        fetch('/api/uspategoods', {
            method:'post',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then((data)=>{
                if (data.status===1){
                    window.history.back();
                    message.destroy();
                    message.success('提交成功!');
                }
                else {
                    message.destroy();
                    message.waring('提交失败!');
                }
            })
            .catch((error)=>{
                message.destroy();
                message.waring('提交失败!');
            });
    };

    render(){
        return (
            <div>
                <TopBar>修改商品信息</TopBar>
                {
                    this.state.title&&
                    <div className='update-box'>
                        <div>
                            <label htmlFor='title'>商品标题:</label>
                            <Input
                                id='title'
                                placeholder='请输入标题'
                                value={this.state.title}
                                status={this.state.titleStatus}
                                point={true}
                                pointContent={this.state.titleContent}
                                onBlur={this.titleBlur}
                                setValue={(value)=>{this.setTitle(value)}}
                            />
                        </div>
                        <div>
                            <label htmlFor='discript'>商品描述:</label>
                            <div className='update-goods-area'>
                        <textarea
                            rows={4}
                            id='discript'
                            placeholder='请输入描述(不超过250字)'
                            value={this.state.discription}
                            onChange={(e)=>{this.setDiscript(e)}}
                        ></textarea>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='oldprice'>商品原价:</label>
                            <Input
                                id='oldprice'
                                type='number'
                                placeholder='请输入原价'
                                value={this.state.oldprice}
                                setValue={(value)=>{this.setOldprice(value)}}
                            />
                        </div>
                        <div>
                            <label htmlFor='nowprice'>商品现价:</label>
                            <Input
                                id='nowprice'
                                type='number'
                                placeholder='请输入现价'
                                value={this.state.nowprice}
                                status={this.state.nowpriceStatus}
                                point={true}
                                pointContent={this.state.nowpriceContent}
                                onBlur={this.nowpriceBlur}
                                setValue={(value)=>{this.setNowprice(value)}}
                            />
                        </div>
                        <div>
                            <label htmlFor='number'>商品数量:</label>
                            <Input
                                id='number'
                                type='number'
                                placeholder='请输入数量'
                                value={this.state.number}
                                status={this.state.numberStatus}
                                point={true}
                                pointContent={this.state.numberContent}
                                onBlur={this.numberBlur}
                                setValue={(value)=>{this.setNumber(value)}}
                            />
                        </div>
                        <div>
                            <label>样品图片:</label>
                            <div className='update-goods-pic'>
                                {
                                    this.state.images.map(value => {
                                        return(
                                            <div style={{backgroundImage:'url('+value+')'}} key={value} className='have'>
                                                <span onClick={(e)=>{this.delpicClick(e, value)}}></span>
                                            </div>
                                        );
                                    })
                                }
                                {
                                    this.state.images.length<5&&
                                    <label htmlFor='addImages'>
                                        <div></div>
                                    </label>
                                }

                                <input type='file' accept='image/*' id='addImages' onChange={(e)=>{this.addpicClick(e)}}/>
                            </div>
                        </div>
                        <button className='update-goods-btn' onClick={this.sellClick}>修改商品</button>
                    </div>
                }
            </div>
        );
    };
}