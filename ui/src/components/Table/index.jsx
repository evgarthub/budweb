import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Table = (props) => {
    const { data, headers } = props;

    const rows = data.map(row => {
        return (
            <tr>{headers.map(col => {
                if (!!col.renderer) {
                    return (<td>{col.renderer(row)}</td>);
                } 

                return (
                    <td>{row[col.key]}</td>
                );
            })}</tr>
        );
    });

    return (
        <table className='table is-fullwidth'>
            <thead>
                <tr>
                    {headers.map(colHeader => {
                        return (
                            <th>{colHeader.title}</th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
}

export default Table;