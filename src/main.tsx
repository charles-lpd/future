import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import 'regenerator-runtime/runtime';
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = require('crypto-browserify');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
