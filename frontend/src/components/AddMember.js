

// import SideBar from './Authentication/SideBar';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import navigate
// import { toast } from "react-toastify"; // ✅ Import toast notifications
// import "react-toastify/dist/ReactToastify.css"; // ✅ Ensure styles are included
// import axios from "axios"; // ✅ Import axios for API requests
// import { Search } from "lucide-react";


// const AddMember = () => {
//     const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     reference_id: "",
//     reader_name: "",
//     reader_contact: "",
//     reader_address: "",
//     active: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/add-member/", formData);
//       toast.success("Member added successfully!");
//       navigate("/AddMember"); // Redirect to members list
//     } catch (error) {
//       console.error("Error adding member:", error);
//       toast.error("Failed to add member. Please try again.");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <SideBar />

//       <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <div className="relative flex items-center w-full max-w-md">
//             <Search size={20} className="absolute left-3 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search members"
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div className="flex items-center space-x-3">
//             <span className="text-gray-700 font-medium">SERGEY FILKOV</span>
//           </div>
//         </div>

//         <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//             <h2 className="text-3xl font-semibold text-center mb-6 text-purple-700">Add New Member</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 font-medium">Reference ID</label>
//                   <input
//                     type="text"
//                     name="reference_id"
//                     value={formData.reference_id}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//                     placeholder="Enter reference ID"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 font-medium">Member Name</label>
//                   <input
//                     type="text"
//                     name="reader_name"
//                     value={formData.reader_name}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//                     placeholder="Enter member name"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 font-medium">Contact</label>
//                   <input
//                     type="text"
//                     name="reader_contact"
//                     value={formData.reader_contact}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//                     placeholder="Enter contact number"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 font-medium">Address</label>
//                   <textarea
//                     name="reader_address"
//                     value={formData.reader_address}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//                     placeholder="Enter member address"
//                     rows="3"
//                     required
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <input
//                   type="checkbox"
//                   name="active"
//                   checked={formData.active}
//                   onChange={handleChange}
//                   className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                 />
//                 <label className="text-gray-700 font-medium">Active Member</label>
//               </div>
//               <div className="flex justify-center">
//                 <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition w-full max-w-xs">
//                   Add Member
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AddMember;



// import SideBar from './Authentication/SideBar';
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { Search } from "lucide-react";

// // Configure Toastify once in the app
// toast.configure();

// const AddMember = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     reference_id: "",
//     reader_name: "",
//     reader_contact: "",
//     reader_address: "",
//     active: true,
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/readers/";
//       const response = await axios.post(API_URL, newReader, {
//         headers: { "Content-Type": "application/json" },
//       });
  
//       if (response.status === 201 || response.status === 200) {
//         setReaders([...readers, response.data]); // Add new reader to the list
//         setNewReader({
//           reader_name: '',
//           reader_contact: '',
//           reference_id: '',
//           reader_address: '',
//         }); // Clear form
//         setSuccessMessage("Reader added successfully!");
//       } else {
//         throw new Error("Unexpected response");
//       }
//     } catch (error) {
//       console.error("Error adding reader:", error);
//       setError("Failed to add reader. Please try again.");
//     }
//   };
  

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <SideBar />

//       <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <div className="relative flex items-center w-full max-w-md">
//             <Search size={20} className="absolute left-3 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search members"
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               onChange={(e) => console.log("Searching for:", e.target.value)} // Placeholder for search functionality
//             />
//           </div>
//           <div className="flex items-center space-x-3">
//             <span className="text-gray-700 font-medium">SERGEY FILKOV</span>
//           </div>
//         </div>

//         <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//             <h2 className="text-3xl font-semibold text-center mb-6 text-purple-700">Add New Member</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 font-medium">Reference ID</label>
//                   <input
//                     type="text"
//                     name="reference_id"
//                     value={formData.reference_id}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//                     placeholder="Enter reference ID"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 font-medium">Member Name</label>
//                   <input
//                     type="text"
//                     name="reader_name"
//                     value={formData.reader_name}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//                     placeholder="Enter member name"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 font-medium">Contact</label>
//                   <input
//                     type="text"
//                     name="reader_contact"
//                     value={formData.reader_contact}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//                     placeholder="Enter contact number"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 font-medium">Address</label>
//                   <textarea
//                     name="reader_address"
//                     value={formData.reader_address}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
//                     placeholder="Enter member address"
//                     rows="3"
//                     required
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <input
//                   type="checkbox"
//                   name="active"
//                   checked={formData.active}
//                   onChange={handleChange}
//                   className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                 />
//                 <label className="text-gray-700 font-medium">Active Member</label>
//               </div>
//               <div className="flex justify-center">
//                 <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition w-full max-w-xs">
//                   Add Member
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AddMember;


import SideBar from "./Authentication/SideBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Search } from "lucide-react";


const AddMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reference_id: "",
    reader_name: "",
    reader_contact: "",
    reader_address: "",
    active: true,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/add-member/', formData, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       alert('user added successfully!');
//       setFormData({   reference_id:'', reader_name: '', reader_contact: '' , reader_address: '', active: true, });
//     } catch (error) {
//       console.error('Error adding book:', error);
//       alert('Failed to add book.');
//     }
//   };





const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure books_in_bag is included as an empty array if not provided
    const requestData = {
        ...formData,
        books_in_bag: formData.books_in_bag || [],  // ✅ Ensure empty list if undefined
    };

    console.log("Submitting Data:", requestData); // Debugging

    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/add-member/',
            requestData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        alert('User added successfully!');
        setFormData({
            reference_id: '',
            reader_name: '',
            reader_contact: '',
            reader_address: '',
            books_in_bag: [], // ✅ Keep empty array for consistency
            active: true,
        });

    } catch (error) {
        console.error('Error adding member:', error.response?.data || error.message);
        alert(`Failed to add member. ${error.response?.data?.books_in_bag?.[0] || "Check console for details."}`);
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
              placeholder="Search members"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => console.log("Searching for:", e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">SERGEY FILKOV</span>
          </div>
        </div>

        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-3xl font-semibold text-center mb-6 text-purple-700">
              Add New Member
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium">Reference ID</label>
                  <input
                    type="text"
                    name="reference_id"
                    value={formData.reference_id}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter reference ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Member Name</label>
                  <input
                    type="text"
                    name="reader_name"
                    value={formData.reader_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter member name"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium">Contact</label>
                  <input
                    type="text"
                    name="reader_contact"
                    value={formData.reader_contact}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Address</label>
                  <textarea
                    name="reader_address"
                    value={formData.reader_address}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter member address"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label className="text-gray-700 font-medium">Active Member</label>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition w-full max-w-xs"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddMember;
