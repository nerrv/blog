import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import cn from 'classnames'

import Loader from '../Loader/Loader'
import { updateUser } from '../../store/userSlice'

import classes from './UserForms.module.scss'

const Profile = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user)
  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.error)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
      image: user.image,
    },
  })

  useEffect(() => {
    if (!error) return
    const errorName = Object.keys(error)[0]

    if (errorName === 'username') {
      setError('username', { type: 'custom', message: 'Username is already taken' })
    }

    if (errorName === 'email') {
      setError('email', { type: 'custom', message: 'Email is already taken' })
    }
  }, [error])

  const onSubmit = (data) => {
    const newData = Object.fromEntries(Object.entries(data).filter(([, value]) => value.trim().length))
    dispatch(updateUser(newData))
  }

  return (
    <div className={classes.wrapper}>
      {loading && <Loader />}
      <h2 className={classes.title}>Edit Profile</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Username
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.username })}
            {...register('username', {
              required: 'Username cannot be empty',
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'Username is invalid',
              },
              minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
              maxLength: {
                value: 20,
                message: 'Your username needs to be at maximum 20 characters.',
              },
            })}
            placeholder="Username"
          />
        </label>
        <div className={classes.error}>{errors.username && <p>{errors?.username.message}</p>}</div>

        <label className={classes.label}>
          Email address
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.email })}
            {...register('email', {
              required: 'Email cannot be empty',
              pattern: {
                value:
                  /^[a-z0-9-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/g,
                message: 'Email is invalid',
              },
            })}
            type="email"
            placeholder="Email address"
          />
        </label>
        <div className={classes.error}>{errors.email && <p>{errors?.email.message}</p>}</div>

        <label className={classes.label}>
          New Password
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.password })}
            {...register('password', {
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: {
                value: 40,
                message: 'Your password needs to be at maximum 40 characters.',
              },
            })}
            type="password"
            placeholder="Password"
          />
        </label>
        <div className={classes.error}>{errors.password && <p>{errors?.password.message}</p>}</div>

        <label className={classes.label}>
          Avatar image (url)
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.image })}
            {...register('image', {
              pattern: {
                value: /[-a-zA-Z0-9@:%_\\+.~#?&\\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\\+.~#?&\\/=]*)?/gi,
                message: 'Invalid url',
              },
            })}
            placeholder="Avatar image"
          />
        </label>
        <div className={classes.error}>{errors.image && <p>{errors?.image.message}</p>}</div>

        <button className={classes.btn} type="submit" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  )
}

export default Profile
