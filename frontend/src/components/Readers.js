import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
   // Corrected import
import { EyeIcon, EyeOffIcon } from "lucide-react";  // After installing lucide-react

import { Search, ChevronLeft, ChevronRight, Book, List, Star, User } from "lucide-react";
import SideBar from './Authentication/SideBar';

const Readers = () => {
  const [readers, setReaders] = useState([]);
  

  useEffect(() => {
          fetch("http://127.0.0.1:8000/api/readers/")
              .then((response) => response.json())
              .then((data) => setReaders(data))
              .catch((error) => console.error("Error fetching readers:", error));
      }, []);

      
  return (
    <div>

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

        


<div className="p-6 bg-gray-100 min-h-screen">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold">Members</h2>
    <Link to='/AddMember'>
    <button className="bg-red-500 text-white px-4 py-2 rounded">Add New Members </button>
    </Link>
  </div>
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="grid grid-cols-5 font-semibold p-2 border-b">
      <span>ID</span>
      <span>Name </span>
      <span>Contact</span>
      <span>Address</span>
      <span>Books issued</span>
    </div>
    {readers.map((reader) => (
      <div
        key={reader.reference_id}
        className="my-2 bg-gray-50 p-2 rounded shadow-sm grid grid-cols-5 items-center"
      >
        <span>{reader.reference_id}</span>
        <span className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center text-white mr-2">
            
          </div>
          {reader.reader_name}
        </span>
        <span>{reader.reader_contact}</span>
        <span>{reader.reader_address}</span>
        <span>
        {reader.books_in_bag.length > 0 
  ? `${reader.books_in_bag.length} books` 
  : "None"}
        </span>
      </div>
    ))}
  </div>
</div>


       

        
      </main>
    </div>
    </div>
  )
}

export default Readers