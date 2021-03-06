import api from "../variables/api";
import axios from 'axios';
import { getToken } from './authorization';

const requestData = `
    request {
        description,
        id,
        quality,
        speed,
        created_at,
        updated_at,
        status {
            color,
            label,
            id,
            value
        },
        user {
            appartment {
                number,
                section,
                floor
            },
            username,
            email,
            phone
        },
        comments {
            text,
            user {
                id,
                username
            },
            created_at
        }
    }
`

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
      abouts(sort: "order:asc") {
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

export const getBlogs = (sort, limit = '') => {
  let requestUrl = `${api.url}${api.blogs}`;
  
  if (!!sort) requestUrl += `?_sort=created_at:${sort}`;
  if (!!limit) requestUrl += `&_limit=${limit}`;

  return axios(requestUrl);
}

export const getTariffs = () => {
  return axios.get(api.tariffs);
};

export const getRequests = () => {
  return axios.get(api.requests, {
    headers: {
      Authorization: `Bearer ${getToken()}`, 
    },
  });
};

export const getRequestById = id => {
    return axios.post(api.graphql, 
        {
            query: `query {
                request(id: ${id}) {
                    description,
                    id,
                    quality,
                    speed,
                    created_at,
                    updated_at,
                    status {
                        color,
                        label,
                        id,
                        value
                    },
                    user {
                        appartment {
                            number,
                            section,
                            floor
                        },
                        username,
                        email,
                        phone
                    },
                    comments {
                        text,
                        user {
                            id,
                            username
                        },
                        created_at
                    }
                }
            }`
        },
        {
            headers: {
            Authorization: `Bearer ${getToken()}`,
            },
        }
    );
};

export const getRequestsMe = () => {
  return axios.get(`${api.requests}/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`, 
    },
  });
};

export const postRequest = (description, user) => {
  return axios.post(api.requests, {
    description,
    user,
    status: 1,
  },
  {
    headers: {
      Authorization: `Bearer ${getToken()}`, 
    },
  });
}


export const getUserAppartment = (id) => {
  return axios.post(api.graphql,
    {
      query: `query {
        user(id: ${id}) {
          appartment {
            number,
            section,
            floor,
            space,
            rooms
          }
        }
      }`
    },
    {
      headers: {
          Authorization: `Bearer ${getToken()}`, 
        }
    }
  );   
}

export const getUserMe = () => {
  return axios.post(api.graphql,
    {
      query: `query {
        me {
          username,
          email,
          role {
            type
          }
        }
      }`
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`, 
      }
    }
    );    
  }
  
  export const getMe = () => {
    return axios.get(api.userMe,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`, 
      }
    }
  );    
};

export const getStatuses = () => {
  return axios.post(api.graphql,
    {
      query: `query {
        statuses {
          label,
          value,
          color,
          id,
        }
      }`
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`, 
      }
    }
    ); 
};

export const updateRequestStatus = (id, status) => {
  return axios.post(api.graphql, { 
      query: `
        mutation {
            updateRequest (input:{
                where: {
                    id: ${id}
                },
                data:{
                    status: ${status}
                }
            }) {
                ${requestData}
            }
        }
      `
   },
  {
    headers: {
      Authorization: `Bearer ${getToken()}`, 
    },
  });
};

export const updateRequestSpeed = (id, speed) => {
  return axios.post(api.graphql, { 
      query: `
        mutation {
            updateRequest (input:{
                where: {
                    id: ${id}
                },
                data:{
                    speed: ${speed}
                }
            }) {
                ${requestData}
            }
        }
      `
   },
  {
    headers: {
      Authorization: `Bearer ${getToken()}`, 
    },
  });
};

export const updateRequestQuality = (id, quality) => {
  return axios.post(api.graphql, { 
      query: `
        mutation {
            updateRequest (input:{
                where: {
                    id: ${id}
                },
                data:{
                    quality: ${quality}
                }
            }) {
                ${requestData}
            }
        }
      `
   },
  {
    headers: {
      Authorization: `Bearer ${getToken()}`, 
    },
  });
};

export const getCommentsByRequestId = (requestId) => {
    return axios.post(api.graphql,
        {
        query: `query {
            comments(where: { 
                    request: { id: ${requestId} }
                }) {
                id,
                text,
                created_at,
                user {
                    id,
                    username,
                    email
                }
            }
        }`
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`, 
            }
        }
    ); 
};

export const postComment = (text, requestId, userId) => {
    return axios.post(`${api.comments}`,
        {
            text,
            request: requestId,
            user: userId,
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`, 
            }
        }
    );
}

