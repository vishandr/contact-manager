import { useGetContactsQuery } from '../services/contacts';
import Contact from '../components/ContactCard';

function Home() {
  const { data, error, isLoading } = useGetContactsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts: {error.message}</p>;

  // console.log(data);
  const contacts = data?.resources || [];

  if (contacts.length === 0) {
    return <div>No contacts available</div>;
  }


  return (
    <div>
      <h1 className="font-poppins">Contacts</h1>
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
    </div>
  );
}

export default Home;
