import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PatientsPage from './pages/PatientsPage.jsx';
import IncidentsPage from './pages/IncidentsPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import PatientViewPage from './pages/PatientViewPage.jsx';
import Layout from './pages/Layout.jsx';

export default function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        
        {!currentUser && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

       
        {currentUser && (
          <>
            
            {currentUser.role === 'Admin' && (
              <>
                <Route path="/" element={<Layout><DashboardPage /></Layout>} />
                <Route path="/patients" element={<Layout><PatientsPage /></Layout>} />
                <Route path="/incidents" element={<Layout><IncidentsPage /></Layout>} />
                <Route path="/calendar" element={<Layout><CalendarPage /></Layout>} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}

            {currentUser.role === 'Patient' && (
              <>
                <Route path="/my" element={<Layout><PatientViewPage /></Layout>} />
                <Route path="*" element={<Navigate to="/my" />} />
              </>
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}
