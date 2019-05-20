import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarStart, NavbarDropdown, NavbarLink, NavbarBurger } from 'bloomer';
import logo from '../../assets/logo.svg';
import './Header.scss';
import { Link } from "react-router-dom";
import api from "../../variables/api";
import { label } from '../../variables/labels';
import { navExpand, navCollapse } from '../../utils/animations';


class Header extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.id,
            title: null,
            links: [],
            groups: [],
            isLoading: false,
            isActive: false
          }

    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch(api.graphql, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query {
              navigation(id: ${this.state.id}) {
                Home
                navlinks {
                  id
                  Title
                  Link
                }
                navgroups {
                  id
                  Title
                  navlinks {
                    id
                    Title
                    Link
                  }
                }
              }
            }`
          })
        }).then(response => response.json())
            .then(res => {
                const resData = res.data.navigation;
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
                        this.state.links.map(link => <Link className='navbar-item' to={link.Link} key={link.id} onClick={this.onClickNav}>{link.Title}</Link>)
                    }

                    {
                        this.state.groups.map(group => (
                            <NavbarItem hasDropdown isHoverable key={group.id}>
                                <NavbarLink>{group.Title}</NavbarLink>
                                <NavbarDropdown isBoxed>
                                {group.navlinks.map(link => <Link className='navbar-item' to={link.Link} key={link.id} onClick={this.onClickNav}>{link.Title}</Link>)}
                                </NavbarDropdown>
                            </NavbarItem>
                          )
                        )
                    }
                    </NavbarStart>
                </NavbarMenu>
              </Navbar>
        )
    }
}

export default Header;
