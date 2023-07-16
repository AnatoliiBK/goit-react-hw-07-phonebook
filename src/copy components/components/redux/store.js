import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from "./contactsSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Вимкнення перевірки серіалізованості для дій
    }),
});

const persistor = persistStore(store);

export { store, persistor };
