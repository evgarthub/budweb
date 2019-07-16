import React, { Component } from 'react';
import { Title, Hero, HeroBody, Container, Section } from 'bloomer';
import './ContactPage.scss';
import AboutCard from '../../comp/AboutCard/AboutCard';
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { Helmet } from "react-helmet";
import { label } from '../../variables/labels';
import { getAbouts } from '../../utils/fetchAPI';

class ContactPage extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        getAbouts()
        .then(response => response.json())
        .then(res => {
            const resData = res.data.abouts;
            this.setState({
                data: resData
            });
        });
    }

    render() {
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
                            {
                                this.state.data.map(card => {
                                    return (
                                        <AboutCard key={card.id} {...card} />
                                    );
                                })
                            }

                        </Container>
                    </Section>

                </section>
            </Transition>

        );
    }
}

export default ContactPage;
