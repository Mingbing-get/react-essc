import React from 'react';
import './index.css';

export default class Sarouel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentIndex:1,
            pointIndex:0,
            dingshi:null,

            touchstart:0,
            touchloaction:0,

            time:props.time||5000
        };
        this.imgBox = React.createRef();
    }

    componentDidMount(){
        //绑定动画完成的事件
        this.imgBox.current.addEventListener(this.whichTransitionEvent(), ()=>{
            if (this.state.currentIndex > this.props.data.length){
                this.setState({
                    currentIndex:1
                });
                this.imgBox.current.style.transition = null;
                this.moveBox(1);
            }
            else if (this.state.currentIndex <= 0){
                this.setState({
                    currentIndex:this.props.data.length
                });
                this.imgBox.current.style.transition = null;
                this.moveBox(this.props.data.length);
            }
        });
        //绑定手指触碰事件
        if (this.props.touchEvent !== false){
            this.imgBox.current.addEventListener('touchstart', (e)=>{
                clearInterval(this.state.dingshi);
                this.setState({
                    touchstart:e.changedTouches[0].screenX
                });
            });
            this.imgBox.current.addEventListener('touchend', (e)=>{
                this.setState({
                    dingshi:this.props.autoCircular===false?null:this.setdingshiqi(),
                    touchloaction:e.changedTouches[0].screenX
                });
                if (Math.abs(this.state.touchstart-this.state.touchloaction) >= this.imgBox.current.children[0].clientWidth/4){
                    this.imgBox.current.style.transition = 'all 0.4s linear';
                    let currentIndex = 0;
                    if (this.state.touchstart>this.state.touchloaction){
                        currentIndex = (this.state.currentIndex+1)%(this.props.data.length+2);
                        this.setState({
                            currentIndex,
                            pointIndex:currentIndex>this.props.data.length?0:currentIndex-1
                        });
                    }
                    else {
                        currentIndex = this.state.currentIndex-1;
                        this.setState({
                            currentIndex,
                            pointIndex:currentIndex===0?this.props.data.length-1:currentIndex-1
                        });
                    }
                    this.moveBox(currentIndex);
                }
            });
        }
        //初始化轮播
        this.moveBox(this.state.currentIndex);
        //初始化自动轮播
        if (this.props.autoCircular === false){
            return;
        }
        //定义定时器
        this.state.dingshi = this.setdingshiqi();
    }

    componentWillUnmount(){
        clearInterval(this.state.dingshi);
    }

    clickLeft(e){
        e.stopPropagation();
        //重置定时器
        if (this.props.autoCircular !== false){
            this.state.dingshi = this.setdingshiqi();
        }
        this.imgBox.current.style.transition = 'all 0.4s linear';
        let currentIndex = this.state.currentIndex-1;
        this.setState({
            currentIndex,
            pointIndex:currentIndex===0?this.props.data.length-1:currentIndex-1
        });
        this.moveBox(currentIndex);
    }

    clickRight(e){
        e.stopPropagation();
        //重置定时器
        if (this.props.autoCircular !== false){
            this.state.dingshi = this.setdingshiqi();
        }
        this.imgBox.current.style.transition = 'all 0.4s linear';
        let currentIndex = (this.state.currentIndex+1)%(this.props.data.length+2);
        this.setState({
            currentIndex,
            pointIndex:currentIndex>this.props.data.length?0:currentIndex-1
        });
        this.moveBox(currentIndex);
    }

    clickPoint(e, index){
        e.stopPropagation();
        this.setState({
            dingshi:this.props.autoCircular===false?null:this.setdingshiqi(),
            currentIndex:index+1,
            pointIndex:index,
        });
        this.imgBox.current.style.transition = 'all 0.4s linear';
        this.moveBox(index+1);
    }

    //定义动画执行完成的回调函数
    whichTransitionEvent(){
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }

    moveBox(index){
        this.imgBox.current.style.transform = 'translateX('+(-this.imgBox.current.children[0].clientWidth*index)+'px)';
    }

    setdingshiqi(){
        clearInterval(this.state.dingshi);
        return setInterval(()=>{
            this.imgBox.current.style.transition = 'all 0.4s linear';
            let currentIndex = (this.state.currentIndex+1)%(this.props.data.length+2);
            this.setState({
                currentIndex,
                pointIndex:currentIndex>this.props.data.length?0:currentIndex-1
            });
            this.moveBox(currentIndex);
        },this.state.time);
    }

    render(){
        const data = [...this.props.data];
        data.unshift(data[data.length - 1]);
        data.push(data[1]);
        return (
            <div className='sarousel'>
                <ul className='img-box' style={{width: data.length * 100 + '%'}} ref={this.imgBox}>
                    {data.map((item, index) => {
                        return (
                            <li key={index} style={{width: 100 / data.length + '%'}}>
                                <a>
                                    <img src={item.image}/>
                                </a>
                                {this.props.showTitle!==false?
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>{item.discription}</p>
                                    </div>
                                    :
                                    ''
                                }
                            </li>
                        );
                    })}
                </ul>
                {
                    this.props.showPoint !== false ?
                        (<ul className='point-box'>
                            {new Array(this.props.data.length).fill(1).map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a className={index === this.state.pointIndex ? 'active' : ''} onClick={(e)=>{this.clickPoint(e, index)}}></a>
                                    </li>
                                );
                            })}
                        </ul>)
                        :
                        ''
                }
                {
                    this.props.showMove !== false ?
                        (<div>
                            <div className='move-left fa fa-chevron-left' onClick={(e) => {
                                this.clickLeft(e)
                            }}></div>
                            <div className='move-right fa fa-chevron-right' onClick={(e) => {
                                this.clickRight(e)
                            }}></div>
                        </div>)
                        :
                        ''
                }
            </div>
        );
    };
}

