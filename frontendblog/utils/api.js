import axios from 'axios';

// Axios instance configuration
const api = axios.create({
  baseURL: 'http://localhost:5000', // Change to your backend URL if needed
});

// Helper functions for Blogs
export const getBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData, token) => {
  const response = await api.post('/blogs', blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateBlog = async (id, blogData, token) => {
  const response = await api.put(`/blogs/${id}`, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteBlog = async (id, token) => {
  const response = await api.delete(`/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Helper functions for Comments
export const getCommentsByBlogId = async (blogId) => {
  const response = await api.get(`/comments/${blogId}`);
  return response.data;
};

export const createComment = async (blogId, commentData, token) => {
  const response = await api.post(`/comments/${blogId}`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateComment = async (commentId, commentData, token) => {
  const response = await api.put(`/comments/${commentId}`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteComment = async (commentId, token) => {
  const response = await api.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default api;
