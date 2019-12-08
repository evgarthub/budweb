import React from 'react';
import { Star as IconStar } from 'react-feather';
import './styles.scss';

export const Rate = (props) => {
    const { value, title, onChange } = props;

    const handleClick = (amount) => {
        if (onChange) onChange(amount);
    }

    return (
        <section className="rate">
            <p className="rate__header heading">
                {title}
            </p>
            <div className="rate__stars">
                {
                    [1, 2, 3, 4, 5].map(item => {
                        return <Star key={item} value={item} onClick={handleClick} isActive={value >= item} isSelectable={!!onChange}/>
                    })
                }
            </div>
        </section>
    );
};

const Star = ({ value, onClick, isActive, isSelectable }) => {
    const handleClick = () => onClick(value);

    return (
        <span className={`rate__star ${isActive ? 'rate__star--active' : ''} ${isSelectable ? 'rate__star--selectable' : ''}`} onClick={handleClick}>
            <IconStar size={24} />
        </span>
    )
};
