import React, { useContext, useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarStart, NavbarDropdown, NavbarLink, NavbarBurger } from 'bloomer';
import logo from '../../assets/logo.svg';
import './styles.scss';
import { Link } from "react-router-dom";
import { label } from '../../variables/labels';
import { navExpand, navCollapse } from '../../utils/animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getNavigationById } from '../../utils/fetchAPI';
import LoginForm from '../UserControl';
import { AuthContext } from '../../context/authContext';


const Header = (props) => {
  const { user } = useContext(AuthContext);

  const [headerData, setHeaderData] = useState({
      id: props.id,
      title: null,
      links: [],
      groups: [],
      isLoading: false,
      isActive: false,
    });

  useEffect(() => {
    getNavigationById(headerData.id)
      .then(({data}) => {
        const resData = data.data.navigation;
        setHeaderData({
          ...headerData,
          isLoading: false,
          title: resData.Home,
          links: resData.navlinks,
          groups: resData.navgroups
        });
      });
    }, []);

  const onClickNav = () => {
    window.innerWidth < 1087 && (headerData.isActive ? navCollapse() : navExpand());
    setHeaderData({
      ...headerData,
      isActive: !headerData.isActive,
    });
  };

  
  return (
    <Navbar>
      <NavbarBrand >
          <Link to='/' className='navbar__brand-home' title={label.navigation.logoTitle}><img src={logo} alt='Логотип ЖК' className='navbar__brand-logo'/></Link>
          <NavbarBurger isActive={headerData.isActive} onClick={onClickNav} />
      </NavbarBrand>
      <NavbarMenu>
          <NavbarStart>
          {
              headerData.links.map(link => <Link className='navbar-item' to={link.Link} key={`link_${link.id}`} onClick={onClickNav}>{link.Title}</Link>)
          }

          {
              headerData.groups.map(group => (
                  <NavbarItem hasDropdown isHoverable key={`group_${group.id}`}>
                      <NavbarLink>{group.Title}</NavbarLink>
                      <NavbarDropdown isBoxed>
                        {group.navlinks.map(link => <Link className='navbar-item' to={link.Link} key={link.id} onClick={onClickNav}>{link.Title}</Link>)}
                      </NavbarDropdown>
                  </NavbarItem>
                )
              )
          }
          <NavbarItem hasDropdown isHoverable key='login'>
            <NavbarLink>
              <FontAwesomeIcon icon={faUser} /> 
              <span className="navbar__username">{user.username}</span>
            </NavbarLink>
            <NavbarDropdown isBoxed className='navbar__loginbox'>
              <LoginForm />
            </NavbarDropdown>
          </NavbarItem>
          </NavbarStart>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
