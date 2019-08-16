import React, { useContext, useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarStart, NavbarDropdown, NavbarLink, NavbarBurger, NavbarEnd } from 'bloomer';
import logo from '../../assets/logo.svg';
import './styles.scss';
import { Link } from "react-router-dom";
import { label } from '../../variables/labels';
import { navExpand, navCollapse } from '../../utils/animations';
import { getNavigationById } from '../../utils/fetchAPI';
import AuthForm from '../UserControl';
import { AuthContext } from '../../context/authContext';
import { User } from 'react-feather';


const Header = (props) => {
  const { user } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false)
  const [userDropdownActive, setUserDropdownActive] = useState(false);
  const [headerData, setHeaderData] = useState({
    title: null,
    links: [],
    groups: [],
  });

  useEffect(() => {
    getNavigationById(props.id)
      .then(({data}) => {
        const resData = data.data.navigation;
        setHeaderData({
          title: resData.Home,
          links: resData.navlinks,
          groups: resData.navgroups
        });
      });
    }, [props.id]);

  const onClickNav = () => {
    window.innerWidth < 1087 && (isActive ? navCollapse() : navExpand());
    setIsActive(!isActive);
  };

  const handleToggleLogin = () => {
    setUserDropdownActive(!userDropdownActive);
  };
  
  return (
    <Navbar>
      <NavbarBrand >
          <Link to='/' className='navbar__brand-home' title={label.navigation.logoTitle}><img src={logo} alt='Логотип ЖК' className='navbar__brand-logo'/></Link>
          <NavbarBurger isActive={isActive} onClick={onClickNav} />
      </NavbarBrand>
      <NavbarMenu className='navbar__menu'>
          <NavbarStart>
            {headerData.links.map(link => <Link className='navbar-item' to={link.Link} key={`link_${link.id}`} onClick={onClickNav}>{link.Title}</Link>)}

            {headerData.groups.map(group => (
                <NavbarItem hasDropdown isHoverable key={`group_${group.id}`}>
                    <NavbarLink>{group.Title}</NavbarLink>
                    <NavbarDropdown isBoxed>
                      {group.navlinks.map(link => <Link className='navbar-item' to={link.Link} key={link.id} onClick={onClickNav}>{link.Title}</Link>)}
                    </NavbarDropdown>
                </NavbarItem>
              )
            )}
          </NavbarStart>
          <NavbarEnd className='navbar__right-side'>
            <NavbarItem>
              <button className='button' onClick={handleToggleLogin}>
                <User size={18} />
                <span className="navbar__username">{user.username}</span>
              </button>
              <div className={`modal ${userDropdownActive && 'is-active'}`}>
                <div className="modal-background" />
                <div className="modal-content">
                  <article className="message is-info">
                    <div className="message-header">
                      <p>Облiковий запис</p>
                      <button className="delete" aria-label="delete" title="Закрити" onClick={handleToggleLogin}></button>
                    </div>
                    <div className="message-body">
                      <AuthForm onRegisterClick={handleToggleLogin}/>
                    </div>
                  </article>
                </div>
              </div>
              
            </NavbarItem>
          </NavbarEnd>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
