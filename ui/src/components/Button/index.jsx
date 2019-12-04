import React from 'react';
import './styles.scss';

export const Button = (props) => {
    const { color, size = 'normal', isLight, isRounded, isOutlined, isInverted, iconBefore, iconAfter, icon, onClick, disabled } = props;

    const handleClick = (e) => {
        if (onClick) onClick(e);
    }

    const styles = `button 
        ${color}
        ${size}
        ${isLight && 'is-light'}
        ${isRounded && 'is-rounded'}
        ${isOutlined && 'is-outlined'}
        ${isInverted && 'is-inverted'}
        ${iconBefore && 'icon-before'}
        ${iconAfter && 'icon-after'}
        ${icon && 'icon-only'}`

    return (
        <button className={styles} onClick={handleClick} disabled={disabled}>
            {iconBefore &&
                <span class="icon">
                    {iconBefore}
                </span>
            }
            {props.children && <span>{props.children}</span>}
            {iconAfter &&
                <span class="icon">
                    {iconAfter}
                </span>
            }
        </button>
    );

};
