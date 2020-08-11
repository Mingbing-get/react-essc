import React from 'react';
import './index.css';
import TableRow from './tableRow';

function Table({...props}) {
    return (
        <div className='table-box'>
            <div className='table-title'>
                {props.title}
            </div>
            <table className={props.firstBold?'table-main table-bold-first':'table-main'}>
                {
                    props.thead&&
                    <thead>
                    <tr>
                        {
                            props.thead.map((value, index)=>{
                                return (
                                    <th key={index}>{value}</th>
                                );
                            })
                        }
                    </tr>
                    </thead>
                }
                {
                    props.tfoot&&
                    <tfoot>
                    <tr>
                        {
                            props.tfoot.map((value, index)=>{
                                return (
                                    <td key={index}>{value}</td>
                                );
                            })
                        }
                    </tr>
                    </tfoot>
                }
                <tbody>
                {props.children}
                </tbody>
            </table>
            <div className='table-footer'>
                {props.footer}
            </div>
        </div>
    );
}

Table.TableRow=TableRow;

export default Table;