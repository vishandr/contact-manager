import { useGetContactsQuery } from '../services/contacts';

function Home() {
  const { data, error, isLoading } = useGetContactsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts: {error.message}</p>;

  // const contacts = data.resources;
  console.log(data);
  const contacts = data?.resources || [];

  if (contacts.length === 0) {
    return <div>No contacts available</div>;
  }


  return (
    <div>
      <h1>List of contacts</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <img src={contact.avatar_url} alt={`${contact.fields['first name'][0]?.value} ${contact.fields['last name'][0]?.value}`} />
            <p>{contact.fields['first name'][0]?.value} {contact.fields['last name'][0]?.value}</p>
            <p>{contact.fields.email[0]?.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
