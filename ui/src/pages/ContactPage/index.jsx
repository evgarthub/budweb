import React, { useEffect, useState } from 'react';
import { Title, Hero, HeroBody, Container, Section } from 'bloomer';
import './styles.scss';
import { AboutCard, Spinner } from '../../components';
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { Helmet } from "react-helmet";
import { label } from '../../variables/labels';
import { getAbouts } from '../../utils/fetchAPI';

const ContactPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAbouts().then(({data}) => setData(data.data.abouts));
    }, []);

    if (data) {
        return (
            <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>
                <section className='contact-page'>
                    <Helmet>
                        <title>{label.contact.title}</title>
                        <meta property="og:title" content={label.contact.title} />
                        <meta name="description" property="og:description" content={label.contact.metaDescription} />
                    </Helmet>
                    <Hero isColor='primary' isSize='small'>
                        <HeroBody>
                            <Container hasTextAlign='centered'>
                                <Title isSize={3}>{label.contact.title}</Title>
                            </Container>
                        </HeroBody>
                    </Hero>
                    <Section>
                        <Container>
                            {data.map(card => (<AboutCard key={card.id} {...card} />))}
                        </Container>
                    </Section>
                </section>
            </Transition>
        );
    }

    return <Spinner />
}

export default ContactPage;
