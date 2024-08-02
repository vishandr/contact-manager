// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
// import NewContact from './pages/NewContact';


function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact/:id" element={<ContactPage />} />
        {/* <Route path="/new-contact" element={<NewContact />} /> */}
      </Routes>
    </div>
  );
}

export default App;