// export default function Sarouel({...porps}) {
//     const imgBox = useRef(null);
//     var dingshi = useRef(null);
//     var currentIndex = 1;
//     const [tindex, setIndex] = useState(0);
//     const time = porps.circularTime || 5000;
//
//     const data = [...porps.data];
//     data.unshift(data[data.length-1]);
//     data.push(data[1]);
//
//     //定义动画执行完成的回调函数
//     function whichTransitionEvent(){
//         var t;
//         var el = document.createElement('fakeelement');
//         var transitions = {
//             'transition':'transitionend',
//             'OTransition':'oTransitionEnd',
//             'MozTransition':'transitionend',
//             'WebkitTransition':'webkitTransitionEnd'
//         }
//
//         for(t in transitions){
//             if( el.style[t] !== undefined ){
//                 return transitions[t];
//             }
//         }
//     }
//     const transitionEvent = whichTransitionEvent();
//
//     useEffect(()=>{
//         //初始化轮播
//         moveleft();
//         //初始化自动轮播
//         if (porps.autoCircular === false){
//             return;
//         }
//         imgBox.current.addEventListener(transitionEvent, function () {
//            if (currentIndex > porps.data.length){
//                currentIndex = 1;
//                imgBox.current.style.transition = null;
//                moveleft();
//            }
//            if (currentIndex <= 0){
//                currentIndex = 5;
//                imgBox.current.style.transition = null;
//                moveright();
//            }
//         });
//         dingshi.current = setInterval(function () {
//             imgBox.current.style.transition = 'all 0.4s linear';
//             currentIndex = (currentIndex+1)%(porps.data.length+2);
//             setIndex(currentIndex > porps.data.length?0:currentIndex-1);
//             moveleft();
//         },time);
//         return ()=>{
//             dingshi.current && clearInterval(dingshi.current);
//         };
//     },[]);
//
//     function moveleft(){
//         imgBox.current.style.transform = 'translateX('+(-imgBox.current.children[0].clientWidth*currentIndex)+'px)';
//     }
//
//     function moveright(){
//         imgBox.current.style.transform = 'translateX('+(-imgBox.current.children[0].clientWidth*currentIndex)+'px)';
//     }
//
//     function clickLeft(e){
//         e.stopPropagation();//阻止冒泡
//         currentIndex = tindex+1;
//         console.log(currentIndex);
//         dingshi.current && clearInterval(dingshi.current);
//         if (porps.autoCircular !== false){
//             dingshi.current = setInterval(function () {
//                 imgBox.current.style.transition = 'all 0.4s linear';
//                 currentIndex = (currentIndex+1)%(porps.data.length+2);
//                 setIndex(currentIndex > porps.data.length?0:currentIndex-1);
//                 moveleft();
//             },time);
//         }
//         imgBox.current.style.transition = 'all 0.4s linear';
//         currentIndex = (currentIndex+1)%(porps.data.length+2);
//         setIndex(currentIndex > porps.data.length?0:currentIndex-1);
//         moveleft();
//     }
//
//     function clickRight(e) {
//         e.stopPropagation();//阻止冒泡
//         currentIndex = tindex+1;
//         dingshi.current && clearInterval(dingshi.current);
//         if (porps.autoCircular !== false){
//             dingshi.current = setInterval(function () {
//                 imgBox.current.style.transition = 'all 0.4s linear';
//                 currentIndex = (currentIndex+1)%(porps.data.length+2);
//                 setIndex(currentIndex > porps.data.length?0:currentIndex-1);
//                 moveleft();
//             },time);
//         }
//         imgBox.current.style.transition = 'all 0.4s linear';
//         currentIndex = currentIndex-1;
//         setIndex(currentIndex === 0?porps.data.length-1:currentIndex-1);
//         moveright();
//     }
//
//     return (
//         <div className='sarousel'>
//             <ul className='img-box' style={{width:data.length*100+'%'}} ref={imgBox}>
//                 {data.map((item, index)=>{
//                     return (
//                         <li key={index} style={{width:100/data.length+'%'}}>
//                             <a>
//                                 <img src={item.image}/>
//                             </a>
//                         </li>
//                     );
//                 })}
//             </ul>
//             {
//                 porps.showPoint !== false?
//                     (<ul className='point-box'>
//                         {new Array(porps.data.length).fill(1).map((item, index)=>{
//                             return (
//                                 <li key={index}>
//                                     <a className={index === tindex?'active':''}></a>
//                                 </li>
//                             );
//                         })}
//                     </ul>)
//                     :
//                     ''
//             }
//             {
//                 porps.showMove !== false?
//                     (<div>
//                         <div className='move-left fa fa-chevron-left' onClick={(e)=>{clickLeft(e)}}></div>
//                         <div className='move-right fa fa-chevron-right' onClick={(e)=>{clickRight(e)}}></div>
//                     </div>)
//                     :
//                     ''
//             }
//         </div>
//     );
// }