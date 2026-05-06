'use client';

import { makeStore } from '@/store/store';
import { Provider } from 'react-redux';

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    const store=makeStore()
    return <>
        <Provider store={store}>
            {children}
        </Provider>
    </>
}
