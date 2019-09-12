import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { ArrowDown, Inbox, ArrowUp } from 'react-feather';

const Table = (props) => {
    const { data, headers } = props;
    const [values, setValues] = useState(data);

    useEffect(() => {
        setValues(data);
    }, [data]);

    const handleSorting = (sorter, order) => {
        switch(order) {
            case 0:
            default:
                setValues(data);
            case 1:
                setValues(data.sort((a, b) => sorter(a, b)));
            case 2:
                setValues(data.sort((a, b) => sorter(b, a)));
        }
    };

    const rows = values.map((row, i) => {
        return (
            <tr key={i}>{headers.map((col, i) => {
                if (!!col.renderer) {
                    return (<td key={i}>{col.renderer(row)}</td>);
                } 

                return (
                    <td key={i}>{row[col.key]}</td>
                );
            })}</tr>
        );
    });

    if (!values.length) {
        return (
            <article className="message">
                <div className="message-body">
                    <Inbox /> No data to display.
                </div>
            </article>
        );
    }

    return (
        <table className='table is-fullwidth'>
            <thead>
                <tr>
                    {headers.map((colHeader, i) => {
                        return (
                            <Header data={colHeader} onSort={handleSorting} key={i} />
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


const Header = (props) => {
    const { data, onSort } = props;
    let sorted;

    const handleSortingClick = () => {
        sorted = generateState();
        onSort(data.sorter, sorted);
    };

    return (
        <th>
            {data.title}
            {data.sorter && (
                <div onClick={handleSortingClick}>
                    {
                        sorted === 1 ? <ArrowDown /> : <ArrowUp />
                    }
                </div>
            )}
        </th>
    );
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
}

function * generateState() {
    yield 0;
    yield 1;
    yield 2;
}

export default Table;