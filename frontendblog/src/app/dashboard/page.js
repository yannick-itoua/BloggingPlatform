'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getCommentsByBlogId,
  createComment,
  deleteComment,
  updateComment, // ✅ Import the updateComment function
} from '../../../utils/api';

export default function DashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editBlogId, setEditBlogId] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const router = useRouter();

  // Fetch blogs on page load
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const data = await getBlogs();
    setBlogs(data);
  };

  const handleCreateOrUpdateBlog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    if (editBlogId) {
      await updateBlog(editBlogId, { title, content }, token);
      setEditBlogId(null);
    } else {
      await createBlog({ title, content }, token);
    }

    setTitle('');
    setContent('');
    fetchBlogs();
  };

  const handleDeleteBlog = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    await deleteBlog(id, token);
    fetchBlogs();
  };

  const handleEditBlog = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditBlogId(blog._id);
  };

  const fetchComments = async (blogId) => {
    const data = await getCommentsByBlogId(blogId);
    setComments((prev) => ({
      ...prev,
      [blogId]: data,
    }));
  };

  const handleAddComment = async (e, blogId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    await createComment(blogId, { content: commentContent }, token);
    setCommentContent('');
    fetchComments(blogId);
  };

  const handleDeleteComment = async (blogId, commentId) => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    await deleteComment(commentId, token);
    fetchComments(blogId);
  };

  const handleEditComment = (comment) => {
    setCommentContent(comment.content);
    setEditCommentId(comment._id);
  };

  const handleUpdateComment = async (blogId, commentId) => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    // ✅ Correct the API call to update the comment
    await updateComment(commentId, { content: commentContent }, token);

    // Clear the edit state
    setEditCommentId(null);
    setCommentContent('');

    // Refresh the comments
    fetchComments(blogId);
  };

  return (
    <main className="p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>

      {/* Blog creation/update form */}
      <form
        onSubmit={handleCreateOrUpdateBlog}
        className="bg-white text-gray-900 rounded-lg shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editBlogId ? 'Edit Blog' : 'Create a New Blog'}
        </h2>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded hover:from-blue-600 hover:to-green-600 transition"
        >
          {editBlogId ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>

      {/* Display blogs */}
      <section>
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white text-gray-900 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p className="text-gray-700 mt-2">{blog.content}</p>
            <div className="mt-4 flex">
              <button
                onClick={() => handleEditBlog(blog)}
                className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBlog(blog._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {/* Fetch and display comments */}
            <div className="mt-6">
              <button
                onClick={() => fetchComments(blog._id)}
                className="bg-gray-700 text-white p-2 rounded hover:bg-gray-800"
              >
                Show Comments
              </button>

              {comments[blog._id] && (
                <div className="mt-4 bg-gray-100 text-gray-900 rounded-lg shadow p-4">
                  {comments[blog._id].map((comment) => (
                    <div key={comment._id} className="p-2 bg-white rounded shadow mb-2">
                      {editCommentId === comment._id ? (
                        <>
                          <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => handleUpdateComment(blog._id, comment._id)}
                            className="bg-green-500 text-white p-1 rounded mt-2 hover:bg-green-600"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <p>{comment.content}</p>
                          <div className="mt-2 flex">
                            <button
                              onClick={() => handleEditComment(comment)}
                              className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                            >
                              Edit Comment
                            </button>
                            <button
                              onClick={() => handleDeleteComment(blog._id, comment._id)}
                              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                            >
                              Delete Comment
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Form to add a new comment */}
              <form onSubmit={(e) => handleAddComment(e, blog._id)} className="mt-4">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Add a comment"
                  className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-600"
                >
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
