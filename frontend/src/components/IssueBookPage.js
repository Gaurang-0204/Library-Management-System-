import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Search, Book, List, Star, User } from "lucide-react";
import SideBar from './Authentication/SideBar';



const IssueBookPage = () => {
    const [users, setUsers] = useState([]);
      const [books, setBooks] = useState([]);
      const [selectedReader, setSelectedReader] = useState("");
      const [selectedBook, setSelectedBook] = useState("");
    
      const today = new Date().toISOString().split("T")[0];
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextWeekDate = nextWeek.toISOString().split("T")[0];
    
      const [issueDate, setIssueDate] = useState(today);
      const [dueDate, setDueDate] = useState(nextWeekDate);


      useEffect(() => {
          const fetchData = async () => {
            try {
              const readersResponse = await fetch("http://localhost:8000/api/readers/");
              const readersData = await readersResponse.json();
              setUsers(readersData);
      
              const booksResponse = await fetch("http://localhost:8000/api/books/");
              const booksData = await booksResponse.json();
              setBooks(booksData);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
          fetchData();
        }, []);



        const handleIssueBook = async (e) => {
            e.preventDefault();
        
            if (!selectedReader || !selectedReader.reference_id) {
              console.error("No reader selected!");
              return;
            }
          
            const issueData = {
              reference_id: selectedReader.reference_id,
              book: selectedBook,
              issue_date: issueDate,
              due_date: dueDate,
            };
          
            console.log("Sending issue book request:", issueData); // ✅ Debugging log
          
            try {
              const response = await fetch("http://127.0.0.1:8000/api/issue-book/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(issueData),
              });
          
              const responseData = await response.json(); // ✅ Debug response
              console.log("Response:", responseData);
          
              if (response.ok) {
                alert("Book issued successfully!");
                setSelectedReader("");
                setSelectedBook("");
                setIssueDate(today);
                setDueDate(nextWeekDate);
              } else {
                alert("Failed to issue book: " + responseData.error);
              }
            } catch (error) {
              alert("Error issuing book: " + error.message);
            }
          };




  return (
    <div>
        <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
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
            <h2 className="text-2xl font-semibold">Book issue </h2>
            <Link to='/IssuedBook'>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Issued Book List  </button>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-2/3">
              <h2 className="text-2xl text-purple-700 font-bold mb-6 text-center">Issue a Book</h2>
              <form onSubmit={handleIssueBook}>
              <input
  type="text"
  list="users"
  value={selectedReader?.reference_id || ""}
  onChange={(e) => {
    const selectedUser = users.find(user => user.reader_name === e.target.value);
    if (selectedUser) {
      setSelectedReader({ reference_id: selectedUser.reference_id, reader_name: selectedUser.reader_name });
    }
  }}
  className="w-full p-3 mb-3 border rounded"
  placeholder="Select or Type User"
/>
<datalist id="users">
  {users.map((user) => (
    <option key={user.reference_id} value={user.reader_name} />
  ))}
</datalist>
                <input
                  type="text"
                  list="books"
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="w-full p-3 mb-3 border rounded"
                  placeholder="Select or Type Book"
                />
                <datalist id="books">
                  {books.map((book) => (
                    <option key={book.id} value={book.title} />
                  ))}
                </datalist>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full p-3 mb-3 border rounded"
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-3 mb-3 border rounded"
                />
                <button type="submit" className="w-full bg-purple-700 text-white py-3 rounded hover:bg-purple-600">
                  Issue Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default IssueBookPage