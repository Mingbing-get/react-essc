import React from 'react';
import './index.css';

export default class Count extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:props.count||props.minCount||0,
            minCount:props.minCount||0,
            maxCount:props.maxCount||0,
            step:props.step||1
        };
    };

    decClick = (e)=>{
        e.stopPropagation();
        this.setState({
            count:this.state.count-1
        });
        this.props.changeCount && this.props.changeCount(this.state.count-1);
    };

    incClick = (e)=>{
        e.stopPropagation();
        this.setState({
            count:this.state.count+1
        });
        this.props.changeCount && this.props.changeCount(this.state.count+1);
    };

    render(){
        return (
            <div className='count-box'>
                <button
                    disabled={this.state.count===this.state.minCount}
                    onClick={(e)=>{this.decClick(e)}}
                >-</button>
                <span>{this.state.count}</span>
                <button
                    disabled={this.state.count===this.state.maxCount}
                    onClick={(e)=>{this.incClick(e)}}
                >+</button>
            </div>
        );
    };
}