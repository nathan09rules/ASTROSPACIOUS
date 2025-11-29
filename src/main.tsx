// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Select from "./Select.tsx";
import Topic from "./Topic.tsx";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './css/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found. Ensure there is an element with id "root" in index.html');
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
