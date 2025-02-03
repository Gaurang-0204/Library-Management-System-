
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from "lucide-react";
import SideBar from './Authentication/SideBar';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    published_date: '',
    genre: '',
    description: '',
  });

  const [genres, setGenres] = useState([]);

  // Fetch genres from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/genres/')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add-book/', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Book added successfully!');
      setFormData({ title: '', author: '', isbn: '', published_date: '', genre: '', description: '' });
    } catch (error) {
      console.error('Error adding book:', error);
      
      alert('Failed to add book.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />

      <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex items-center w-full max-w-md">
            <Search size={20} className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search catalog"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">SERGEY FILKOV</span>
          </div>
        </div>

        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-3xl font-semibold text-center mb-6 text-purple-700">Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium">Book Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter book title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter author name"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium">ISBN Number</label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter ISBN number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Published Date</label>
                  <input
                    type="date"
                    name="published_date"
                    value={formData.published_date}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium">Genre</label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter book description"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition w-full max-w-xs">
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddBook;

