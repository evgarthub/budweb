import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { Home, PlusCircle, Menu, User, X } from 'react-feather';
import AuthForm from '../UserControl';

export const ActionNavBar = (props) => {
    const { data, onCreateTicket } = props;

    return (
        <section className='action-navbar navbar is-fixed-bottom'>
            <div className='action-navbar__section navbar-item'><Link to='/'><Home /></Link></div>
            <div className='action-navbar__section navbar-item' onClick={onCreateTicket}><PlusCircle /></div>
            <Dropdown icon={User}>
                <AuthForm />
            </Dropdown>
            <div className='action-navbar__section navbar-item  has-dropdown has-dropdown-up'><Menu /></div>
        </section>
    );
}

const Dropdown = (props) => {
    const [isActive, setActive] = useState(false);
    const css_class = 'action-navbar__dropdown';
    const Icon = props.icon;
    const handleClick = () => setActive(!isActive);

    return (
        <div className={`action-navbar__section navbar-item has-dropdown has-dropdown-up ${isActive ? 'is-active' : ''}`} onClick={handleClick} >
            <div className='navbar-link is-arrowless'>
                {isActive ? <X /> : <Icon />}
            </div>
            <div className={`${css_class} navbar-dropdown ${isActive ? css_class + '--active' : ''}`} onClick={(e) => e.preventDefault()}>
                {props.children}
            </div>
        </div>
    );
}
