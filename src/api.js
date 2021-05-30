import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const BASE_API = "http://localhost:8080";

const encode = encodeURIComponent;
const responseBody = (res) => res.body;

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set("Authorization", `Bearer ${token}`);
  }
};

const requests = {
  del: (url) =>
    superagent.del(`${BASE_API}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${BASE_API}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${BASE_API}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${BASE_API}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Auth = {
  current: () => requests.get("/users/currentUser"),
  login: (username, password) =>
    requests.post("/users/login", { username, password }),
  register: (username, name, email, phone, address, password) =>
    requests.post("/users/register", {
      username,
      name,
      email,
      phone,
      address,
      password,
    }),
  save: (user) => requests.put("/user", { user }),
};

const Tags = {
  // TODO
  getAll: () => ["home", "repair", "phone"] /*requests.get('/tags')*/,
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const Items = {
  all: (page) => requests.get(`/items`),
  feedRentedByUser: () => requests.get("/items/feedRentedByUser"),
  feedLeasedByUser: () => requests.get("/items/feedLeasedByUser"),
  feedApproveWaitingByUser: () => requests.get("/items/approveWaitingItems"),
  feedOfferedByUser: () => requests.get("/items/offeredItems"),
  get: (id) => requests.get(`/items/${id}`),
  create: (item) => requests.post("/items/addItem", item),
};

const Comments = {
  create: (itemId, comment) =>
    requests.post(`/items/${itemId}/comments`, { comment }),
  delete: (itemId, commentId) =>
    requests.del(`/items/${itemId}/comments/${commentId}`),
  forItem: (id) => [],
  // TODO
  //requests.get(`/items/${id}/comments`)
};

const Rent = {
  rentRequest: (payload) => requests.post("/rent/rentRequest", payload),
  resultRentOffer: (payload) => requests.post("/rent/resultRentOffer", payload),
  finishRent: (payload) => requests.post("/rent/finishRent", payload),
};

const Profile = {
  follow: (username) => requests.post(`/profiles/${username}/follow`),
  get: (username) => requests.get(`/profiles/${username}`),
  unfollow: (username) => requests.del(`/profiles/${username}/follow`),
};

export default {
  Items,
  Auth,
  Comments,
  Profile,
  Tags,
  Rent,
  setToken: (_token) => {
    token = _token;
  },
};
