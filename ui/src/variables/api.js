const API_URL = 'http://localhost:1337';

export default {
    url: API_URL,
    graphql: `${API_URL}/graphql`,
    blogs: '/blogs',
    abouts: '/abouts',
    news: '/news',
    auth: `${API_URL}/auth/local`,
    userMe: `${API_URL}/users/me`,
    users: `${API_URL}/users`,
}
