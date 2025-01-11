import axios from 'axios';
import { auth } from './auth';

const API_URL = 'http://localhost:8055';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((/** @type {{ headers: { Authorization: string; }; }} */ config) => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchAllPosts() {
  const response = await api.get('/items/posts');
  return response.data.data;
}

/**
 * @param {string} id
 * @param {number | undefined} [postsPerPage]
 */
export async function fetchPost(id, postsPerPage) {
  const response = await api.get(`/items/posts/${id}`);
  return response.data.data;
}

/**
 * @param {{ title: string; content: string; }} postData
 */
export async function createPost(postData) {
  const response = await api.post('/items/posts', postData);
  return response.data.data;
}

/**
 * @param {string} id
 * @param {{ title: string; content: string; }} postData
 */
export async function updatePost(id, postData) {
  const response = await api.patch(`/items/posts/${id}`, postData);
  return response.data.data;
}

/**
 * @param {any} postId
 */
export async function fetchComments(postId) {
  const response = await api.get(`/items/comments?filter[post][_eq]=${postId}`);
  return response.data.data;
}

/**
 * @param {any} postId
 * @param {string} content
 */
export async function createComment(postId, content) {
  const response = await api.post('/items/comments', { post: postId, content });
  return response.data.data;
}

/**
 * @param {any} postId
 */
export async function deletePost(postId) {
  await api.delete(`/items/posts/${postId}`);
}