import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from "../redux/contactsSlice"
import { Filter } from "components/Filter";
import { ContactItem } from "./Contact";
// import axios from 'axios';
import { listStyle, list } from "components/styles";

export const ContactList = () => {
  
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filter);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChange = async (contactId) => {
    try {
      // await axios.get(`https://64b3a5a00efb99d862683852.mockapi.io/contacts/${contactId}`);
      dispatch(deleteContact(contactId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={listStyle}>
      <h2>Contacts</h2>

      <Filter filter={filter} handleChange={handleChange} />

      {filteredContacts.length === 0 ? (
        <p>The contact list will be displayed here</p>
      ) : (
        <ul style={list}>
          {filteredContacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </div>
  );
};