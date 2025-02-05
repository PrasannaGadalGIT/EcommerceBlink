// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import type { PersistConfig } from 'redux-persist';
// import loginReducer from './features/loginSlice';
// import { createLogger } from 'redux-logger';

// // Custom Storage Type
// type CustomStorage = {
//   getItem: (key: string) => Promise<string | null>;
//   setItem: (key: string, item: string) => Promise<void>;
//   removeItem: (key: string) => Promise<void>;
// };

// // Create custom storage for SSR compatibility
// const createCustomStorage = (): CustomStorage => {
//   if (typeof window !== 'undefined' && window.localStorage) {
//     return {
//       getItem: (key) => {
//         try {
//           return Promise.resolve(localStorage.getItem(key));
//         } catch (error) {
//           console.error('Error getting item from localStorage', error);
//           return Promise.resolve(null);
//         }
//       },
//       setItem: (key, item) => {
//         try {
//           localStorage.setItem(key, item);
//           return Promise.resolve();
//         } catch (error) {
//           console.error('Error setting item in localStorage', error);
//           return Promise.resolve();
//         }
//       },
//       removeItem: (key) => {
//         try {
//           localStorage.removeItem(key);
//           return Promise.resolve();
//         } catch (error) {
//           console.error('Error removing item from localStorage', error);
//           return Promise.resolve();
//         }
//       },
//     };
//   }

//   // Fallback for SSR
//   return {
//     getItem: () => Promise.resolve(null),
//     setItem: () => Promise.resolve(),
//     removeItem: () => Promise.resolve(),
//   };
// };

// // Persist configuration
// const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
//   key: 'root',
//   version: 1,
//   storage: createCustomStorage(),
//   whitelist: ['login'],
// };

// // Root reducer
// const rootReducer = combineReducers({
//   login: loginReducer,
// });

// // Persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Logger middleware
// const loggerMiddleware = createLogger();

// // Create the store function
// export const createStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }).concat(loggerMiddleware),
//     devTools: process.env.NODE_ENV !== 'production',
//   });
// };

// // Store instance
// const store = createStore();

// export default store;

// // Infer RootState and AppDispatch types
// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
