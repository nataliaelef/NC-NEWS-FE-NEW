import axios from 'axios';
const BASE_URL = `https://nc-news-api-ne.herokuapp.com/api`;
// 'http://localhost:9090/api';

// Users
export const getUsers = async () =>
  (await axios.get(`${BASE_URL}/users`)).data.users;

export const getUsersByUsername = username => {
  axios.get(`${BASE_URL}/users/${username}`).then(({ data }) => data);
};

// Articles
export const getArticles = async () =>
  (await axios.get(`${BASE_URL}/articles`)).data.articles;

export const getArticleById = async article_id =>
  (await axios.get(`${BASE_URL}/articles/${article_id}`)).data.article;

export const addArticleByTopic = async (title, body, topic, username) =>
  await axios.post(`${BASE_URL}/topics/${topic}/articles`, {
    title,
    body,
    username
  });

// Topics
export const getTopics = async () =>
  (await axios.get(`${BASE_URL}/topics`)).data.topics;

export const addTopic = async topicRequest => {
  await axios.post(`${BASE_URL}/topics`, {
    slug: topicRequest.slug,
    description: topicRequest.description
  });
};

export const getArticlesByTopic = async topic =>
  (await axios.get(`${BASE_URL}/topics/${topic}/articles`)).data.articles;

// Comments
export const getCommentsByArticleId = async articleId =>
  (await axios.get(`${BASE_URL}/articles/${articleId}/comments`)).data.comments;

export const addCommentByArticleId = async commentRequest =>
  await axios.post(`${BASE_URL}/articles/${commentRequest.articleId}`, {
    body: commentRequest.body,
    username: commentRequest.username
  });

//votes
export const voteOnArticle = (addedVote, articleId) => {
  // console.log(articleId);
  return axios({
    method: 'patch',
    url: `${BASE_URL}/articles/${articleId}`,

    data: {
      inc_votes: { addedVote }
    }
  }).then(({ data: { article } }) => article);
};

//votes
export const voteOnComment = (addedVote, articleId, commentId) => {
  return axios({
    method: 'patch',
    url: `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    data: {
      inc_votes: addedVote
    }
  }).then(({ data: { comments } }) => comments);
};
