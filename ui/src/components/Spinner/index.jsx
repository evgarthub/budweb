import React from 'react';
import { Loader } from 'react-feather';
import './styles.scss';

export const Spinner = () => {

    return (
        <div className='spinner__wrapper'>
            <div className='spinner'>
                <Loader className='spinner__icon' color='#000' />
            </div>
        </div>
    );
};
