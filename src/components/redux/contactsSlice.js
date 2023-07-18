import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async () => {
//     const response = await axios.get('https://64b3a5a00efb99d862683852.mockapi.io/contacts');
//     return response.data;
//   }
// );

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, { getState }) => {
//     const state = getState();
//     if (state.contacts.items.length > 0) {
//       // Clear the existing contacts before fetching new data
//       state.contacts.items = [];
//     }

//     const response = await axios.get('https://64b3a5a00efb99d862683852.mockapi.io/contacts');
//     return response.data;
//   }
// );

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { getState, dispatch }) => {
    const state = getState();
    if (state.contacts.items.length > 0) {
      // Clear the existing contacts before fetching new data
      state.contacts.items = [];
    }

    const response = await axios.get('https://64b3a5a00efb99d862683852.mockapi.io/contacts');
    const fetchedContacts = response.data;

    // Check for duplicates and remove them
    const uniqueContacts = fetchedContacts.reduce((acc, contact) => {
      const existingContact = acc.find((c) => c.number === contact.number);
      if (!existingContact) {
        acc.push(contact);
      }
      return acc;
    }, []);

    // Update the contacts list in Redux store
    dispatch(fetchContacts.fulfilled(uniqueContacts));

    return uniqueContacts;
  }
);



// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (newContact, { getState, rejectWithValue }) => {
//     const { contacts } = getState();
//     const existingContact = contacts.items.find(
//       (contact) => contact.number === newContact.number
//     );
//     if (existingContact) {
//       alert(`Contact with phone number ${newContact.number} already exists.`);
//       return rejectWithValue('Contact already exists');
//     }

//     try {
//       const response = await axios.post('https://64b3a5a00efb99d862683852.mockapi.io/contacts', newContact);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Failed to add contact.');
//     }
//   }
// );

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { getState }) => {
    const state = getState();
    const existingContact = state.contacts.items.find(
      (contact) => contact.number === newContact.number
    );
    if (existingContact) {
      alert(`Contact with phone number ${newContact.number} already exists.`);
      throw new Error(`Contact with phone number ${newContact.number} already exists.`);
    }

    const response = await axios.post('https://64b3a5a00efb99d862683852.mockapi.io/contacts', newContact);
    return response.data;
    
    // await axios.post('https://64b3a5a00efb99d862683852.mockapi.io/contacts', newContact);

    // const updatedResponse = await axios.get('https://64b3a5a00efb99d862683852.mockapi.io/contacts');
    // return updatedResponse.data;
  }
);



// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (newContact, { getState, rejectWithValue }) => {
//     const { contacts } = getState();
//     const existingContact = contacts.items.find(
//       (contact) => contact.number === newContact.number
//     );
//     if (existingContact) {
//       return rejectWithValue(`Contact with phone number ${newContact.number} already exists.`);
//     }

//     try {
//       const response = await axios.post('https://64b3a5a00efb99d862683852.mockapi.io/contacts', newContact);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Failed to add contact.');
//     }
//   }
// );


// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (newContact, { getState }) => {
//     const state = getState();
//     const existingContact = state.contacts.items.find(
//       (contact) => contact.number === newContact.number
//     );
//     if (existingContact) {
//       throw new Error(`Contact with phone number ${newContact.number} already exists.`);
//     }

//     const response = await axios.post('https://64b3a5a00efb99d862683852.mockapi.io/contacts', newContact);
//     return response.data;
//   }
// );
// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (newContact) => {
//     const response = await axios.post('https://64b3a5a00efb99d862683852.mockapi.io/contacts', newContact);
//     return response.data;
//   }
// );

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId) => {
    await axios.delete(`https://64b3a5a00efb99d862683852.mockapi.io/contacts/${contactId}`);
    return contactId;
  }
);

const initialState = Object.freeze({
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: ""
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
        // state.contacts.items = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      });
  },
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;




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
