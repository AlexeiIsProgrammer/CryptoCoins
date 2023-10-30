import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import CoinPage from '../pages/CoinPage';
import CoinsPage from '../pages/CoinsPage';
import Header from '../components/Header';

const router = createBrowserRouter([
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
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
