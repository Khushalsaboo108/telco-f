import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import cartSlice from "./features/cartSlice";
import authSlice from "./features/authSlice";
import adminSlice from "./features/adminSlice";
import profileSlice from "./features/profileSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartSlice,
  auth: authSlice,
  admin: adminSlice,
  profile: profileSlice,
});

// Define the store without persistence first
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Define types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Helper to get persistor only on client side
let persistorInstance: any = null;

export function getPersistor() {
  if (typeof window === "undefined") return null;

  if (persistorInstance) return persistorInstance;

  // Only import storage and set up persistence on the client
  const storage = require("redux-persist/lib/storage").default;

  const persistConfig = {
    key: "telco-root",
    storage,
    // Optional: add blacklist for reducers you don't want to persist
    // blacklist: ['someReducer'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Create a new store with the persisted reducer
  const persistedStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  // Replace the original store's methods with the new one
  // This is a bit of a hack, but it allows us to maintain the same store reference
  Object.assign(store, persistedStore);

  // Create the persistor
  persistorInstance = persistStore(store);

  return persistorInstance;
}
