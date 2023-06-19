import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchArticles = createAsyncThunk('list/fetchArticles', async (offset) => {
  try {
    const res = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (err) {
    throw new Error(err)
  }
})

const initialState = {
  articles: [],
  total: 0,
  loading: true,
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles
      state.total = action.payload.articlesCount
      state.loading = false
    })
    builder.addCase(fetchArticles.rejected, (state) => {
      state.loading = true
    })
  },
})

export const { setPage } = listSlice.actions

export default listSlice.reducer
