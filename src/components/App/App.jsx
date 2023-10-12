// import { ContactForm } from '../ContactForm/ContactForm';
// import { Filter } from '../Filter/Filter';
// import { ContactList } from '../ContactList/ContactList';
import { Container } from './App.styled.js';
import { useDispatch } from 'react-redux';
// import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
// import { fetchContacts } from 'redux/operations';
import { lazy, useEffect } from 'react';
// import { ThreeDots } from 'react-loader-spinner';
// import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from 'hooks';
import { refreshUser } from 'redux/auth/operations';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute';

const HomePage = lazy(() => import('../../pages/Home'));
const RegisterPage = lazy(() => import('../../pages/Register'));
const LoginPage = lazy(() => import('../../pages/Login'));
const ContactsPage = lazy(() => import('../../pages/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Container>
      {isRefreshing ? (
        <b>Refreshing user...</b>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/tasks"
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/tasks"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
          </Route>
        </Routes>
      )}
    </Container>
  );
};

// export const App = () => {
//   const dispatch = useDispatch();
//   const contacts = useSelector(selectContacts);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   const errorNotify = () => {
//     toast.error('Something went wrong!', {
//       id: 'clipboard',
//     });
//   };

//   return (
//     <Container>
//       <h1>Phonebook</h1>
//       <ContactForm />
//       {!contacts.length && !isLoading ? (
//         <h2>No contacts</h2>
//       ) : (
//         <>
//           <h2>Contacts</h2>
//           {isLoading ? (
//             <ThreeDots
//               height="72"
//               width="72"
//               radius="8"
//               color="#4fa94d"
//               ariaLabel="three-dots-loading"
//               wrapperStyle={{}}
//               wrapperClassName=""
//               visible={true}
//             />
//           ) : (
//             <>
//               <Filter />
//             </>
//           )}
//           {contacts.length > 0 && <ContactList />}
//         </>
//       )}
//       {error && errorNotify()}
//       <Toaster />
//     </Container>
//   );
// };
