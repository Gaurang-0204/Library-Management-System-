import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Mybag from './components/Mybag';
import Readers from './components/Readers';
import Returns from './components/Returns';
import Navbar from './components/Navbar';
import Login from './components/Authentication/Login';
import SideBar from './components/Authentication/SideBar';
import AddBook from './components/AddBook';
import AddMember from './components/AddMember';
import IssuedBooks from './components/IssuedBook';
import IssueBookPage from './components/IssueBookPage';
import UserDetails from './components/UserDetails';
import DeleteBook from './components/DeleteBook';
import DeleteMember from './components/DeleteMember';

function App() {
  return (
    <div className='App'>
    
    <Routes>
      <Route path='/Home' element={<Home/>}/> 
      <Route path='/Books' element={<Books/>}/> 
      <Route path='/Mybag' element={<Mybag/>}/> 
      <Route path='/Readers' element={<Readers/>}/> 
      <Route path='/Returns' element={<Returns/>}/> 
      <Route path='/' element={<Login/>}/>
      <Route path='/AddBook' element={<AddBook/>}/>
      <Route path='/AddMember' element={<AddMember/>}/>
      <Route path='/IssuedBook' element={<IssuedBooks/>}/>
      <Route path='/IssueBookPage' element={<IssueBookPage/>}/>
      <Route path='/UserDetail' element={<UserDetails/>}/>
      <Route path='/DeleteBook' element={<DeleteBook/>}/>
      <Route path='/DeleteMember' element={<DeleteMember/>}/>
    </Routes>
    </div>
  );
}

export default App;
