import CreateContactForm from '../components/CreateContactForm';
import ContactList from '../components/ContactList';

function Home() {
  return (
      <div className="flex">
        <div className="w-1/3 sticky top-0 h-screen p-4">
          <CreateContactForm />
        </div>
        <div className="w-2/3 p-4">
          <ContactList />
        </div>
      </div>
  );
}

export default Home;
