import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetContactByIdQuery, useAddTagsMutation } from '../services/contacts';

const ContactPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetContactByIdQuery(id);
  const [tags, setTags] = useState('');
  const [addTags] = useAddTagsMutation();
  const contact = data?.resources?.[0] || [];
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error loading contact</div>;
  }
  
  const firstName = contact.fields?.['first name']?.[0]?.value || '';
  const lastName = contact.fields?.['last name']?.[0]?.value || '';
  const email = contact.fields?.email?.[0]?.value || '';
  const avatar_url = contact.avatar_url || '';
  const usertags = contact.tags || [];

  const handleAddTags = async () => {
    if (tags) {
      await addTags({ id, tags: tags.split(',').map(tag => tag.trim()) });
      setTags('');
    }
  };

  return (
    <div className="flex justify-center items-start pt-10 h-screen">
      <div className="w-1/2 p-4 bg-white shadow-md rounded-lg">
        <div className="flex items-center">
          <img src={avatar_url} alt="avatar" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <div className="font-poppins text-lg font-medium">
              {firstName} {lastName}
            </div>
            <div>{email}</div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-poppins text-md font-medium">Tags</h3>
          <div className="flex flex-wrap">
            {usertags.map(tag => (
              <span key={tag.id} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
                {typeof tag === 'string' ? tag : tag.tag}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <label htmlFor="newTag" className="block text-gray-700">Add New Tag</label>
            <input
              type="text"
              id="newTag"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
            <button
              onClick={handleAddTags}
              className="w-full mt-2 py-2 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-100"
            >
              Add New Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
