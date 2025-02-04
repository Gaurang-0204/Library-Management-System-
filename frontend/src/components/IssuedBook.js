// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const IssuedBooks = () => {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchIssuedBooks();
//   }, []);

//   const fetchIssuedBooks = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/issued-books/");
//       setIssuedBooks(response.data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching issued books:", error);
//       setError("Failed to fetch issued books. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const returnBook = async (id, dueDate) => {
//     const today = new Date().toISOString().split("T")[0];
//     let fine = 0;

//     if (today > dueDate) {
//       const diffTime = Math.abs(new Date(today) - new Date(dueDate));
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       fine = diffDays * 5; // Assuming $5 per day as fine
//     }

//     try {
//       await axios.post(`http://127.0.0.1:8000/api/return-book/${id}/`, { fine });
//       fetchIssuedBooks();
//     } catch (error) {
//       console.error("Error returning book:", error);
//       setError("Failed to return book. Please try again later.");
//     }
//   };

//   if (loading) return <p>Loading issued books...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Issued Books</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {issuedBooks.map((book) => (
//           <Card key={book.id} className="p-4 shadow-md rounded-lg">
//             <CardContent>
//               <p className="font-semibold">Book: {book.book_title}</p>
//               <p>Issued To: {book.reader_name}</p>
//               <p>Issue Date: {book.issue_date}</p>
//               <p>Due Date: {book.due_date}</p>
//               {book.returned ? (
//                 <p className="text-green-600 font-bold">Returned</p>
//               ) : (
//                 <Button
//                   onClick={() => returnBook(book.id, book.due_date)}
//                   className="mt-2 bg-red-500 text-white hover:bg-red-700"
//                 >
//                   Return Book
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IssuedBooks;


// import { useState, useEffect } from "react";
// import axios from "axios";

// const IssuedBooks = () => {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchIssuedBooks();
//   }, []);

//   const fetchIssuedBooks = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/issued-books/");
//       setIssuedBooks(response.data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching issued books:", error);
//       setError("Failed to fetch issued books. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const returnBook = async (id, dueDate) => {
//     const today = new Date().toISOString().split("T")[0];
//     let fine = 0;

//     if (today > dueDate) {
//       const diffTime = Math.abs(new Date(today) - new Date(dueDate));
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       fine = diffDays * 5; // Assuming $5 per day as fine
//     }

//     try {
//       await axios.post(`http://127.0.0.1:8000/api/return-book/${id}/`, { fine });
//       fetchIssuedBooks();
//     } catch (error) {
//       console.error("Error returning book:", error);
//       setError("Failed to return book. Please try again later.");
//     }
//   };

//   if (loading) return <p>Loading issued books...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Issued Books</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {issuedBooks.map((book) => (
//           <div key={book.id} className="p-4 shadow-md rounded-lg border border-gray-300">
//             <div>
//               <p className="font-semibold">Book: {book.book_title}</p>
//               <p>Issued To: {book.reader_name}</p>
//               <p>Issue Date: {book.issue_date}</p>
//               <p>Due Date: {book.due_date}</p>
//               {book.returned ? (
//                 <p className="text-green-600 font-bold">Returned</p>
//               ) : (
//                 <button
//                   onClick={() => returnBook(book.id, book.due_date)}
//                   className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//                 >
//                   Return Book
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IssuedBooks;



import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Search, Book, List, Star, User } from "lucide-react";
import SideBar from "./Authentication/SideBar";
const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/issued-books/");
      // Filter out returned books from display
      const filteredBooks = response.data.filter((book) => !book.returned);
      setIssuedBooks(filteredBooks);
      setError(null);
    } catch (error) {
      console.error("Error fetching issued books:", error);
      setError("Failed to fetch issued books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const returnBook = async (id, dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    let fine = 0;

    if (today > dueDate) {
      const diffTime = Math.abs(new Date(today) - new Date(dueDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      fine = diffDays * 5; // Assuming $5 per day as fine
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/return-book/${id}/`, { fine });

      // Update the UI without re-fetching
      setIssuedBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error returning book:", error);
      setError("Failed to return book. Please try again later.");
    }
  };

  if (loading) return <p>Loading issued books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-4">Issued Books</h1>
    //   {issuedBooks.length === 0 ? (
    //     <p className="text-gray-500">No issued books available.</p>
    //   ) : (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {issuedBooks.map((book) => (
    //         <div key={book.id} className="p-4 shadow-md rounded-lg border border-gray-300">
    //           <div>
    //             <p className="font-semibold">Book: {book.book_title}</p>
    //             <p>Issued To: {book.reader_name}</p>
    //             <p>Issue Date: {book.issue_date}</p>
    //             <p>Due Date: {book.due_date}</p>
    //             <button
    //               onClick={() => returnBook(book.id, book.due_date)}
    //               className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
    //             >
    //               Return Book
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>



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
        <h2 className="text-2xl font-semibold">Book Issue</h2>
        <Link to="/IssuedBook">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Issued Book List
          </button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-5 font-semibold p-2 border-b">
          <span>Book</span>
          <span>Issued To </span>
          <span>Due Date</span>
          <span>return</span>
          
        </div>
        {issuedBooks.length === 0 ? (
          <div className="my-2 bg-gray-50 p-2 rounded shadow-sm grid grid-cols-5 items-center">
            <span className="col-span-5 text-center">No issued books available</span>
          </div>
        ) : (
          issuedBooks.map((book) => (
            <div
              key={book.id}
              className="my-2 bg-gray-50 p-2 rounded shadow-sm grid grid-cols-5 items-center"
            >
              <span>{book.book_title}</span>
              <span className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center text-white mr-2"></div>
                {book.reader_name}
              </span>
              <span>{book.issue_date}</span>
              <span>{book.due_date}</span>
              <span
               
              >
                <button
                  onClick={() => returnBook(book.id, book.due_date)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Return Book
                  </button>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  </main>
</div>
  );
};

export default IssuedBooks;
