import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp ? "http://127.0.0.1:8000/api/signup/" : "http://127.0.0.1:8000/api/login/";
      const response = await axios.post(url, formData);
      alert(response.data.message);
      if (!isSignUp) navigate("/"); // Redirect to dashboard after login
    } catch (error) {
      alert("Error: " + error.response.data.detail);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-purple-900 text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center mb-6">To keep connected with us, please login with your personal info.</p>
          <button
            className="border-2 border-white px-6 py-2 rounded-full"
            onClick={() => setIsSignUp(false)}
          >
            SIGN IN
          </button>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-6">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          
          

          <p className="text-center mb-4"> Use your Email for registration:</p>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-2 mb-3 border rounded"
                onChange={handleInputChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border rounded"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-3 border rounded"
              onChange={handleInputChange}
            />

            <button className="w-full bg-purple-900 text-white py-2 rounded" type="submit">
              {isSignUp ? "SIGN UP" : "LOGIN"}
            </button>
          </form>

          <p className="text-center mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button className="text-purple-900 font-bold ml-1" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
