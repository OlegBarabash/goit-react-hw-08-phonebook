import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchContacts } from 'redux/operations';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ThreeDots } from 'react-loader-spinner';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import toast, { Toaster } from 'react-hot-toast';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';

export default function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const errorNotify = () => {
    toast.error('Something went wrong!', {
      id: 'clipboard',
    });
  };

  return (
    <>
      <Helmet>
        <title>My contacts</title>
      </Helmet>
      <ContactForm />
      {!contacts.length && !isLoading ? (
        <h2>No contacts</h2>
      ) : (
        <>
          <h2>Contacts</h2>
          {isLoading ? (
            <ThreeDots
              height="72"
              width="72"
              radius="8"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            <>
              <Filter />
            </>
          )}
          {contacts.length > 0 && <ContactList />}
        </>
      )}
      {error && errorNotify()}
      <Toaster />
    </>
  );
}
