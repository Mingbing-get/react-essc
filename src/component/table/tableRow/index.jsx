import React from 'react';
import './index.css';

export default function TableRow({...props}) {
    return (
        <tr
            className='table-row'
            onClick={props.clickRow?(e)=>{props.clickRow(e, props.data)}:null}
        >
            {
                props.data&&
                    props.data.map((value, index)=>{
                        return (
                            <td key={index}>{value}</td>
                        );
                    })
            }
            {
                props.extra&&
                    <td>
                        {props.extra}
                    </td>
            }
        </tr>
    );
}