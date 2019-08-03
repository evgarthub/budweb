import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.scss';
import Footer from './comp/Footer/Footer';
import Header from './comp/Header/Header';
import ScrollToTop from './comp/Helpers/ScrollToTop';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import InfrastructurePage from './pages/InfrastructurePage/InfrastructurePage';
import ListPage from './pages/ListPage/ListPage';
import NewsPage from './pages/NewsPage/NewsPage';
import PollsPage from './pages/PollsPage/PollsPage';
import TicketPage from './pages/TicketPage';
import api from "./variables/api";


class App extends Component {
  constructor() {
    super();
    this.state = {
      navisOpened: false,
      isLoading: false,
      configId: 1,
      navId: 1,
      fooId: 1
    }
  }

  componentDidMount() {
    fetch(api.graphql, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query {
            siteconfig(id: ${this.state.configId}) {
              footerid
              navigationid
            }
        }`
      })
    }).then(response => response.json())
    .then(res => {
      const resData = res.data.siteconfig;
      this.setState({
          isLoading: false,
          fooId: resData.footerid,
          navId: resData.navigationid
      });
    });
  }

  render() {
    return (
      <>
      <BrowserRouter>
      <ScrollToTop>
        <div className="App">
        <Helmet
                titleTemplate="%s | Наш будинок"
                defaultTitle="Наш будинок | Сторінка мешканців будинку">
                <meta property="og:title" content="Наш будинок - Сторінка мешканців будинку" />
                <meta name="description" property="og:description" content="Сторінка мешканців будинку. На сайті можливо знайти свіжі оголошення, інформацію, стосовно будинку, різні інструкції та контакти" />
        </Helmet>

          <Header id={this.state.navId} />

          <section className='scroll-box'>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/news" component={ListPage} />
              <Route path="/news/:id" component={NewsPage} />
              <Route path="/contacts" component={ContactPage} />
              <Route path="/infrastructure" component={InfrastructurePage} />
              <Route path="/polls" component={PollsPage} />
              <Route path="/ticket" component={TicketPage} />
            </Switch>

            <Footer id={this.state.fooId} />
          </section>

        </div>
        </ScrollToTop>
      </BrowserRouter>

      </>
    );
  }
}

export default App;
