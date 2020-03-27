import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import thunkMiddleware from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import App from './App';
import trackReducer from "./store/trackReducer";
import UserReducer from "./store/UserReducer"
import authorReducer from "./store/authorReducer"
import * as serviceWorker from './serviceWorker';
import albumsReducer from "./store/albumReducer";
import Reducer from "./store/reducer";

const history = createBrowserHistory();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    tracksHis:Reducer,
    tracks: trackReducer,
    albums:albumsReducer,
    authors:authorReducer,
    users: UserReducer,
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>

);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export default store