import React from 'react';
import { Title, Container, Section, Hero, HeroBody } from 'bloomer';
//import './styles.scss';
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';
import { Helmet } from "react-helmet";
import { RegistrationForm } from '../../components/';

const RegistrationPage = () => {
    return (
        <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>
            <section className='registration-page'>
                <Helmet>
                    <title>{label.registration.title}</title>
                    <meta property="og:title" content={label.registration.title} />
                    <meta name="description" property="og:description" content={label.registration.metaDescription} />
                </Helmet>
                <Hero isColor='primary' isBold isSize='small' className="news-page__hero" >
                    <HeroBody className="news-page__hero-body">
                        <Container hasTextAlign='centered'>
                            <Title isSize={3}>{label.registration.title}</Title>
                        </Container>
                    </HeroBody>
                </Hero>
                <Section>
                    <Container>
                        <section className="registration-page__form-wrapper">
                            <RegistrationForm />
                        </section>
                    </Container>
                </Section>
            </section>
        </Transition>
    );
};

export default RegistrationPage;