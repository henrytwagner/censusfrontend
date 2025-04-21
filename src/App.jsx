import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import OrgHome from './pages/OrgHome';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Empty from './components/Empty';
import ProtectedRoute from './components/ProtectedRoute';
import Organization from './pages/Organization';
import Contacts from './pages/Contacts';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route
          path="login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="organization/:orgId/home"
            element={
              <ProtectedRoute>
                <OrgHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="organization/:id"
            element={
              <ProtectedRoute>
                <Organization />
              </ProtectedRoute>
            }
          />

          <Route path="empty" element={<Empty />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
