import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {  
    contacts: {
      items: [],
      isLoading: false,
      error: null
    },
    filter: "" 
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    fetchContactsStart: (state) => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    fetchContactsSuccess: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items = action.payload;
    },
    fetchContactsFailure: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    addContactStart: (state) => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    addContactSuccess: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items.push(action.payload);
    },
    addContactFailure: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    deleteContactStart: (state) => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    deleteContactSuccess: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    deleteContactFailure: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsFailure,
  addContactStart,
  addContactSuccess,
  addContactFailure,
  deleteContactStart,
  deleteContactSuccess,
  deleteContactFailure,
  setFilter,
} = contactsSlice.actions;

export default contactsSlice.reducer;

export const fetchContacts = () => {
  return async (dispatch) => {
    dispatch(fetchContactsStart());
    try {
      const response = await axios.get('https://api.mockapi.io/contacts');
      dispatch(fetchContactsSuccess(response.data));
    } catch (error) {
      dispatch(fetchContactsFailure(error.message));
    }
  };
};

export const addContact = (newContact) => {
  return async (dispatch) => {
    dispatch(addContactStart());
    try {
      const response = await axios.post('https://api.mockapi.io/contacts', newContact);
      dispatch(addContactSuccess(response.data));
    } catch (error) {
      dispatch(addContactFailure(error.message));
    }
  };
};

export const deleteContact = (contactId) => {
  return async (dispatch) => {
    dispatch(deleteContactStart());
    try {
      await axios.delete(`https://api.mockapi.io/contacts/${contactId}`);
      dispatch(deleteContactSuccess(contactId));
    } catch (error) {
      dispatch(deleteContactFailure(error.message));
    }
  };
};




// import { createSlice } from '@reduxjs/toolkit';
// // import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const initialState = {
//   contacts: [],
//   filter: '',
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {
    
//     addContact: (state, action) => {
//       const { id, name, number } = action.payload;

//       if (!name || !number) {
//         return;
//       }  

//     // const phoneNumber = parsePhoneNumberFromString(number, 'UA');
//     //   const formattedNumber = phoneNumber.formatInternational();

//     //   const duplicateContact = state.contacts.find(
//     //     (contact) => contact.number === formattedNumber
//     //   );
//     //   if (duplicateContact) {
//     //     alert(`Контакт з номером телефону ${formattedNumber} вже є в списку`);
//     //     return;
//     //   }
//       state.contacts.push({ id, name });
//     },

//     deleteContact: (state, action) => {
//       state.contacts = state.contacts.filter(
//         (contact) => contact.id !== action.payload
//       );
//     },

//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
// });

// export const { addContact, deleteContact, setFilter } = contactsSlice.actions;

// export default contactsSlice.reducer;
