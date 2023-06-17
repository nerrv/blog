import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (slug) => {
  try {
    const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data.article
  } catch (err) {
    throw new Error(err)
  }
})

export const createArticle = createAsyncThunk('article/createArticle', async (data) => {
  try {
    const res = await axios.post(
      'https://blog.kata.academy/api/articles',
      {
        article: data.article,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data.article
  } catch (err) {
    throw new Error(err)
  }
})

export const updateArticle = createAsyncThunk('article/updateArticle', async (data) => {
  try {
    const res = await axios.put(
      `https://blog.kata.academy/api/articles/${data.slug}`,
      {
        article: data.article,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data
  } catch (err) {
    throw new Error(err)
  }
})

export const deleteArticle = createAsyncThunk('article/deleteArticle', async (slug) => {
  try {
    const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
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

export const favoriteArticle = createAsyncThunk('article/favoriteArticle', async (slug) => {
  try {
    const res = await axios.post(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        body: '',
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data
  } catch (err) {
    throw new Error(err)
  }
})

export const unfavoriteArticle = createAsyncThunk('article/unfavoriteArticle', async (slug) => {
  try {
    const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
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
  loading: true,
  article: {
    author: {
      username: '',
      image: '',
    },
    body: '',
    createdAt: '',
    description: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: '',
  },
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload
      state.loading = false
    })
    builder.addCase(fetchArticle.pending, (state) => {
      state.loading = true
    })

    builder.addCase(createArticle.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createArticle.pending, (state) => {
      state.loading = true
    })

    builder.addCase(updateArticle.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(updateArticle.pending, (state) => {
      state.loading = true
    })
  },
})

export default articleSlice.reducer
