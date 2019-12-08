import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { Home, PlusCircle, Menu, User, X, File, Folder } from 'react-feather';
import AuthForm from '../UserControl';
import { Can } from '..';
import { AuthContext } from '../../context/authContext';

export const ActionNavBar = (props) => {
    const { data, onCreateTicket } = props;
    const [active, setActive] = useState(undefined);
    const { user } = useContext(AuthContext);

    const handleActive = (id) => {
        switch (true) {
            case active === undefined:
                setActive(id);
                break;
            
            case id === active:
                setActive(undefined);
                break;

            default:
                setActive(id);
        }
    }

    return (
        <section className='action-navbar'>
            <div className='action-navbar__container'>
                <div className='action-navbar__section'>
                    <Link className='action-navbar__box' to='/'><Home /></Link>
                </div>
                <Can declined={() => null} perform='requests:create' role={user.role && user.role.type}>
                    <div className='action-navbar__section' onClick={onCreateTicket}>
                        <div className='action-navbar__box'><PlusCircle /></div>
                    </div>
                </Can>
                <div className='action-navbar__section'>
                    <Dropdown id={0} icon={User} onClick={handleActive} active={active}>
                        <AuthForm onRegisterClick={handleActive} />
                    </Dropdown>
                </div>
                <div className='action-navbar__section'>
                    <Dropdown id={1} icon={Menu} onClick={handleActive} active={active}>
                        <MenuComp items={data} onClick={handleActive} />
                    </Dropdown>
                </div>
            </div>
        </section>
    );
}

const MenuComp = (props) => {
    const { links, groups } = props.items;
    const { user } = useContext(AuthContext);

    const handleClick = () => props.onClick(undefined);

    return (
        <div className='action-navbar__menu'>
            {links.map(item => <div key={item.id} className='action-navbar__menu-link'><File /><Link className='action-navbar__menu-link-text' to={item.Link} onClick={handleClick}>{item.Title}</Link></div>)}
            <Can role={user.role && user.role.type} perform='requests:getMe'>
            <div className='action-navbar__menu-link'><File /><Link className='action-navbar__menu-link-text' to='/requests' onClick={handleClick}>Заявки</Link></div>
            </Can>
            {groups.map(group => (
                  <div className='action-navbar__menu-group' key={`group_${group.id}`}>
                      <div className='action-navbar__menu-group-title'><Folder /><div className='action-navbar__menu-link-text'>{group.Title}</div></div>
                      <div className='action-navbar__menu-group-list'> 
                        {group.navlinks.map(link => <div key={link.id} className='action-navbar__menu-link'><File /><Link className='action-navbar__menu-link-text' to={link.Link} onClick={handleClick}>{link.Title}</Link></div>)}
                      </div>
                  </div>
                )
              )}
        </div>
    );
}

const Dropdown = (props) => {
    const { id, icon, onClick, active } = props;
    const dropdown_class = 'action-navbar__dropdown';
    const Icon = icon;
    const handleClick = () => onClick(id);

    return (
        <>
            <div className='action-navbar__box' onClick={handleClick} >{active === id ? <X /> : <Icon />}</div>
            <div className={`${dropdown_class} ${active === id ? dropdown_class + '--active' : ''}`} >
                {props.children}
            </div>
        </>
    );
}
