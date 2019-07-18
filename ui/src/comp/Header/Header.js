import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarStart, NavbarDropdown, NavbarLink, NavbarBurger } from 'bloomer';
import logo from '../../assets/logo.svg';
import './Header.scss';
import { Link } from "react-router-dom";
import { label } from '../../variables/labels';
import { navExpand, navCollapse } from '../../utils/animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getNavigationById } from '../../utils/fetchAPI';
import LoginForm from '../UserControl';


class Header extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.id,
            title: null,
            links: [],
            groups: [],
            isLoading: false,
            isActive: false,
          }

    }

    componentDidMount() {
        this.setState({isLoading: true});

        getNavigationById(this.state.id)
            .then(({data}) => {
                const resData = data.data.navigation;

                this.setState(pState => ({
                    ...pState,
                    isLoading: false,
                    title: resData.Home,
                    links: resData.navlinks,
                    groups: resData.navgroups
                }));
            });
      }

    onClickNav = () => {

      window.innerWidth < 1087 && (this.state.isActive ? navCollapse() : navExpand());

      this.setState(pState => ({isActive: !pState.isActive}));
    }

    render() {
        return (
              <Navbar>
                <NavbarBrand >
                    <Link to='/' className='navbar__brand-home' title={label.navigation.logoTitle}><img src={logo} alt='Логотип ЖК' className='navbar__brand-logo'/></Link>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                </NavbarBrand>
                <NavbarMenu>
                    <NavbarStart>
                    {
                        this.state.links.map(link => <Link className='navbar-item' to={link.Link} key={`link_${link.id}`} onClick={this.onClickNav}>{link.Title}</Link>)
                    }

                    {
                        this.state.groups.map(group => (
                            <NavbarItem hasDropdown isHoverable key={`group_${group.id}`}>
                                <NavbarLink>{group.Title}</NavbarLink>
                                <NavbarDropdown isBoxed>
                                  {group.navlinks.map(link => <Link className='navbar-item' to={link.Link} key={link.id} onClick={this.onClickNav}>{link.Title}</Link>)}
                                </NavbarDropdown>
                            </NavbarItem>
                          )
                        )
                    }
                    <NavbarItem hasDropdown isHoverable key='login'>
                      <NavbarLink>
                        <FontAwesomeIcon icon={faUser} /> 
                        <span className="">{this.props.user.username}</span>
                      </NavbarLink>
                      <NavbarDropdown isBoxed className='navbar__loginbox'>
                        <LoginForm user={this.props.user} onSignOut={this.props.signout} onSubmit={this.props.login} />
                      </NavbarDropdown>
                    </NavbarItem>
                    </NavbarStart>
                </NavbarMenu>
              </Navbar>
        )
    }
}

export default Header;
