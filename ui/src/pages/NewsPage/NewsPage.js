import React, { Component } from 'react';
import { Title, Hero, HeroBody, Container, Content, Button } from 'bloomer';
import { Section } from 'bloomer/lib/layout/Section';
import './NewsPage.scss';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import api from "../../variables/api";
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';
import { Helmet } from "react-helmet";

class NewsPage extends Component {
    constructor({ match }) {
        super();
        this.state = {
            id: match.params.id,
            isLoading: true,
            title: null,
            intro: null,
            text: null,
            imageUrl: null,
            categories: [],
            navlinks: [],
        }
    }

    componentDidMount() {
        axios({
            url: api.graphql,
            method: 'post',
            data: {
                query: `query {
                    blog(id: ${this.state.id}) {
                        title
                        intro
                        text
                        image {
                            url
                        }
                        categories {
                            id
                            name
                            color
                        }
                        navlinks {
                            id
                            Title
                            Link
                        }
                    }
                }`
            }
        }).then(result => {
            const { title, intro, text, image, categories, navlinks } = result.data.data.blog;
            this.setState({
                isLoading: false,
                imageUrl: image && api.url+image.url,
                title,
                intro,
                text,
                categories,
                navlinks
            });
        });
    }

    render() {
        const { title, intro, categories, text, imageUrl } = this.state;
        return (
            <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>

                <section className='news-page'>
                    <Helmet>
                        <title>{title}</title>
                        <meta property="og:title" content={title} />
                        <meta name="description" property="og:description" content={intro} />
                    </Helmet>
                    <Hero isColor='info' isSize='medium' className="news-page__hero" style={{backgroundImage: `url(${imageUrl})`}}>
                        <HeroBody className="news-page__hero-body">
                            <Container hasTextAlign='centered'>
                                <Title isSize={3}>{title}</Title>
                            </Container>
                        </HeroBody>
                    </Hero>
                    <Section>
                        <Container>
                            <header className='news-page__header'>
                                <span className='news-page__tags-title'>{label.news.tags}</span>
                                <div className='news-page__tags'>
                                    {categories.map(cat => <span className={`news-page__tag tag ${cat.color}`} key={cat.id}>{cat.name}</span>)}
                                </div>
                            </header>

                            <Content>
                                <ReactMarkdown source={text} />
                                {this.state.navlinks.map(link => (<a target="_blank" href={link.Link} key={link.id} rel="noopener noreferrer">
                                    <Button isColor="success">{link.Title}</Button>
                                </a>))}
                            </Content>
                            <footer className='news-page__clap-wrapper'>
                                <span className='news-page__clap-text'>{label.news.clapText} </span>
                                <applause-button color='#209cee' style={{ width: '58px', height: '58px' }} />
                            </footer>
                        </Container>
                    </Section>

                </section>
            </Transition>

        );
    }
}

export default NewsPage;
