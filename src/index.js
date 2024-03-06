import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import { store } from './store';
import i18n from './i18n';
import "./_support/global";
import HomePage from './_pages/home';
import { GenerateFormPage } from './_pages/generate';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createHashRouter([
    {
        path: "/",
        element: <HomePage />,
        index: true
    },
    {
        path: '/generate',
        element: <GenerateFormPage />
    },

], {
    basename: "/react-form-builder",
});

root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n} >
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </I18nextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
