import React, { Component } from 'react';
import './App.scss';
import NewsPage from './pages/NewsPage/NewsPage';
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListPage from './pages/ListPage/ListPage';
import ContactPage from './pages/ContactPage/ContactPage';
import InfrastructurePage from './pages/InfrastructurePage/InfrastructurePage';
import HomePage from './pages/HomePage/HomePage';
import PollsPage from './pages/PollsPage/PollsPage';
import ScrollToTop from './comp/Helpers/ScrollToTop';
import { getSiteConfigById } from './utils/fetchAPI';
import { doLogin, getUserInfo } from './utils/authorization';
import { Helmet } from "react-helmet";


class App extends Component {
  constructor() {
    super();
    this.state = {
      navisOpened: false,
      isLoading: false,
      configId: 1,
      navId: 1,
      fooId: 1,
      userProfile: {
        username: 'guest',
      }
    }
  }

  componentDidMount() {

    getSiteConfigById(this.state.configId).then(({ data }) => {
      const resData = data.data.siteconfig;
      this.setState({
          isLoading: false,
          fooId: resData.footerid,
          navId: resData.navigationid
      });
    });

    getUserInfo()
      .then(({ data }) => {
        this.setUserInfo(data);
      })
      .catch(data => {
        console.log(data);
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

              <Header id={this.state.navId} user={this.state.userProfile} login={this.handleLogin} signout={this.handleSignOut} />

              <section className='scroll-box'>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/news" component={ListPage} />
                  <Route path="/news/:id" component={NewsPage} />
                  <Route path="/contacts" component={ContactPage} />
                  <Route path="/infrastructure" component={InfrastructurePage} />
                  <Route path="/polls" component={PollsPage} />
                </Switch>

                <Footer id={this.state.fooId} />
              </section>

            </div>
          </ScrollToTop>
        </BrowserRouter>
      </>
    );
  }

  handleLogin = (login, password) => {
    doLogin(login, password)
    .then(resp => {
      const { jwt } = resp.data;

      switch (resp.status) {
        case 200:
          localStorage.setItem('nb_token', jwt);
          getUserInfo().then(({ data }) => {
            this.setUserInfo(data);
          })
          break;

        default:
          alert(resp.statusText);
      }
      
    })
    .catch(data => {
      alert(data);
    });
  }

  handleSignOut = () => {
    localStorage.removeItem('nb_token');
    getUserInfo().then(({ data }) => {
      this.setUserInfo(data);
    })
  }

  setUserInfo = (data) => {
    this.setState({
      userProfile: { ...data }
    });
  }
}

export default App;
