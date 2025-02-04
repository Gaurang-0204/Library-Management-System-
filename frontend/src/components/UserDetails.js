import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SideBar from './Authentication/SideBar';
import axios from "axios";


const UserDetails = () => {
   const [selectedReader, setSelectedReader] = useState(null);
     const [query, setQuery] = useState("");
     const [suggestions, setSuggestions] = useState([]);



     const fetchSuggestions = async (input) => {
        if (!input) {
          setSuggestions([]);
          return;
        }
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/search-readers/?q=${input}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions", error);
        }
      };
    


  return (
    <div className="flex h-screen bg-gray-100">
  <SideBar />
  <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
    
    {/* Search Section */}
    <div className="flex justify-between items-center mb-6">
      <div className="relative flex items-center w-1/2">
        <Search size={20} className="absolute left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />
        <button
          className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
          onClick={() => fetchSuggestions(query)}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-50 max-h-60 overflow-y-auto mt-1">
            {suggestions.map((reader) => (
              <li
                key={reader.reference_id}
                className="p-3 hover:bg-purple-100 cursor-pointer transition duration-200"
                onClick={() => {
                  setQuery(reader.reader_name);
                  setSelectedReader(reader);
                  setSuggestions([]);
                }}
              >
                <span className="font-medium">{reader.reader_name}</span>
                <span className="text-gray-500 text-sm"> ({reader.reference_id})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {/* Book Issue Section */}
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Details </h2>
        <Link to="/IssuedBook">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
            Home
          </button>
        </Link>
      </div>

      {selectedReader && (
        <div className="bg-white p-6 rounded-lg shadow-lg flex gap-6 h-full">
          
          {/* User Details Section */}
          <div className="w-1/3 bg-gray-50 p-6 rounded-lg shadow min-h-[350px] flex flex-col justify-between">
            <h2 className="text-lg font-semibold">{selectedReader.reader_name}</h2>
            <p className="text-gray-500">Total Fine: ${selectedReader.total_fine}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Reference ID:</span> {selectedReader.reference_id}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Address:</span> {selectedReader.reader_address}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Contact:</span> {selectedReader.reader_contact}
              </p>
            </div>
          </div>

          {/* Books Issued and Returned Section */}
          <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow min-h-[350px]">
            
            {/* Issued Books */}
            {selectedReader.issued_books.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold mb-2 border-b pb-2">Issued Books</h3>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  {selectedReader.issued_books.map((book) => (
                    <li key={book.book_title} className="text-gray-700">
                      {book.book_title} - <span className="text-red-600">Due: {book.due_date}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-500">No issued books.</p>
            )}

            {/* Returned Books */}
            <h3 className="text-lg font-semibold mb-2 mt-6 border-b pb-2">Returned Books</h3>
            <ul className="list-disc ml-6 space-y-1">
              {selectedReader.returned_books.length > 0 ? (
                selectedReader.returned_books.map((book) => (
                  <li key={book.book_title} className="text-gray-700">
                    {book.book_title} - 
                    <span className="text-green-600"> Returned: {book.return_date}</span> - 
                    <span className="text-red-600"> Fine: ${book.fine_amount}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No returned books.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  </main>
</div>
  )
}

export default UserDetails