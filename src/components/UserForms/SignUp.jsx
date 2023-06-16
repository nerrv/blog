import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { fetchRegistration } from '../../store/userSlice'

import classes from './UserForms.module.scss'

const SignUp = () => {
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid },
    setError,
    handleSubmit,
    watch,
  } = useForm({ mode: 'onBlur' })

  const error = useSelector((state) => state.user.error)

  useEffect(() => {
    if (!error) return
    const errorName = Object.keys(error)[0]

    if (errorName === 'username') {
      setError('username', { type: 'custom', message: 'Username is already taken' })
    }

    if (errorName === 'email') {
      setError('email', { type: 'custom', message: 'Email is already taken' })
    }
    console.log(errorName)
  }, [error])

  const onSubmit = (data) => {
    const { username, email, password } = data
    const newUser = { user: { username, email, password } }
    dispatch(fetchRegistration(newUser))
  }

  const password = watch('password')

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Create new account</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Username
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.username })}
            {...register('username', {
              required: 'Username is required',
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
              required: 'Email is required',
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
          Password
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.password })}
            {...register('password', {
              required: 'Password is required',
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
          Repeat Password
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.repeat })}
            {...register('repeat', {
              required: 'This field is required',
              validate: (value) => value === password || 'Passwords must match',
            })}
            type="password"
            placeholder="Password"
          />
        </label>
        <div className={classes.error}>{errors.repeat && <p>{errors?.repeat.message}</p>}</div>

        <label className={classes.agreement}>
          <input {...register('agreement', { required: true })} className={classes.checkbox} type="checkbox" />I agree
          to the processing of my personal information
        </label>
        <button className={classes.btn} type="submit" disabled={!isValid}>
          Create
        </button>
      </form>

      <footer className={classes.footer}>
        <span>Already have an account? </span>
        <Link to="/sign-in"> Sign In.</Link>
      </footer>
    </div>
  )
}

export default SignUp
