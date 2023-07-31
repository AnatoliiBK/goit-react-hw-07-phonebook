import React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactsSlice';
import { formStyle, labelStyle, inputStyle, buttonStyle } from 'components/styles';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, number } = e.target.elements;

    const newContact = {
      name: name.value,
      number: number.value,
    };

    try {
      // const response = await axios.post('https://64b3a5a00efb99d862683852.mockapi.io/contacts', newContact);
      dispatch(addContact(newContact));
    } catch (error) {
      console.log(error);
    }

    name.value = '';
    number.value = '';
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
    <label style={labelStyle}>
      Name
      <input
        style={inputStyle}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' :][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash, space, or colon. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </label>

    <label style={labelStyle}>
      Number
      <input
        style={inputStyle}
        type="tel"
        name="number"
        // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
    </label>

    <button type="submit" style={buttonStyle}>
      Add contact
    </button>
  </form>
  );
};