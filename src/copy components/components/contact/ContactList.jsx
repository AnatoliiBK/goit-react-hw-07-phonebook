import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'components/redux/contactsSlice';
import { ContactItem } from "./Contact";
import { Filter } from "components/Filter";
import { listStyle, list } from "components/styles";

export const ContactList = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // const filteredContacts = contacts.filter((contact) =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );
  const filteredContacts = contacts.filter((contact) =>
  contact && contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
);


  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
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
