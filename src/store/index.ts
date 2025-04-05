import { createSlice, configureStore, createAction } from "@reduxjs/toolkit";
import { PassBundleShort } from "../interfaces/pass";

export const Actions = {
  SET_CARDS: "cards/set",
  ADD_CARD: "card/add",
  REMOVE_CARD: "card/remove",
};

export const setCards = createAction<PassBundleShort[]>(Actions.SET_CARDS);
export const addCard = createAction<PassBundleShort>(Actions.ADD_CARD);
export const removeCard = createAction<PassBundleShort>(Actions.REMOVE_CARD);

export interface GlobalState {
  cards: PassBundleShort[];
}

const initialState: GlobalState = {
  cards: [],
};

const rootSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCards, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(addCard, (state, action) => {
        state.cards = [...state.cards, action.payload];
      });
    // .addCase(removeCard, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

export const store = configureStore({
  reducer: rootSlice.reducer,
});
