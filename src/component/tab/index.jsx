import React, {useRef, useEffect, useState} from 'react';
import './index.css';

export default function Tab({...props}) {
    const tableBox = useRef(null);
    const [index, setIndex] = useState(props.defaultIndex || 0);
    const [preIndex, setPreIndex] = useState(props.defaultIndex || 0);

    useEffect(()=>{
        //拿到所有标题的li
        let tableli = tableBox.current.children[0].children;
        //拿到所有的内容的li
        let contentli = tableBox.current.children[1].children;
        //初始化显示的内容和对应的标题
        tableli[index].className += ' active';
        contentli[index].className += ' show';
        //给所有的标题添加点击事件
        for (let i = 0; i < tableli.length; i++){
            tableli[i].addEventListener('click', (e)=>{
                setIndex(i);
            });
        }
    },[]);

    useEffect(()=>{
        //拿到所有标题的li
        let tableli = tableBox.current.children[0].children;
        //拿到所有的内容的li
        let contentli = tableBox.current.children[1].children;

        //去掉原有的li标签上的active
        let className = tableli[preIndex].className.split(' ');
        className = className.filter((value)=>{
            return value!=='active' && value !== ' ';
        });
        tableli[preIndex].className = className.join(' ');

        //去掉原有的li标签上的show
        className = contentli[preIndex].className.split(' ');
        className = className.filter((value)=>{
            return value!=='show' && value !== ' ';
        });
        contentli[preIndex].className = className.join(' ');

        setPreIndex(index);

        tableli[index].className += ' active';
        contentli[index].className += ' show';
    },[index]);

    return (
        <div className='table-box' ref={tableBox}>
            {props.children}
        </div>
    );
}