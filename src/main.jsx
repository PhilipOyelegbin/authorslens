import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Store from './store'
import App from './App'
import './index.css'
import 'animate.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
)
