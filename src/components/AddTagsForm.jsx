import { useState } from 'react';
import { useAssignTagsMutation } from '../services/contacts';

// eslint-disable-next-line react/prop-types
const AddTagsForm = ({ contactId, onTagsAdded }) => {
  const [tags, setTags] = useState('');
  const [assignTags, { isLoading, isError }] = useAssignTagsMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tagsArray = tags.split(',').map(tag => tag.trim());

    try {
      await assignTags({ id: contactId, tags: tagsArray }).unwrap();
      onTagsAdded(); // Вызов функции для обновления списка тегов
      setTags('');
      alert('Tags added successfully!');
    } catch (err) {
      console.error('Failed to add tags:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Enter tags, separated by commas"
        disabled={isLoading}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
      <button type="submit" 
        className="w-full mt-2 py-2 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-100" 
        disabled={isLoading}>
        Add Tags
      </button>
      {isError && <p className="text-red-500 mt-2">Failed to add tags</p>}
    </form>
  );
};

export default AddTagsForm;
