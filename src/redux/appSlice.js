import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getCard} from '../api';

export const getData = createAsyncThunk('app/getData', async req => {
  try {
    const res = await getCard(req);
    return res;
  } catch (error) {
    alert(error);
  }
});

initialState = {
  auth: false,
  search: '',
  cart: [],
  data: {},
  loading: 'idle',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeSearch: (state, {payload}) => {
      state.search = payload;
    },
    authStateChange: (state, {payload}) => {
      state.auth = payload;
    },
    addToCart: (state, {payload}) => {
      state.cart.push(payload);
    },
    removeFromCart: (state, {payload}) => {
      state.cart = state.cart.filter(cart => cart.id != payload);
    },
    clearCart: state => {
      state.cart = [];
    },
    increaseQuanity: (state, {payload}) => {
      state.cart[payload].quantity += 1;
    },
    decreaseQuanity: (state, {payload}) => {
      state.cart[payload].quantity -= 1;
    },
    clearData: state => {
      state.data = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(getData.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(getData.fulfilled, (state, {payload}) => {
      if (state.data?.data?.length > 0) {
        state.data?.data?.push(...payload.data);
        state.loading = 'successed';
        return;
      }
      state.data = payload;
      state.loading = 'successed';
    });
    builder.addCase(getData.rejected, state => {
      state.loading = 'rejected';
    });
  },
});

export const {
  authStateChange,
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuanity,
  decreaseQuanity,
  changeSearch,
  clearData
} = appSlice.actions;

export default appSlice.reducer;
