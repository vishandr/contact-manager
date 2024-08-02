import { useState } from 'react';
import { useCreateContactMutation } from '../services/contacts';

// eslint-disable-next-line react/prop-types
const CreateContactForm = ({ onContactAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [addContact, { isLoading, isError }] = useCreateContactMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newContact = {
      type: 'person',
      fields: {
        'first name': [{ label: 'first name', value: firstName }],
        'last name': [{ label: 'last name', value: lastName }],
        email: [{ label: 'email', value: email }],
      },
    };
    try {
      await addContact(newContact).unwrap();
      onContactAdded(); // Call the function to refresh the contact list
      setFirstName('');
      setLastName('');
      setEmail('');
      // alert('Contact added successfully!');
    } catch (err) {
      console.error('Failed to add contact:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="font-poppins text-xl font-medium mb-4">Create Contact</h2>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full border border-gray-500 text-gray-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-100"
              disabled={isLoading}
            >
            {isLoading ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        {isError && <p className="text-red-500 text-xs italic mt-2">Failed to add contact. Please try again.</p>}
      </div>
    </form>
  );
};

export default CreateContactForm;
