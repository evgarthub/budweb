import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const TopValues = (props) => {
    const { items } = props;
    return (
        <nav className="top-values level">
            {items.map((item, i) => (
                <div key={i} className="level-item has-text-centered">
                    <div>
                        <p className="top-values__pre heading">{item.name}</p>
                        <p className="top-values__mid title">{item.value}</p>
                        <p className="top-values__post heading">грн/{item.unit}</p>
                    </div>
                </div>
            ))}
        </nav>
    );
}

TopValues.propTypes = {
    items: PropTypes.array,
}

export default TopValues;