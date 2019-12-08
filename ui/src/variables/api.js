const API_URL = 'https://api.nashbud.pp.ua';

export default {
    url: API_URL,
    graphql: `${API_URL}/graphql`,
    blogs: '/blogs',
    abouts: '/abouts',
    news: '/news',
    auth: `${API_URL}/auth/local`,
    userMe: `${API_URL}/users/me`,
    users: `${API_URL}/users`,
    tariffs: `${API_URL}/tariffs`,
    register: `${API_URL}/auth/local/register`,
    requests: `${API_URL}/requests`,
    statuses: `${API_URL}/statuses`,
    comments: `${API_URL}/comments`,
}
