/* eslint-disable react/prop-types */
import { useState } from 'react';
import EditIcon from '../assets/edit.svg'

const EditField = ({ value, onSave, placeholder, isAvatar = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    if (inputValue !== value) {
      onSave(inputValue);
    }
    setIsEditing(false);
  };

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={handleSave} className="ml-2 p-2 bg-blue-500 text-white rounded">Save</button>
          <button onClick={() => setIsEditing(false)} className="ml-2 p-1 bg-gray-500 text-white rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div className="relative flex items-center">
          {isAvatar ? (
            <img
              src={value}
              alt="Avatar"
              className="w-16 h-16 rounded-full cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <span>{value || placeholder}</span>
          )}
          <button
            className="absolute top-0 right-0 p-2 hover:bg-gray-400  text-neutral-100 rounded-full invisible group-hover:visible"
            // className="ml-2 p-1 bg-gray-50 text-black rounded"
            onClick={() => setIsEditing(true)}
          >
            <img src={EditIcon} alt="Edit" className="w-4 h-4 text-blue-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditField;
