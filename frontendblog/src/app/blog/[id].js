'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getBlogById,
  getCommentsByBlogId,
  createComment,
  deleteComment,
} from '../../../utils/api';

export default function BlogDetailsPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const router = useRouter();

  // Fetch blog details and comments when the page loads
  useEffect(() => {
    fetchBlogDetails();
    fetchComments();
  }, []);

  // Fetch blog details
  const fetchBlogDetails = async () => {
    const data = await getBlogById(params.id);
    setBlog(data);
  };

  // Fetch comments for the blog
  const fetchComments = async () => {
    const data = await getCommentsByBlogId(params.id);
    setComments(data);
  };

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    await createComment(params.id, { content: newComment }, token);
    setNewComment('');
    fetchComments(); // Refresh the comments list after adding a new one
  };

  // Handle deleting a comment
  const handleDeleteComment = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    await deleteComment(id, token);
    fetchComments(); // Refresh the comments list after deletion
  };

  // Handle editing a comment
  const handleEditComment = (comment) => {
    setNewComment(comment.content);
    setEditCommentId(comment._id);
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="mt-2">{blog.content}</p>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Comments</h2>

        {/* Display existing comments */}
        {comments.map((comment) => (
          <div key={comment._id} className="p-2 mt-4 bg-white shadow rounded">
            <p>{comment.content}</p>
            <div className="flex mt-2">
              <button
                onClick={() => handleEditComment(comment)}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Form to add a new comment */}
        <form onSubmit={handleAddComment} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="block w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            {editCommentId ? 'Update Comment' : 'Add Comment'}
          </button>
        </form>
      </section>
    </main>
  );
}
