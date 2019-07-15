import api from "../variables/api";
import axios from 'axios';

const getBlogById = (id) => {
  return axios({
    url: api.graphql,
    method: 'post',
    data: {
      query: `query {
        blog(id: ${id}) {
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
        }
      }`
    }
  });
}

const getNavigation = (id) => {
  return fetch(api.graphql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
        navigation(id: ${id}) {
          Home
          navlinks {
            id
            Title
            Link
          }
          navgroups {
            id
            Title
            navlinks {
              id
              Title
              Link
            }
          }
        }
      }`
    })
  })
}

const doLogin = (login, pass) => {
  return axios.post(api.auth, {
    identifier: login,
    password: pass,
  });
}

export {
  getBlogById,
  doLogin,
  getNavigation,
}

