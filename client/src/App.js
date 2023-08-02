// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';

// function App() {
//   return (
//     <div className="main">
//       <Router>
//         <Routes>
//           <Route path='/' element={<Home />}/>
//           <Route path='/login' element={<Login />}/>
//           <Route path='/register' element={<Register />}/>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate()

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if token exists, false otherwise
};

function App() {
  // Custom function to render the Home page or redirect to login if unauthenticated
  const renderHomeOrRedirect = () => {
    // return isAuthenticated() ? console.log(<Home />) : console.log(<Navigate to="/login" replace state={{ message: 'Please login to access this page.' }} />);;
    return isAuthenticated() ? <Home /> : <Navigate to="/login" replace state={{ message: 'Please login to access this page.' }} />;
  };

  return (
    <div className="main">
      <Router>
        <Routes>
          {/* Public route accessible to unauthenticated users */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route accessible only to authenticated users */}
          <Route path="/" element={renderHomeOrRedirect()} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

