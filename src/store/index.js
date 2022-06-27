import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import Logger from "redux-logger";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

import RootReducers from "./reducers";

const persistConfig = {
    key: "root",
    storage,
    // blacklist: ["navigation"], // navigation will not be persisted
    // whitelist: ["navigation"], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, RootReducers);

const sagaMiddleware = createSagaMiddleware();

let middlewares = [
    // Logger,
    sagaMiddleware,
    //  thunk
];

let store = createStore(persistedReducer, applyMiddleware(...middlewares));
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };

