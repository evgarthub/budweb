import React, { useState, useEffect } from 'react';
import { Footer as Foo, Container, Content } from 'bloomer';
import './styles.scss';
import { getFooterById } from "../../utils/fetchAPI";
import { getLinkIcon } from '../../utils/helpers';
import { label } from '../../variables/labels';

const Footer = (props) => {
    const [data, setData] = useState({
        about: null,
        links: [],
    })

    useEffect(() => {
        getFooterById(props.id)
            .then(({data}) => {
                const { About, navlinks } = data.data.footer;
                setData({
                    about: About,
                    links: navlinks,
                });
            });
    }, [props.id]) 

    return (
        <Foo>
            <Container>
                <Content>
                    <p>{data.about}</p>

                    <div className='footer__links'>
                        <span>{label.footer.social} </span>
                        {data.links.map(link => {
                            const SocialIcon = getLinkIcon(link.Title.toLowerCase());

                            return (
                                <a className='footer__link footer__link--social' href={link.Link} key={link.id}>
                                    <SocialIcon size={16} />
                                    <span className='footer__link-text' style={{marginLeft: '.5em'}}>{link.Title}</span>
                                </a>
                            )
                        })}
                    </div>
                </Content>
            </Container>
        </Foo>
    );
}

export default Footer;
