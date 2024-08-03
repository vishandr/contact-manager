import { useState } from 'react';
import { useAssignTagsMutation } from '../services/contacts';

// eslint-disable-next-line react/prop-types
const AddTagsForm = ({ contactId, existingTags, onTagsAdded }) => {
  const [tags, setTags] = useState('');
  const [assignTags, { isLoading, isError }] = useAssignTagsMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Используем регулярное выражение для разделения по запятой или пробелу
    const newTags = tags.split(/[\s,]+/).filter(tag => tag.trim() !== '');
    const allTags = Array.from(new Set([...existingTags, ...newTags])); // Объединяем и удаляем дубли
    console.log('existingTags: ', existingTags);

    try {
      await assignTags({ id: contactId, tags: allTags }).unwrap();
      onTagsAdded(); // Вызов функции для обновления списка тегов
      setTags('');
      // alert('Tags added successfully!');
    } catch (err) {
      console.error('Failed to add tags:', err);
    }
  };

  const handleRemoveAllTags = async () => {
    try {
      await assignTags({ id: contactId, tags: [] }).unwrap();
      onTagsAdded(); // Вызов функции для обновления списка тегов
      // alert('All tags removed successfully!');
    } catch (err) {
      console.error('Failed to remove tags:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Enter tags, separated by commas or spaces"
        disabled={isLoading}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
      <button type="submit" 
        className="w-full mt-2 py-2 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-100" 
        disabled={isLoading}>
        Add Tags
      </button>
      <button type="button" className="w-full mt-2 py-2 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-100" 
        onClick={handleRemoveAllTags} disabled={isLoading}>
        Remove All Tags
      </button>
      {isError && <p className="text-red-500 mt-2">Failed to add tags</p>}
    </form>
  );
};

export default AddTagsForm;
