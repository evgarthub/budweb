import { Container, Hero, HeroBody, Section, Title } from 'bloomer';
import React from 'react';
import { Helmet } from "react-helmet";
import { Transition } from 'react-transition-group';
import { RegistrationForm } from '../../components/';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';

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