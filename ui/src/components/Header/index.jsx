import React, { useContext, useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarStart, NavbarDropdown, NavbarLink, NavbarBurger } from 'bloomer';
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

  const [headerData, setHeaderData] = useState({
    title: null,
    links: [],
    groups: [],
  });

  const [isActive, setIsActive] = useState(false)

  const [userDropdownActive, setUserDropdownActive] = useState(false);

  const handleUserDropdownClick = () => {
    setUserDropdownActive(!userDropdownActive);
  }; 

  useEffect(() => {
    getNavigationById(props.id)
      .then(({data}) => {
        const resData = data.data.navigation;
        setHeaderData({
          isLoading: false,
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
  
  return (
    <Navbar>
      <NavbarBrand >
          <Link to='/' className='navbar__brand-home' title={label.navigation.logoTitle}><img src={logo} alt='Логотип ЖК' className='navbar__brand-logo'/></Link>
          <NavbarBurger isActive={headerData.isActive} onClick={onClickNav} />
      </NavbarBrand>
      <NavbarMenu>
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

          <NavbarItem hasDropdown isActive={userDropdownActive} key='login'>
            <NavbarLink onClick={handleUserDropdownClick}>
              <User />
              <span className="navbar__username">{!userDropdownActive ? user.username : 'Закрити'}</span>
            </NavbarLink>
            <NavbarDropdown className='navbar__loginbox'>
              <AuthForm onRegisterClick={handleUserDropdownClick}/>
            </NavbarDropdown>
          </NavbarItem>
          </NavbarStart>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
