import React from 'react';
import './index.css';

export default class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            total:props.total||0,
            showPage:props.showPage||5,
            current:props.current||1,
            pageArray:[],
        };
    }

    componentDidUpdate(old){
        if (old.total === this.props.total)
            return;
        this.setState({
            total:this.props.total,
            current:this.state.current>this.props.total?this.props.total:this.props.current
        });
        if (this.props.changePage && this.state.current>this.props.total)
            this.props.changePage(this.props.total);
        this.setLoaction(this.state.current, this.props.total);
    }

    componentDidMount(){
        this.setLoaction(this.state.current, this.state.total);
    };

    setLoaction = (current, total)=>{
        let tempArray = [];
        if (total <= this.state.showPage){
            tempArray = Array.from(new Array(total).fill(1), (n,index)=>index+1);
            this.setState({
                pageArray:tempArray
            });
            return;
        }
        let center = Math.ceil(this.state.showPage/2);
        if (current<=center){
            tempArray = Array.from(new Array(this.state.showPage).fill(1), (n,index)=>index+1);
            if (this.state.showPage+1 !== total)
                tempArray.push('…');
            tempArray.push(total);
            this.setState({
                pageArray:tempArray
            });
            return;
        }
        if (current+center>total){
            console.log(current-center)
            tempArray = Array.from(new Array(this.state.showPage).fill(1), (n,index)=>total-index);
            tempArray.reverse();
            if (total-this.state.showPage !== 1)
                tempArray.unshift('…');
            tempArray.unshift(1);
            this.setState({
                pageArray:tempArray
            });
            return;
        }
        tempArray.push(1);
        if (current-center !== 1)
            tempArray.push('…');
        for (let i = current-center+1; i<current+center; i++){
            tempArray.push(i);
        }
        if (current+center !== total)
            tempArray.push('…');
        tempArray.push(total);
        this.setState({
            pageArray:tempArray
        });
    };

    preClick = (e)=>{
        e.stopPropagation();
        if (this.state.current <= 1)
            return;
        let current = this.state.current-1 < 1 ? 1 : this.state.current-1;
        if (this.props.changePage)
            this.props.changePage(current);
        this.setLoaction(current, this.state.total);
        this.setState({
            current
        });
    };

    befClick = (e)=>{
        e.stopPropagation();
        if (this.state.current >= this.state.total)
            return;
        let current = this.state.current+1 > this.state.total ? this.state.total : this.state.current+1;
        if (this.props.changePage)
            this.props.changePage(current);
        this.setLoaction(current, this.state.total);
        this.setState({
            current
        });
    };

    pageClick = (e, page)=>{
        e.stopPropagation();
        if (this.props.changePage)
            this.props.changePage(page);
        this.setLoaction(page, this.state.total);
        this.setState({
            current:page
        });
    };

    render(){
        return (
            <div className='pagination-box'>
                <button
                    className={this.state.current<=1?'pagination-disable':''}
                    onClick={(e)=>{this.preClick(e)}}
                >&lt;</button>
                {
                    this.state.pageArray.map((value, index)=>{
                        return (
                            <button
                                key={index}
                                className={this.state.current===value?'active':'' + value==='…'?' pagination-more':''}
                                onClick={value==='…'?null:(e)=>{this.pageClick(e, value)}}
                            >
                                {value}
                            </button>
                        );
                    })
                }
                <button
                    className={this.state.current>=this.state.total?'pagination-disable':''}
                    onClick={(e)=>{this.befClick(e)}}
                >&gt;</button>
            </div>
        );
    };
}

// export default function Pagination({...props}) {
//     const [total, setTotal] = useState(props.total||0);
//     const [showPage, setShowPage] = useState(props.showPage||5);
//     const [current, setCurrent] = useState(props.current||1);
//     const [pageArray, setPageArray] = useState([]);
//     const [preDisable, setPreDisable] = useState(false);
//     const [befDisable, setBefDisable] = useState(false);
//
//     useEffect(()=>{
//         isDisable();
//
//         let tempArray = [];
//         if (total <= showPage){
//             tempArray = Array.from(new Array(total).fill(1), (n,index)=>index+1);
//             setPageArray(tempArray);
//             return;
//         }
//         let center = Math.ceil(showPage/2);
//         if (current<=center){
//             tempArray = Array.from(new Array(showPage).fill(1), (n,index)=>index+1);
//             if (showPage+1 !== total)
//                 tempArray.push('…');
//             tempArray.push(total);
//             setPageArray(tempArray);
//             return;
//         }
//         if (current+center>total){
//             tempArray = Array.from(new Array(showPage).fill(1), (n,index)=>total-index);
//             tempArray.reverse();
//             if (current-center !== 1)
//                 tempArray.unshift('…');
//             tempArray.unshift(1);
//             setPageArray(tempArray);
//             return;
//         }
//         tempArray.push(1);
//         if (current-center !== 1)
//             tempArray.push('…');
//         for (let i = current-center+1; i<current+center; i++){
//             tempArray.push(i);
//         }
//         if (current+center !== total)
//             tempArray.push('…');
//         tempArray.push(total);
//         setPageArray(tempArray);
//     },[]);
//
//     function isDisable() {
//         if (current === 1)
//             setPreDisable(true);
//         else
//             setPreDisable(false);
//         if (current === total)
//             setBefDisable(true);
//         else
//             setPreDisable(false);
//     };
//
//     return (
//         <div className='pagination-box'>
//             <button
//                 className={preDisable?'pagination-disable':''}
//                 onClick={()=>{console.log(preDisable)}}
//             >&lt;</button>
//             {
//                 pageArray.map((value, index)=>{
//                    return (
//                        <button
//                            key={index}
//                            className={current===value?'active':'' + value==='…'?' pagination-more':''}
//                        >{value}</button>
//                    );
//                 })
//             }
//             <button
//                 className={befDisable?'pagination-disable':''}
//             >&gt;</button>
//         </div>
//     );
// }