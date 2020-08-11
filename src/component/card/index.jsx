import React from 'react';
import CardItem from './cardItem/index';
import './index.css';

function CardBox({...props}) {
    return (
        <div className='cardBox'>
            {
                props.header !== false?
                    props.header?
                        <div>{props.header}</div>
                        :
                        <div className='cardBoxHead'>
                            <h3>{props.title}</h3>
                        </div>
                    :
                    ''
            }
            <div className='clearFix'>{props.children}</div>
            {
                props.footer?
                    <div>{props.footer}</div>
                    :
                    ''
            }
        </div>
    );
}

CardBox.CardItem = CardItem;

export default CardBox;