// import { createStore } from "redux";
// import rootReducer from "../reducers/rootReducer";

// const store = createStore(rootReducer);

// export default store;

import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };

// import { createStore, applyMiddleware } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import sessionStorage from "redux-persist/lib/storage/session"; // التخزين المؤقت للجلسة
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "../reducers/rootReducer";

// const persistConfig = {
//   key: "root",
//   storage: sessionStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   persistedReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// const persistor = persistStore(store);

// export { store, persistor };
