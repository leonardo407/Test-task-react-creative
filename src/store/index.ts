import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import mainSlice from "./mainSlice";

const rootReducer = combineReducers({
  main: mainSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, unknown, unknown, Action<string>>;

export { store };
