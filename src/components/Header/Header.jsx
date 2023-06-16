import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { fetchUser, setsIsLoggedOut } from '../../store/userSlice'
import defaultAvatar from '../../assets/img/avatar.png'

import classes from './Header.module.scss'

const Header = () => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const username = useSelector((state) => state.user.user.username)
  const avatar = useSelector((state) => state.user.user.image)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  const onLogOut = () => {
    dispatch(setsIsLoggedOut())
    localStorage.removeItem('token')
  }

  const loggedIn = (
    <>
      <Link to="/new-article">
        <button className={`${classes.btn} ${classes['btn--sign-up']}`} type="button">
          Create article
        </button>
      </Link>
      <Link to="/profile">
        <span className={classes.username}>{username}</span>
        <img className={classes.avatar} src={avatar ? avatar : defaultAvatar} alt="avatar" />
      </Link>
      <button className={classes.btn} onClick={onLogOut} type="button">
        Log Out
      </button>
    </>
  )

  const loggedOut = (
    <>
      <Link to="/sign-in">
        <button className={`${classes.btn} ${classes['btn--sign-in']}`} type="button">
          Sign In
        </button>
      </Link>
      <Link to="/sign-up">
        <button className={`${classes.btn} ${classes['btn--sign-up']}`} type="button">
          Sign Up
        </button>
      </Link>
    </>
  )

  return (
    <header className={classes.header}>
      <Link to="/articles">
        <button className={classes.btn} type="button">
          Realworld Blog
        </button>
      </Link>
      <div className={classes.header__user}>{isLoggedIn ? loggedIn : loggedOut}</div>
    </header>
  )
}

export default Header
