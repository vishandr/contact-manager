/* eslint-disable react/prop-types */
import CircleXIcon from '../assets/circle-x.svg';
import { Link } from 'react-router-dom';
import { useDeleteContactMutation } from '../services/contacts';

const ContactCard = ({ contact, refetch }) => {
  const firstName = contact.fields['first name']?.[0]?.value || '';
  const lastName = contact.fields['last name']?.[0]?.value || '';
  const email = contact.fields.email?.[0]?.value || '';
  const avatarUrl = contact.avatar_url || '';
  const tags = contact.tags || [];
  const id = contact.id;

  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
      try {
        await deleteContact(id).unwrap();
        refetch();
        alert('Contact deleted successfully');
      } catch (err) {
        console.error('Failed to delete contact:', err);
        alert('Failed to delete contact');
      }
    }
  };

  return (
    <>
    <li className=" m-2 relative contact-card border border-gray-200 bg-gray-100 rounded-lg p-4 shadow-md flex flex-row items-start hover:bg-gray-200 hover:cursor-pointer">
    <div>
        <button
          className="absolute top-2 right-2 bg-gray-100 text-white p-1 rounded-full hover:bg-gray-200"
          onClick={handleDelete}
        >
          <img src={CircleXIcon} alt="Delete" className="w-6 h-6" />
        </button>
      </div>
    <Link to={`/contact/${id}`} className="flex items-center w-full">
      <div className='p-4'>
      <img
          src={avatarUrl}
          alt={`${firstName} ${lastName}`}
          className="w-16 h-16 rounded-full mb-2"
        />
      </div>
      <div>
        <h2 className="font-poppins text-base font-medium leading-6 text-left">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-600">{email}</p>
        <div className="flex flex-wrap mb-2">
         {tags.length === 0 
         ? ""
         : tags.map(tag => (
          <span key={tag.id} className="text-sm bg-blue-100 text-blue-800 mr-2 mb-2 px-2 py-1 rounded">
            {tag.tag}
          </span>
        ))}
        </div>
        
      </div>
      
      </Link>
    </li>    
    </>
  );
};

export default ContactCard;
