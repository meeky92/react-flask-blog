import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';


function App() {

  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);
  const flashMessage = (message, category) => {
    setMessage(message);
    setCategory(category);
}
  const now = new Date();
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now));

  const logUserIn = () => {
    setLoggedIn(true);
}

  const logUserOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    flashMessage('bai', 'info');
}

  return (
    <>
      <Navbar loggedIn={loggedIn} logUserOut={logUserOut} />
      <div className='container'>
        {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage}/> : null}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register flashMessage={flashMessage}/>} />
          <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/>} />
          <Route path='/create' element={<CreatePost flashMessage={flashMessage} loggedIn={loggedIn}/>} />
          <Route path='/edit' element={<EditPost flashMessage={flashMessage} loggedIn={loggedIn}/>} />
        </Routes>
      </div>
    </>
    )
}
export default App;