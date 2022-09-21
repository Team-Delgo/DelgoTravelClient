import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import VConsole from 'vconsole';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

const persistor = persistStore(store);


console.log('a');


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
