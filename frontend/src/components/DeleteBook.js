import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react"; // Import Search icon
import SideBar from "./Authentication/SideBar";

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/books/");
      setBooks(response.data || []);
      setFilteredBooks(response.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredBooks(
      books.filter(
        (book) =>
          (book.title && book.title.toLowerCase().includes(term)) ||
          (book.author && book.author.toLowerCase().includes(term)) ||
          (book.isbn && book.isbn.toLowerCase().includes(term))
      )
    );
  };

  const handleSelectBook = (isbn) => {
    setSelectedBooks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(isbn)) {
        newSelected.delete(isbn); // Deselect
      } else {
        newSelected.add(isbn); // Select
      }
      return newSelected;
    });
  };

  const handleDeleteBooks = async () => {
    if (selectedBooks.size === 0) return;

    try {
      const response = await axios.delete("http://127.0.0.1:8000/api/delete/", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ book_isbns: Array.from(selectedBooks) }), // ✅ Ensure JSON format
      });

      console.log(response.data.message);

      const updatedBooks = books.filter((book) => !selectedBooks.has(book.isbn));
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      setSelectedBooks(new Set());
    } catch (error) {
      console.error("Error deleting books:", error.response?.data || error.message);
    }
};

  
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar className="w-64 bg-purple-800 min-h-screen" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex items-center">
            <Search size={20} className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search catalog"
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">SERGEY FILKOV</span>
          </div>
        </div>

        {/* Books List Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Books</h2>
          <div>
            <Link to="/AddBook">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Add New Book
              </button>
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteBooks}
              disabled={selectedBooks.size === 0}
            >
              Delete Selected
            </button>
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-7 font-semibold p-2 border-b">
            <span>Select</span>
            <span>ISBN</span>
            <span>Title</span>
            <span>Author</span>
            <span>Genre</span>
            <span>Publish Date</span>
            <span>Status</span>
          </div>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.isbn}
                className="my-2 bg-gray-50 p-2 rounded shadow-sm grid grid-cols-7 items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedBooks.has(book.isbn)}
                  onChange={() => handleSelectBook(book.isbn)}
                  className="h-5 w-5 text-purple-600"
                  id={`checkbox-${book.isbn}`}
                />
                <span>{book.isbn || "N/A"}</span>
                <span>{book.title || "No Title"}</span>
                <span>{book.author || "Unknown"}</span>
                <span>{book.genre || "N/A"}</span>
                <span>{book.published_date || "N/A"}</span>
                <span
                  className={`px-3 py-1 text-white rounded ${
                    book.issued ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {book.issued ? "Issued" : "Not Issued"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center py-4">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
