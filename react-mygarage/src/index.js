import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import {userLoggedIn} from "./actions/auth";
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);


if(localStorage.mygarageJWT){
    const user = {
        user_id: localStorage.user_id,
        user_token: localStorage.mygarageJWT,
        email: localStorage.email,
        first_name:localStorage.first_name,
        last_name:localStorage.last_name,
    }
    store.dispatch(userLoggedIn(user));

    setAuthorizationHeader(localStorage.mygarageJWT);
}


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App}/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
