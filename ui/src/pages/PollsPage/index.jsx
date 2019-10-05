import { Container, Hero, HeroBody, Section, Title } from 'bloomer';
import React from 'react';
import { Helmet } from "react-helmet";
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';
import './styles.scss';

const PollsPage = () => {
    return (
        <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>
            <section className='polls-page'>
                <Helmet>
                    <title>{label.polls.title}</title>
                    <meta property="og:title" content={label.polls.title} />
                    <meta name="description" property="og:description" content={label.polls.metaDescription} />
                </Helmet>
                <Hero isColor='info' isSize='small'>
                    <HeroBody>
                        <Container hasTextAlign='centered'>
                            <Title isSize={3}>{label.polls.title}</Title>
                        </Container>
                    </HeroBody>
                </Hero>
                <div className='polls-page__post-card'>
                    <Section>
                        <Container>
                            <section className="polls-page__poll-wrapper">
                                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeDZT5dNFQ2dNDNSjArOkomFJglT1yja-zEYlBzC5VfkApqJA/viewform?embedded=true"
                                    className="polls-page__poll"
                                    width="640"
                                    height="1200"
                                    frameBorder="0"
                                    marginHeight="0"
                                    marginWidth="0"
                                    title="poll">Loading...</iframe>
                            </section>
                        </Container>
                    </Section>
                </div>
            </section>
        </Transition>
    );
}

export default PollsPage;
