import React from 'react';
import { Inbox } from 'react-feather';
import './styles.scss';

export const EmptyPlace = (props) => {
    return (
        <section className="empty-place">
            <div className="empty-place__container">
                <div className="empty-place__icon"><Inbox size={36} /></div>
                <div className="empty-place__title">{props.title}</div>
            </div>
        </section>
    );
};
