import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './router/App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import store from './redux/store.jsx'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <App />
    </Provider>
)
