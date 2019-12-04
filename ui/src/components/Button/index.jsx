import React from 'react';
import './styles.scss';

export const Button = (props) => {
    const { color, size, isLight, isRounded, isOutlined, isInverted, iconBefore, iconAfter, onClick, disabled, isLoading } = props;

    const handleClick = (e) => {
        if (onClick) onClick(e);
    }

    const getColorClass = () => {
        switch (color) {
            case 'white':
                return 'is-white';
            case 'light':
                return 'is-light';
            case 'dark':
                return 'is-dark';
            case 'black':
                return 'is-black';
            case 'text':
                return 'is-text';
            case 'primary':
                return 'is-primary';
            case 'link':
                return 'is-link';
            case 'blue':
                return 'is-info';
            case 'green':
                return 'is-success';
            case 'yellow':
                return 'is-warning';
            case 'red':
                return 'is-danger';
            default:
                return undefined;
        }
    }

    const getSizeClass = () => {
        switch (size) {
            case 'large':
                return 'is-large';
            case 'small':
                return 'is-small';
            case 'medium':
                return 'is-medium';
            case 'normal':
            default:
                return 'is-normal';
        }
    }

    const styles = `button 
        ${getColorClass()}
        ${getSizeClass()}
        ${!!isLight && 'is-light'}
        ${!!isRounded && 'is-rounded'}
        ${!!isOutlined && 'is-outlined'}
        ${!!isInverted && 'is-inverted'}
        ${!!isLoading && 'is-loading'}`;

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
