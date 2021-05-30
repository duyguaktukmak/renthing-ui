import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const BASE_API = 'http://localhost:8080';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${BASE_API}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${BASE_API}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${BASE_API}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${BASE_API}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  // TODO
  getAll: () => []/*requests.get('/tags')*/
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Items = {
  all: page =>
    requests.get(`/items`),
    //requests.get(`/items?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/items'),
    //requests.get('/articles/feed?limit=10&offset=0'),
  get: id =>
    requests.get(`/items/${id}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Comments = {
  create: (itemId, comment) =>
    requests.post(`/items/${itemId}/comments`, { comment }),
  delete: (itemId, commentId) =>
    requests.del(`/items/${itemId}/comments/${commentId}`),
  forItem: id =>
    []
    // TODO
    //requests.get(`/items/${id}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Items,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = _token; }
};
