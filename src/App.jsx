import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NewContact from './pages/NewContact';

function App() {
  return (
    <div className="container mx-auto">
      <h1>Contact Manager</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact/:id" element={<Contact />} />
        <Route path="/new-contact" element={<NewContact />} />
      </Routes>
    </div>
  );
}

export default App;
