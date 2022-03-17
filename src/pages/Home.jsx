import UserSearch from '../components/users/UserSearch';
import UserResults from '../components/users/UserResults';

function Home() {
  return (
    <>
      <h2 className='mb-4 text-4xl font-light'>
        Who would you like to search for?
      </h2>
      <UserSearch />
      <UserResults />
    </>
  );
}

export default Home;
