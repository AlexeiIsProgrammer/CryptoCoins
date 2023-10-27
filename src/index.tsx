import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';
import { setupStore } from './store';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
