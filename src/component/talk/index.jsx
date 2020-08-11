import React, {useRef, useEffect, useState} from 'react';
import './index.css';
import TalkItem from './talkItem';

function Talk({...props}) {
    const content = useRef(null);
    const inputRef = useRef(null);
    const fangdou = useRef(null);
    const fangdou1 = useRef(null);
    const [more, setMore] = useState(true);
    const [notReadCount, setNotReadCount] = useState(0);
    const loading = useRef(false);
    const newmessage = useRef(false);
    const [value, setValue] = useState('');
    const [disable, setDisable] = useState(false);

    useEffect(()=>{
        //初始化content的高度
        const bili = document.documentElement.clientWidth*100/320;
        content.current.style.height = document.documentElement.clientHeight/bili-0.66+'rem';

        if (!props.loadMore){
            setMore(false);
            return;
        }
        //绑定滚动事件，处理上拉刷新
        content.current.onscroll = ()=>{
            if (content.current.scrollTop === 0){
                fangdou.current && clearTimeout(fangdou.current);
                fangdou.current = setTimeout(()=>{
                    if (props.loadMore){
                        let preHight = content.current.scrollHeight;
                        props.loadMore()
                            .then((data)=>{
                                setMore(data);
                                content.current.scrollTop = content.current.scrollHeight-preHight;
                                setLoading(true);
                            })
                    }
                    else {
                        setMore(false);
                    }
                },200);
            }
            if (content.current.scrollTop+content.current.clientHeight<content.current.scrollHeight-20){
                fangdou1.current && clearTimeout(fangdou1.current);
                fangdou1.current = setTimeout(()=>{
                    setNewmessage(true);
                },200);
            }
            else {
                fangdou1.current && clearTimeout(fangdou1.current);
                fangdou1.current = setTimeout(()=>{
                    setNewmessage(false);
                    setNotReadCount(0);
                },200);
            }
        };
        return ()=>{
            fangdou.current && clearTimeout(fangdou.current);
            fangdou1.current && clearTimeout(fangdou1.current);
        }
    },[]);

    useEffect(()=>{
        if (!more){
            fangdou.current && clearTimeout(fangdou.current);
            content.current.onscroll = null;
        }
    },[more]);

    useEffect(()=>{
        if (props.children.length === 0 || loading.current){
            setLoading(false);
            return;
        }
        if (newmessage.current)
            setNotReadCount(notReadCount+1);
        else{
            content.current.scrollTop = content.current.scrollHeight;
        }
    },[props.children]);

    function setLoading(bool) {
        loading.current = bool;
    }

    function setNewmessage(bool) {
        newmessage.current=bool;
    }

    function send() {
        setDisable(true);
        setValue('');
        inputRef.current.focus();
        props.send(value);
        setDisable(false);
    }

    function inputKeyUp(e) {
        if (e.keyCode === 13){
            send();
        }
    }

    return (
        <div className='talk-box'>
            {
                props.header !== false?
                    props.header?
                        props.header
                        :
                        <div className='talk-header'>{props.title}</div>
                    :
                    ''
            }
            <div className='talk-content' ref={content}>
                <div className='talk-content-more'>
                    {
                        more?
                            '加载更多...'
                            :
                            '没有更多'
                    }
                </div>
                {props.children}
            </div>
            {
                props.footer !== false?
                    props.footer?
                        props.footer
                        :
                        <div className='talk-footer'>
                            {
                                notReadCount !== 0&&
                                <span>{notReadCount}</span>
                            }
                            <input value={value} onChange={(e)=>{setValue(e.target.value)}} onKeyUp={(e)=>{inputKeyUp(e)}} ref={inputRef}/>
                            <button onClick={()=>{send()}} disabled={disable}>发送</button>
                        </div>
                    :
                    ''
            }
        </div>
    );
}

Talk.TalkItem = TalkItem;

export default Talk;