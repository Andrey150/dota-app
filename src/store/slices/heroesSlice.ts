import { createSlice, PayloadAction, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

import { IHeroStats } from "../../types/data";

interface HeroState {
  heroes: IHeroStats[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null
}

const initialState: HeroState = {
  heroes: [],
  status: 'idle',
  error: null
};

export const fetchHeroes = createAsyncThunk(
  'hero/fetchHeroes', 
  async () => {
    const response = await axios.get<IHeroStats[]>('https://api.opendota.com/api/heroStats'); // Замените на нужный URL
    return response.data;
  }
);

export const heroSlice =createSlice({
  name: 'hero',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchHeroes.fulfilled, (state, action: PayloadAction<IHeroStats[]>) => {
        state.status = 'succeeded';
        state.heroes = action.payload
      })
      .addCase( fetchHeroes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong';
      })
  }
})

export default heroSlice.reducer;
