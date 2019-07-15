const API_URL = 'http://localhost:1337';
const API_URL_GRAPHQL = `${API_URL}/graphql`;
const AUTH_URL = `${API_URL}/admin/auth/local`;

export default {
    url: API_URL,
    graphql: API_URL_GRAPHQL,
    blogs: '/blogs',
    abouts: '/abouts',
    news: '/news',
    auth: AUTH_URL,
}
