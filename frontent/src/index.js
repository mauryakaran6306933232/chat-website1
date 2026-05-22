import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux'; // Added useDispatch
import store, { persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { setSelectedUser } from './redux/UserSlice'; // Import the action

// Create a small component to clear ghost state on refresh
const ClearGhostState = ({ children }) => {
  const dispatch = useDispatch();
  
  // This runs once when the app starts
  React.useEffect(() => {
    // ■ CRITICAL: Kill the ghost chat so it doesn't freeze on refresh!
    dispatch(setSelectedUser(null));
  }, [dispatch]);

  return children;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ClearGhostState>
        <App />
        <Toaster />
      </ClearGhostState>
    </PersistGate>
  </Provider>
);