import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import { queryClient } from './lib/queryClient';
import { AppRouter } from './router';

import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <AppRouter />
                <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
            </QueryClientProvider>
        </HelmetProvider>
    </StrictMode>
);
