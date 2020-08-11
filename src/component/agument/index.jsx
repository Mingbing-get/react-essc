import React, {useState, useRef, useEffect} from 'react';
import './index.css';
import AgumentItem from './agumentItem/index';

function AgumentBox({...props}) {
    const [agument, setAgument] = useState('');
    const [more, setMore] = useState(true);
    const [clickMore, setClickMore] = useState(true);
    const testarea = useRef(null);
    const footer = useRef(null);
    const fangdou = useRef(null);

    useEffect(()=>{
        if (footer.current){
            window.onscroll = (e)=>{
                if (getScrollTop()+getClientHight()>footer.current.offsetTop+28){
                    fangdou.current && clearTimeout(fangdou.current);
                    fangdou.current = setTimeout(()=>{
                        if (props.loadMore){
                            props.loadMore()
                                .then((data)=>{
                                    setMore(data);
                                });
                        }
                        else {
                            setMore(false);
                        }
                    },200);
                }
            };
        }
        return ()=>{
            fangdou.current && clearTimeout(fangdou.current);
        };
    },[]);

    useEffect(()=>{
        if (!more)
            window.onscroll = null;
    },[more]);

    function loadMoreClick() {
        setClickMore(false);
        if (props.loadMore){
            props.loadMore()
                .then((data)=>{
                    setMore(data);
                    setClickMore(data);
                });
        }
        else {
            setMore(false);
        }
    }

    function getScrollTop(){
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    function getClientHight() {
        return document.documentElement.clientHeight || document.body.clientHeight || 0;
    }

    function clearTextarea(){
        setAgument('');
        testarea.current.focus();
    }

    function submitTextarea() {
        if (props.agumentSubmit)
            props.agumentSubmit(agument);
        setAgument('');
        testarea.current.focus();
    }

    return(
        <div className='agument-box'>
            {
                props.header !== false?
                    props.header?
                        props.header
                        :
                        <div className='agument-header'>
                            <h4>我要评价</h4>
                            <textarea rows='4' value={agument} onChange={(e)=>{setAgument(e.target.value)}} ref={testarea}></textarea>
                            <div>
                                <button onClick={()=>{clearTextarea()}}>清除</button>
                                <button onClick={()=>{submitTextarea()}}>提交</button>
                            </div>
                        </div>
                    :
                    ''
            }
            <div className='agument-content'>
                <h4>所有评价</h4>
                {props.children}
            </div>
            {
                props.loadMoreMethed !== 'pull'?
                    <div className='agument-footer'>
                        {
                            clickMore?
                                <button onClick={()=>{loadMoreClick()}}>加载更多</button>
                                :
                                more?
                                    '加载更多...'
                                    :
                                    '没有更多'
                        }
                    </div>
                    :
                    <div className='agument-footer' ref={footer}>
                        {
                            more?
                                '加载更多...'
                                :
                                '没有更多'
                        }
                    </div>
            }
        </div>
    );
}

AgumentBox.AgumentItem = AgumentItem;

export default AgumentBox;