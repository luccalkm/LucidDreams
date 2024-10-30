import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);