import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
   // Corrected import
import { EyeIcon, EyeOffIcon } from "lucide-react";  // After installing lucide-react

import { Search, ChevronLeft, ChevronRight, Book, List, Star, User } from "lucide-react";
import SideBar from './Authentication/SideBar';

export default function StudentPortal() {
  const [Sbook, setBooks] = useState([]);

   
      
      
     
      


      useEffect(() => {
        axios.get('http://localhost:8000/api/books/')
          .then(response => {
            setBooks(response.data);
            
          })
          .catch(error => {
            console.error('There was an error fetching the books!', error);
          });
      }, []);
      
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar/>
      
      {/* Main Content */}
      <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex items-center">
            <Search size={20} className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search catalog"
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">SERGEY FILKOV</span>
          </div>
        </div>

        {/* List  */}
        {/* <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Income</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Add New Book</button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-5 font-semibold p-2 border-b">
          <span>Book ID</span>
          <span>Name </span>
          <span>Issue Date</span>
          <span>Return Date</span>
          <span>Status</span>
        </div>
        {Sbook.map((book) => (
          <div key={book.id} className="my-2 bg-gray-50 p-2 rounded shadow-sm grid grid-cols-5 items-center">
            <span>{book.id}</span>
            <span className="flex items-center">
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white mr-2">E</div>
              {book.title}
            </span>
            <span>{book.author}</span>
            <span>{book.published}</span>
            <span className={`px-3 py-1 text-white rounded ${book.statusColor}`}>{book.status}</span>
          </div>
        ))}
      </div>
    </div> */}


<div className="p-6 bg-gray-100 min-h-screen">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold">Books</h2>
    <Link to='/AddBook'>
    <button className="bg-red-500 text-white px-4 py-2 rounded">Add New Book</button>
    </Link>

    
  </div>
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="grid grid-cols-5 font-semibold p-2 border-b">
      <span>Book ISBN</span>
      <span>Name </span>
      <span>Author</span>
      <span>Publish Date</span>
      <span>Status</span>
    </div>
    {Sbook.map((book) => (
      <div
        key={book.id}
        className="my-2 bg-gray-50 p-2 rounded shadow-sm grid grid-cols-5 items-center"
      >
        <span>{book.isbn}</span>
        <span className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center text-white mr-2">
            
          </div>
          {book.title}
        </span>
        <span>{book.author}</span>
        <span>{book.published_date}</span>
        <span
          className={`px-3 py-1 text-white rounded ${
            book.issued ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {book.issued ? "Issued" : "Not Issued"}
        </span>
      </div>
    ))}
  </div>
</div>


       

        
      </main>
    </div>
  );
}
