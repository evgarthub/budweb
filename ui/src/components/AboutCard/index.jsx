import React, { useState } from 'react';
import { Title, Subtitle, Content, Card, CardHeader, Media, MediaLeft, Image, MediaContent, CardHeaderIcon, CardContent, CardFooter, CardFooterItem } from 'bloomer';
import ReactMarkdown from 'react-markdown';
import './styles.scss';
import api from "../../variables/api";
import { aboutExpand, aboutCollapse } from '../../utils/animations';
import { getLinkIcon, getLinkType } from '../../utils/helpers';
import { ChevronDown, ChevronUp } from 'react-feather';

const AboutCard = (props) => {
    const { title, subtitle, description, contacts, navlinks: links } = props;

    const imageUrl = `${api.url}${props.image.url}`;
    const hasFooter = !!props.navlinks.length;
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleCollapse = ({currentTarget}) => {
        if(isCollapsed) {
            aboutExpand(currentTarget);
        } else {
            aboutCollapse(currentTarget);
        }

        setIsCollapsed(!isCollapsed);
    }

    return (
        <Card className='contact-page__card about'>
            <CardHeader onClick={handleCollapse}>
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
                    {isCollapsed ? <ChevronDown /> : <ChevronUp />}
                </CardHeaderIcon>
            </CardHeader>
            <CardContent className="about__content-wrapper">
                <Content className='about__content'>
                    <ReactMarkdown source={description} />

                    {
                        !!contacts.length && (
                        <section className='contacts'>
                            {contacts.map(contact => {
                                const ContactIcon = getLinkIcon(contact.type);

                                return (
                                    <div key={contact.id} className='contact'>
                                        <ContactIcon size={16} />
                                        <span className='contact__desc'>{contact.description}:</span>
                                        <a  href={getLinkType(contact.type, contact.data)}
                                            className='contact__value'
                                            target='_blank'
                                            rel="noopener noreferrer">
                                                {contact.data}
                                        </a>
                                    </div>
                                );
                            })}
                        </section>)
                    }

                </Content>
            </CardContent>
            {hasFooter && (
                <CardFooter>
                    {links.map(link => (
                        <CardFooterItem key={link.id}>
                            <a href={link.Link} target='_blank' rel="noopener noreferrer">{link.Title}</a>
                        </CardFooterItem>
                    ))}
                </CardFooter>
            )}
        </Card>
    );
};

export default AboutCard;
