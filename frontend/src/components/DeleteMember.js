import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";
import SideBar from "./Authentication/SideBar";

const DeleteMember = () => {
  const [readers, setReaders] = useState([]);
  const [filteredReaders, setFilteredReaders] = useState([]);
  const [selectedReaders, setSelectedReaders] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReaders();
  }, []);

  const fetchReaders = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/readers/");
      setReaders(response.data || []);
      setFilteredReaders(response.data || []);
    } catch (error) {
      console.error("Error fetching readers:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredReaders(
      readers.filter(
        (reader) =>
          (reader.name && reader.name.toLowerCase().includes(term)) ||
          (reader.email && reader.email.toLowerCase().includes(term))
      )
    );
  };

  const handleSelectReader = (id) => {
    setSelectedReaders((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleDeleteReaders = async () => {
    if (selectedReaders.size === 0) return;
  
    try {
      const response = await axios.delete("http://127.0.0.1:8000/api/members/", {
        headers: { "Content-Type": "application/json" },
        data: { reader_ids: Array.from(selectedReaders) }, // ✅ Correct Data Format
      });
  
      console.log(response.data.message);
  
      // Update UI after successful deletion
      const updatedReaders = readers.filter((reader) => !selectedReaders.has(reader.id));
      setReaders(updatedReaders);
      setFilteredReaders(updatedReaders);
      setSelectedReaders(new Set());
    } catch (error) {
      console.error("Error deleting readers:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar className="w-64 bg-purple-800 min-h-screen" />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex items-center">
            <Search size={20} className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search readers"
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            <Link to="/addmember">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Add New Reader
              </button>
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteReaders}
              disabled={selectedReaders.size === 0}
            >
              Delete Selected
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-5 font-semibold p-2 border-b">
            <span>Select</span>
            <span>ID</span>
            <span>Name</span>
            <span>Email</span>
           
          </div>
          {filteredReaders.length > 0 ? (
            filteredReaders.map((reader) => (
              <div
                key={reader.id}
                className="my-2 bg-gray-50 p-2 rounded shadow-sm grid grid-cols-5 items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedReaders.has(reader.id)}
                  onChange={() => handleSelectReader(reader.id)}
                  className="h-5 w-5 text-purple-600"
                />
                <span>{reader.id}</span>
                <span>{reader.reader_name}</span>
                <span>{reader.reader_contact}</span>
                
              </div>
            ))
          ) : (
            <p className="text-center py-4">No readers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteMember;
