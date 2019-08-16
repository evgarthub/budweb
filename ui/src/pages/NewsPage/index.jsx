import { Button, Container, Content, Hero, HeroBody, Title } from 'bloomer';
import { Section } from 'bloomer/lib/layout/Section';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import ReactMarkdown from 'react-markdown';
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { getBlogById } from '../../utils/fetchAPI';
import api from "../../variables/api";
import { label } from '../../variables/labels';
import './styles.scss';

const NewsPage = (props) => {
    const [data, setData] = useState({
        title: null,
        intro: null,
        text: null,
        imageUrl: null,
        categories: [],
        navlinks: [],
    });

    useEffect(() => {
        getBlogById(props.match.params.id).then(({ data }) => {
            const { title, intro, text, image, categories, navlinks } = data.data.blog;

            setData({
                imageUrl: image && api.url+image.url,
                title,
                intro,
                text,
                categories,
                navlinks
            });
        });
    });

    return (
        <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>

            <section className='news-page'>
                <Helmet>
                    <title>{data.title}</title>
                    <meta property="og:title" content={data.title} />
                    <meta name="description" property="og:description" content={data.intro} />
                </Helmet>
                <Hero isColor='info' isSize='medium' className="news-page__hero" style={{backgroundImage: `url(${data.imageUrl})`}}>
                    <HeroBody className="news-page__hero-body">
                        <Container hasTextAlign='centered'>
                            <Title isSize={3}>{data.title}</Title>
                        </Container>
                    </HeroBody>
                </Hero>
                <Section>
                    <Container>
                        <header className='news-page__header'>
                            <span className='news-page__tags-title'>{label.news.tags}</span>
                            <div className='news-page__tags'>
                                {data.categories.map(cat => <span className={`news-page__tag tag ${cat.color}`} key={cat.id}>{cat.name}</span>)}
                            </div>
                        </header>
                        <Content>
                            <ReactMarkdown source={data.text} />
                            {this.state.navlinks.map(link => (<a target="_blank" href={link.Link} key={link.id} rel="noopener noreferrer">
                                <Button isColor="success">{link.Title}</Button>
                            </a>))}
                        </Content>
                        <footer className='news-page__clap-wrapper'>
                      
                        </footer>
                    </Container>
                </Section>
            </section>
        </Transition>
    );
}

export default NewsPage;
