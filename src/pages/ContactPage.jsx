import { useParams } from 'react-router-dom';
import { useGetContactByIdQuery, useUpdateContactMutation } from '../services/contacts';
import EditField from '../components/EditField';
import AddTagsForm from '../components/AddTagsForm';

const ContactPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetContactByIdQuery(id);
  const [updateContact] = useUpdateContactMutation();
  const contact = data?.resources?.[0] || [];
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error loading contact</div>;
  }
  
  const handleUpdateField = async (fieldName, newValue) => {
    try {
      // Собираем обновленные поля, сохраняя старые значения
      const updatedFields = {
        ...contact.fields, 
        [fieldName]: [{ label: fieldName, value: newValue }]
      };


      const updatedContact = {
        avatar_url: contact.avatar_url,
        fields: updatedFields,
        is_important: contact.is_important,
      };

      console.log('Updating contact with:', updatedContact); // Логирование данных перед отправкой

      await updateContact({ id, ...updatedContact }).unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to update field:', err);
    }
  };

  const firstName = contact.fields?.['first name']?.[0]?.value || '';
  const lastName = contact.fields?.['last name']?.[0]?.value || '';
  const email = contact.fields?.email?.[0]?.value || '';
  const avatar_url = contact.avatar_url || '';
  const usertags = contact.tags?.map(tag => tag.tag) || [];

  const handleTagsAdded = () => {
    refetch();
  };

  return (
    <div className="flex justify-center items-start pt-10 h-screen">
      <div className="w-1/2 p-4 bg-white shadow-md rounded-lg">
        <div className="flex items-center">
          <img src={avatar_url} alt="avatar" className="w-16 h-16 rounded-full mr-4" />
          <div>
            {/* <div className="font-poppins text-lg font-medium">
              {firstName} {lastName}
            </div>
            <div>{email}</div> */}
            <EditField value={firstName} onSave={(newValue) => handleUpdateField('first name', newValue)} />
            <EditField value={lastName} onSave={(newValue) => handleUpdateField('last name', newValue)} />
            <EditField value={email} onSave={(newValue) => handleUpdateField('email', newValue)} />
          </div>
        </div>
        <div className="mt-4">
        <h3 className="font-poppins text-md font-medium">Tags</h3>
          <div className="flex flex-wrap">
            {usertags.length > 0 ? (
              usertags.map(tag => (
                <span key={tag.id || tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
                  {typeof tag === 'string' ? tag : tag.tag}
                </span>
              ))
            ) : ''}
          </div>
          <div className="mt-4">
            <AddTagsForm contactId={id} existingTags={usertags} 
            onTagsAdded={handleTagsAdded} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
