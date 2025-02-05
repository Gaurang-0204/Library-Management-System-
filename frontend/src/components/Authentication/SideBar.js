



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Book, List, Star, User, Plus, Search, Minus, Home } from "lucide-react";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Books", icon: <Book size={20} />, path: "/books" },
    { name: "User Details", icon: <Star size={20} />, path: "/UserDetail" },
    { name: "Readers", icon: <Star size={20} />, path: "/readers" },
    { name: "Issue List", icon: <List size={20} />, path: "/IssuedBook" },
    { name: "Add Book", icon: <Plus size={20} />, path: "/addbook" },
    { name: "Add Member", icon: <Plus size={20} />, path: "/addmember " },
    { name: "Issue Book ", icon: <Plus size={20} />, path: "/IssueBookPage " },
    { name: "Delete Books ", icon: <Minus size={20} />, path: "/DeleteBook " },
    { name: "Delete Member ", icon: <Minus size={20} />, path: "/DeleteMember " },
  ];

  return (
    <div className="flex">
    <aside
      className={`h-screen bg-purple-900 text-white flex flex-col py-5 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4">
        {isSidebarOpen && <span className="text-xl font-bold">Library</span>}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-purple-800 rounded">
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
  
      {/* Sidebar Items */}
      <nav className="flex flex-col mt-6 space-y-2 px-3">
        {sidebarItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-purple-800 transition"
          >
            {item.icon}
            {isSidebarOpen && <span className="text-md font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  
    {/* Main Content */}
    
  </div>
  
  );
};

export default SideBar;

