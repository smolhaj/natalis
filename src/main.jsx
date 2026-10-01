import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// The game — engine, store and ~9,000 events — is loaded after first paint.
// Imported statically, all of it (3.7 MB gzip) had to download and parse
// before anything appeared; index.html now paints a title shell at once and
// this swaps it for the game when the corpus is ready.
import('./App.jsx').then(({ default: App }) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
