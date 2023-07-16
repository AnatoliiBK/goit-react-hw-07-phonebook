import React, { useEffect } from 'react';

import { ContactForm } from './form/Form';
import { ContactList } from './contact/ContactList';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addContact } from './redux/contactsSlice';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(addContact(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ marginLeft: '80px', fontSize: '40px' }}>Phonebook</h1>

      <ContactForm />

      <ContactList />
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
};
