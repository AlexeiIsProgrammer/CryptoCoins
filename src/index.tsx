import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app/App';
import './index.scss';
import { persistor, store } from './store';
import ErrorPage from './pages/ErrorPage';
import CoinPage from './pages/CoinPage';
import CoinsPage from './pages/CoinsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <CoinsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'coins/:coinId',
        element: <CoinPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<h1>Loading persist..</h1>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
