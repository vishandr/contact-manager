import CreateContactForm from '../components/CreateContactForm';
import ContactList from '../components/ContactList';
import { useGetContactsQuery } from '../services/contacts';

function Home() {
  const { refetch } = useGetContactsQuery();

  const handleContactAdded = () => {
    refetch();
  };

  return (
      <div className="flex flex-col md:flex-row px-4 text-base md:text-sm">
        <div className="w-full md:w-1/4 md:sticky top-0 md:h-screen p-4">
          <CreateContactForm onContactAdded={handleContactAdded}/>
        </div>
        <div className="w-full md:w-2/3 p-4">
          <ContactList />
        </div>
      </div>
  );
}

export default Home;
