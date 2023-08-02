import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // true if token exists, false otherwise
};

function App() {

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      // if not authenticated redirect to login page
      return <Navigate to="/login" />;
    }
  
    return children
  };

  return (
    <div className="main">
      <Router>
        <Routes>

        <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

