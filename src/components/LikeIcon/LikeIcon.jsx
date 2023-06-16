import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import { favoriteArticle, unfavoriteArticle } from '../../store/articleSlice'

import classes from './LikeIcon.module.scss'

const LikeIcon = ({ favorited, slug, count }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const [likesCounter, setLikesCounter] = useState(0)
  const [isClicked, setIsClicked] = useState(favorited)

  const onToggleFavorite = () => {
    setIsClicked((isClicked) => !isClicked)

    if (!isClicked) {
      setLikesCounter((likes) => likes + 1)
      dispatch(favoriteArticle(slug))
    }
    if (isClicked) {
      setLikesCounter((likes) => likes - 1)
      dispatch(unfavoriteArticle(slug))
    }
  }

  return (
    <button className={classes.btn} onClick={onToggleFavorite} disabled={!isLoggedIn}>
      <svg
        className={cn(classes.like, { [classes.active]: isClicked })}
        width="16"
        height="14"
        viewBox="0 0 16 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 2.56911C7.26154 1.33835 6.03077 0.476807 4.55385 0.476807C2.46154 0.476807 0.861542 2.07681 0.861542 4.16911C0.861542 8.23065 3.07693 8.84604 8 13.523C12.9231 8.84604 15.1385 8.23065 15.1385 4.16911C15.1385 2.07681 13.5385 0.476807 11.4462 0.476807C9.96923 0.476807 8.73846 1.33835 8 2.56911Z" />
      </svg>
      <span className={classes['likes-count']}>{count + likesCounter}</span>
    </button>
  )
}

export default LikeIcon
