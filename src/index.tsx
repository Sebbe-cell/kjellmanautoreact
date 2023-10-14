import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/input.css'
import App from './App'
import { TokenProvider } from './utils/tokenContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <TokenProvider>
            <App />
        </TokenProvider>
    </React.StrictMode>
)
