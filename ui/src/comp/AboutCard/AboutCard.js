import React, { Component } from 'react';
import { Title, Subtitle, Content, Card, CardHeader, Media, MediaLeft, Image, MediaContent, CardHeaderIcon, CardContent, CardFooter, CardFooterItem } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPhone, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import './AboutCard.scss';
import api from "../../variables/api";
import { aboutExpand, aboutCollapse } from '../../utils/animations';

class AboutCard extends Component {
    constructor(props) {
        super();
        this.state = {
            title: props.title,
            subtitle: props.subtitle,
            description: props.description,
            contacts: props.contacts,
            links: props.navlinks,
            imageUrl: `${api.url}${props.image.url}`,
            isCollapsed: true,
            hasFooter: !!props.navlinks.length
        }
    }

    handleCollapse = ({currentTarget}) => {
        this.setState(pState => {
            if(pState.isCollapsed) {
                aboutExpand(currentTarget);
            } else {
                aboutCollapse(currentTarget);
            }

            return {
                isCollapsed: !pState.isCollapsed
            }
        });
    }

    getLinkType = (type, value) => {
        let t;

        switch(type) {
            case 'phone':
                t = 'tel:';
                break;
            case 'email':
                t = 'mailto:';
                break;
            case 'address':
                t = 'https://www.google.com/maps/search/';
                break;
            default:
                t = ''
        }

        return t + value;
    }

    getLinkIcon = (type) => {
        let iconName;

        switch(type) {
            case 'phone':
                iconName = faPhone;
                break;

            case 'address':
                iconName = faMapMarkerAlt;
                break;
            default:
            case 'email':
                iconName = faEnvelope;
                break;
        }

        return iconName;
    }

    render() {
        const { imageUrl, title, subtitle, isCollapsed, description, contacts } = this.state;

        return (
            <Card className='contact-page__card about'>
                <CardHeader onClick={event => this.handleCollapse(event)}>
                    <div className="card-header-title">
                        <Media className='about__media'>
                            <MediaLeft>
                                <Image isSize='96x96' src={imageUrl} />
                            </MediaLeft>
                            <MediaContent>
                                <Title isSize={4}>{title}</Title>
                                <Subtitle isSize={6}>{subtitle}</Subtitle>
                            </MediaContent>
                        </Media>
                    </div>

                    <CardHeaderIcon>
                        <FontAwesomeIcon style={{ display: isCollapsed ? 'flex' : 'none' }} icon={faAngleDown} />
                        <FontAwesomeIcon style={{ display: isCollapsed ? 'none' : 'flex' }} icon={faAngleUp} />
                    </CardHeaderIcon>
                </CardHeader>
                <CardContent className="about__content-wrapper">
                    <Content className='about__content'>
                        <ReactMarkdown source={description} />

                        {
                            contacts.length > 0 && (
                            <section className='contacts'>
                            {
                                contacts.map(contact => {
                                    return (
                                        <div key={contact.id} className='contact'>
                                            <FontAwesomeIcon icon={this.getLinkIcon(contact.type)} />
                                            <span className='contact__desc'>{contact.description}: </span>
                                            <a
                                                href={this.getLinkType(contact.type, contact.data)}
                                                className='contact__value'
                                                target='_blank'
                                                rel="noopener noreferrer">
                                            {contact.data}
                                            </a>
                                        </div>
                                    );
                                })
                            }

                            </section>)
                        }

                    </Content>
                </CardContent>
                {
                    (() => {
                        if (this.state.hasFooter) {
                            return (
                                <CardFooter>
                                    {
                                        this.state.links.map(link => {
                                            return (
                                                <CardFooterItem key={link.id}>
                                                    <a
                                                        href={link.Link}
                                                        target='_blank'
                                                        rel="noopener noreferrer">{link.Title}</a>
                                                </CardFooterItem>
                                            )
                                        })
                                    }
                                </CardFooter>
                            )
                        }
                    })()
                }


            </Card>
        );
    }
}

export default AboutCard;
