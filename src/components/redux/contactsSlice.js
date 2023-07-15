import { createSlice } from '@reduxjs/toolkit';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const initialState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    
    addContact: (state, action) => {
      const { id, name, number } = action.payload;

      if (!name || !number) {
        return;
      }  

    const phoneNumber = parsePhoneNumberFromString(number, 'UA');
      const formattedNumber = phoneNumber.formatInternational();

      const duplicateContact = state.contacts.find(
        (contact) => contact.number === formattedNumber
      );
      if (duplicateContact) {
        alert(`Контакт з номером телефону ${formattedNumber} вже є в списку`);
        return;
      }
      state.contacts.push({ id, name, number: formattedNumber });
    },

    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
