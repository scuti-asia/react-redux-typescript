import { createStore, applyMiddleware, Store, compose } from "redux";
import thunk from "redux-thunk";
import storage from 'redux-persist/es/storage';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer, { initialState } from "./AppReducers";
import { ApplicationState } from "./AppTypes";

export function configureStore(
  initialState: ApplicationState
): Store<ApplicationState> {
  let composeEnhancers;
  if (
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = compose(
      applyMiddleware(thunk),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    composeEnhancers = compose(applyMiddleware(thunk));
  }
  return createStore(
    persistReducer({key: 'persistedStore', storage}, rootReducer),
    composeEnhancers
  );
}

// Redux: Store
const store = configureStore(initialState);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export default store;
export {
  persistor
}
