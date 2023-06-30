import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';
import { toast } from 'react-hot-toast';

const initialState = {
  items: [],
  isLoading: false,
  isAdding: false,
  isDeleting: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(`Something went wrong. Error message: ${state.error}`);
    },

    [addContact.pending](state) {
      state.isAdding = true;
    },
    [addContact.fulfilled](state, action) {
      state.isAdding = false;
      state.error = null;
      state.items.push(action.payload);
      toast.success('Contact successfully added!');
    },
    [addContact.rejected](state, action) {
      state.isAdding = false;
      state.error = action.payload;
      toast.error(`Something went wrong. Error message: ${state.error}`);
    },

    [deleteContact.pending](state) {
      state.isDeleting = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isDeleting = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
      toast.success('Contact successfully deleted!');
    },
    [deleteContact.rejected](state, action) {
      state.isDeleting = false;
      state.error = action.payload;
      toast.error(`Something went wrong. Error message: ${state.error}`);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;