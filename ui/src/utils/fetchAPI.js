import api from "../variables/api";
import axios from 'axios';
import { getToken } from './authorization';

export const getBlogById = (id) => {
  return axios.post(api.graphql, {
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
        navlinks {
          id
          Title
          Link
        }
      }
    }`
  })
}

export const getNavigationById = (id) => {
  return axios.post(api.graphql, {
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
  });
}

export const getSiteConfigById = (id) => {
  return axios.post(api.graphql, {
      query: `query {
        siteconfig(id: ${id}) {
          footerid
          navigationid
        }
      }`
  });
}

export const getGoogleMapString = (id) => {
  return axios.post(api.graphql, {
    query: `query {
      siteconfig(id: ${id}) {
        gmapurl
      }
  }`
  })
}

export const getAbouts = () => {
  return axios.post(api.graphql, {
    query: `query {
      abouts {
        id
        title
        subtitle
        description
        contacts {
          description
          data
          type
          id
        }
        navlinks {
          Title
          Link
          id
        }
        image {
          url
        }
      }
    }`
  })
}

export const getUserById = (id) => {
  return axios.get(`${api.users}/${id}`, {
      headers: {
          Authorization: `Bearer ${getToken()}`, 
      }
  });    
}

export const getFooterById = (id) => {
  return axios.post(api.graphql, {
    query: `query {
      footer(id: ${id}) {
        About
        navlinks {
          id
          Title
          Link
        }
      }
    }`
  });
} 

export const getBlogs = (sort) => {
  return axios(`${api.url}${api.blogs}?_sort=created_at:${sort}`);
}