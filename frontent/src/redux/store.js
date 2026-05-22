// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './UserSlice';
// import messageReducer from './messageSlice';
// import socketReducer from './socketSlice';  
// import replyReducer from './replySlice';
// // import notificationReducer from './notificationSlice'; // <--- ADD THIS
// import storage from 'redux-persist/lib/storage'; 
// import { persistStore, persistReducer } from 'redux-persist';
// import { combineReducers } from 'redux';

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['socket'] // <--- ADDED 'notifications' HERE
// };

// const rootReducer = combineReducers({
//   user: userReducer,
//   message: messageReducer,
//   socket: socketReducer,
//   reply: replyReducer,
//   // notifications: notificationReducer // <--- ADD THIS
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, 
//     }),
// });

// export const persistor = persistStore(store);

// export default store;
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import messageReducer from './messageSlice';
import socketReducer from './socketSlice';
import replyReducer from './replySlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, createMigrate } from 'redux-persist'; // ■ Added createMigrate

// ■ NEW: Migration to clear corrupted/old state
const migrations = {
  0: (state) => {
    // If there's no state, return undefined (fresh start)
    return undefined;
  },
  1: (state) => {
    // Version 1 state structure is valid, return it
    return state;
  }
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['socket'],
  version: 1, // ■ NEW: Set current version to 1
  migrate: createMigrate(migrations, { debug: false }) // ■ NEW: Add migration
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer,
  reply: replyReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;