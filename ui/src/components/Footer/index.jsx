import React, { Component } from 'react';
import { Footer as Foo, Container, Content } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faViber, faTelegram } from '@fortawesome/free-brands-svg-icons';
import './styles.scss';
import { getFooterById } from "../../utils/fetchAPI";
import { label } from '../../variables/labels';

class Footer extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: false,
            about: null,
            links: []
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});

        getFooterById(this.props.id)
            .then(({data}) => {
                const resData = data.data.footer;
                this.setState(pState => ({
                    ...pState,
                    isLoading: false,
                    about: resData.About,
                    links: resData.navlinks
                }));
            });
    }

    chooseIcon = (iconName) => {
        return iconName.indexOf('facebook') >= 0 ? faFacebookSquare
            : iconName.indexOf('viber') >= 0 ? faViber
            : iconName.indexOf('telegram') >= 0 ? faTelegram
            : faEnvelope;
    }

    render() {


        return (
            <Foo>
                <Container>
                    <Content>
                        <p>{this.state.about}</p>

                        <div className='footer__links'>
                            <span>{label.footer.social} </span>
                            {
                                this.state.links.map(link => {
                                    return (
                                        <a className='footer__link footer__link--social' href={link.Link} key={link.id}>
                                            <FontAwesomeIcon icon={this.chooseIcon(link.Title.toLowerCase())} />
                                            <span className='footer__link-text' style={{marginLeft: '.5em'}}>{link.Title}</span>
                                        </a>
                                    )
                                })
                            }
                        </div>

                    </Content>
                </Container>

            </Foo>
        );
    }
}

export default Footer;

