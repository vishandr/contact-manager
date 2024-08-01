import { useGetContactsQuery } from '../features/contacts/contactsSlice';
import ContactCard from './ContactCard';

const ContactList = () => {
  const { data, error, isLoading } = useGetContactsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading contacts: {error.message}</div>;
  }

  const contacts = data?.resources || [];
  console.log(contacts);

  if (contacts.length === 0) {
    return <div>No contacts available</div>;
  }

  return (
    <>
      <h1 className="font-poppins">Contacts</h1>
      <ul>
        {contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </ul>
    </>
  );
};

export default ContactList;
