import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
const hardcodedUsers = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Patient", email: "likhi@entnt.in", password: "likhi1246", patientId: "p1", name: "Likhitha Varma"}
];
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) setCurrentUser(savedUser);
  }, []);
  const login = (email, password) => {
    const user = hardcodedUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
