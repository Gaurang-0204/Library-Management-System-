
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
   // Corrected import
import { EyeIcon, EyeOffIcon } from "lucide-react";  // After installing lucide-react

import { Search, ChevronLeft, ChevronRight, Book, List, Star, User } from "lucide-react";
import SideBar from "./Authentication/SideBar";
import axios from "axios";

const Home = () => {

  const [stats, setStats] = useState({
    total_books: 0,
    total_members: 0,
    total_issued_books: 0
});

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


useEffect(() => {
  const fetchStats = async () => {
      try {
          const response = await axios.get("http://127.0.0.1:8000/api/dashboard-stats/");
          setStats(response.data);
      } catch (err) {
          setError("Failed to fetch data");
      } finally {
          setLoading(false);
      }
  };

  fetchStats();
}, []);



if (loading) return <p>Loading...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;





      // const categories = [
      //     { title: "Books", updated: "Total available books : "{stats.total_books}, color: "bg-purple-500" },
      //     { title: "Members", updated: "Total Members:"{stats.total_members}, color: "bg-blue-500" },
      //     { title: "Returns", updated: "All returns made :"{stats.total_issued_books} , color: "bg-teal-500" },
      //     { title: "Categories", updated: "Book Categories ", color: "bg-pink-500" },
      //     { title: "General", updated: "Updated 2 days ago", color: "bg-orange-500" },
      //   ];



      const categories = [
        { title: "Books", updated: `Total available books: ${stats.total_books}`, color: "bg-purple-500" },
        { title: "Members", updated: `Total Members: ${stats.total_members}`, color: "bg-blue-500" },
        { title: "Returns", updated: `All returns made: ${stats.total_issued_books}`, color: "bg-teal-500" },
        { title: "Categories", updated: "Book Categories", color: "bg-pink-500" },
      ];
      
        
        const books = new Array(6).fill({ title: "Node.js", author: "David Harron", rating: 4 });
        
        const sidebarItems = [
      { name: "Books", icon: <Book size={24} />, path: "/books" },
      { name: "My Bag", icon: <List size={24} />, path: "/mybag" },
      { name: "Readers", icon: <Star size={24} />, path: "/readers" },
      { name: "Returns", icon: <User size={24} />, path: "/returns" },
      { name: "Add Book", icon: <User size={24} />, path: "/AddBook" },
        ];


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
                  <span className="text-gray-700 font-medium"></span>
                </div>
              </div>
      
              {/* Categories */}
              <section>
                <h2 className="text-lg font-semibold mb-2">Library Management System </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Each book is good in its own way. This digest may slightly take that into account.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((cat, index) => (
                    <div
                      key={index}
                      className={`${cat.color} text-white p-4 rounded-lg shadow-md`}
                    >
                      <h3 className="font-semibold">{cat.title}</h3>
                      <p className="text-sm opacity-80">{cat.updated}</p>
                    </div>
                  ))}
                </div>
              </section>
      
              {/* Book Catalog */}
              <section className="mt-6">
                <h2 className="text-lg font-semibold mb-4">⚡ New Arrivals (20)</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {books.map((book, index) => (
                    <div key={index} className="bg-purple-900 text-white p-3 rounded-lg shadow-md">
                      <div className="h-16 w-12 bg-gray-700 mb-2"></div>
                      <h4 className="text-sm font-semibold">{book.title}</h4>
                      <p className="text-xs opacity-80">{book.author}</p>
                      <p className="text-yellow-400">{'⭐'.repeat(book.rating)}</p>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
    </div>
  )
}

export default Home