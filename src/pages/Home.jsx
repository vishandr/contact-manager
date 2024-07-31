import { useGetContactsQuery } from '../services/contacts';

function Home() {
  const { data, error, isLoading } = useGetContactsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts</p>;

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {data.map((contact) => (
          <li key={contact.id}>
            <img src={contact.avatar} alt={`${contact.first_name} ${contact.last_name}`} />
            <p>{contact.first_name} {contact.last_name}</p>
            <p>{contact.email}</p>
            <p>{contact.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
