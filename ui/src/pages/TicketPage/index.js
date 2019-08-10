import { Container, Hero, HeroBody, Section, Title } from 'bloomer';
import React from 'react';
import { Helmet } from "react-helmet";
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';
import './styles.scss';

const TicketPage = () => {
    return (
        <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>
            <section className='ticket-page'>
                <Helmet>
                    <title>{label.ticket.title}</title>
                    <meta property="og:title" content={label.ticket.title} />
                    <meta name="description" property="og:description" content={label.ticket.metaDescription} />
                </Helmet>
                <Hero isColor='warning' isSize='small'>
                    <HeroBody>
                        <Container hasTextAlign='centered'>
                            <Title isSize={3}>{label.ticket.title}</Title>
                        </Container>
                    </HeroBody>
                </Hero>
                <div className='ticket-page__post-card'>
                    <Section>
                        <Container>                            
                            <section className="ticket-page__poll-wrapper">
                                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc_RIbHBdH6Vwt3IrFklWWNpBHcRnZqhXPwyByt8tWe9fIjAw/viewform?embedded=true"
                                    className="ticket-page__poll"
                                    width="640"
                                    height="1200"
                                    frameBorder="0"
                                    marginHeight="0"
                                    marginWidth="0"
                                    title="poll">Завантаження...</iframe>
                            </section>
                        </Container>
                    </Section>
                </div>
            </section>
        </Transition>

    );
}

export default TicketPage;
