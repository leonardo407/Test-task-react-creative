import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./index";
import { IBeerItem, IMainStore } from "../types";
import axios from "../utils/axios/index";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    beerList: [],
    isSendingRequest: false,
  } as IMainStore,
  reducers: {
    changeBeerList(state, action: PayloadAction<IBeerItem[]>) {
      state.beerList = action.payload;
    },
    changeIsSendingRequest(state, action: PayloadAction<boolean>) {
      state.isSendingRequest = action.payload;
    },
  },
});

const { actions, reducer } = mainSlice;

export const { changeBeerList, changeIsSendingRequest } = actions;
export default reducer;

export const getBeer = (
  page: number,
  name: string,
  abv: number,
  isAbvDirectionUp: boolean
): AppThunk => async (dispatch) => {
  try {
    dispatch(changeIsSendingRequest(true));

    const gtvQuery = isAbvDirectionUp ? `&abv_gt=${abv}` : `&abv_lt=${abv}`;

    const response = await axios.get(
      `beers?page=${page}&per_page=20${
        name ? `&beer_name=${name}` : ""
      }${gtvQuery}`
    );
    const data = response.data;

    dispatch(changeBeerList(data));
    dispatch(changeIsSendingRequest(false));
  } catch (e) {
    dispatch(changeIsSendingRequest(false));
    console.log(e);
    alert("An error has occurred");
  }
};
