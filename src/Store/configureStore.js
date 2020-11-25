// import { applyMiddleware, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

// import monitorReducersEnhancer from './enhancers/monitorReducer'
// import loggerMiddleware from './middleware/logger'
// import rootReducer from './reducers'

// const addLoggingToDispatch = (store) => {
//   const rawDispatch = store.dispatch;

//   if (!console.group) {
//     return rawDispatch;
//   }

//   return (action) => {
//     console.group(action.type);
//     console.log('%c prev State->','color: gray', store.getState());
//     console.log('%c action->','color: blue',action);
//     const returnValue = rawDispatch(action);
//     console.log('%c next State->','color: green', store.getState());

//     console.groupEnd(action.type);
//     return returnValue;
//   }
// }

// export default function configureStore(preloadedState) {
//   const middlewares = [loggerMiddleware, thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)

//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//   const composedEnhancers = composeWithDevTools(...enhancers)

//   const store = createStore(rootReducer(), preloadedState, composedEnhancers)
//   store.dispatch = addLoggingToDispatch(store);

//   return store
// }

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import monitorReducersEnhancer from '../enhancers/monitorReducer';
import loggerMiddleware from '../middleware/logger';
import rootReducer from '../reducers/index';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    // console.group("action - type", action.type);
    console.log('%c prev State->', 'color: gray', store.getState());
    // console.log('%c action->', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next State->', 'color: green', store.getState());

    // console.groupEnd(action.type);
    return returnValue;
  }
}

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer(),
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducersEnhancer]
  });

  store.dispatch = addLoggingToDispatch(store);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
