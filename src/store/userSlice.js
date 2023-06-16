import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchRegistration = createAsyncThunk('user/fetchRegistration', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('https://blog.kata.academy/api/users', data)
    localStorage.setItem('token', res.data.user.token)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data.errors)
  }
})

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('https://blog.kata.academy/api/users/login', data)
    localStorage.setItem('token', res.data.user.token)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data.errors)
  }
})

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  const res = await axios.get('https://blog.kata.academy/api/user', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
  return res.data
})

export const updateUser = createAsyncThunk('user/updateUser', async (data) => {
  try {
    const res = await axios.put(
      'https://blog.kata.academy/api/user',
      { user: data },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data
  } catch (err) {
    throw new Error('Error')
  }
})

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  user: {
    email: '',
    token: '',
    username: '',
    image: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setsIsLoggedOut(state) {
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.error = action.payload
      state.isLoggedIn = true
    })
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.error = action.payload
    })

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.error = null
      state.isLoggedIn = true
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = action.payload
    })

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isLoggedIn = true
      state.loading = false
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload
    })

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.error = null
      state.loading = false
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.payload
    })
  },
})

export const { setsIsLoggedOut } = userSlice.actions
export default userSlice.reducer
