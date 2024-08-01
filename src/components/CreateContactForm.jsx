// import React from 'react';

const CreateContactForm = () => {
  const addContactHandler = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };
  
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="font-poppins text-xl font-medium mb-4">Create Contact</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={addContactHandler}
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default CreateContactForm;
