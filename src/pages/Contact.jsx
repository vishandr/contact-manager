import React from 'react';
import { useParams } from 'react-router-dom';

function Contact() {
  const { id } = useParams();
  return (
    <div>
      <h2>Contact Page</h2>
      <p>Viewing contact with ID: {id}</p>
    </div>
  );
}

export default Contact;
