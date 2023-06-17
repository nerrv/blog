import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Tag, Popconfirm, message } from 'antd'
import { format } from 'date-fns'

import LikeIcon from '../LikeIcon/LikeIcon'
import avatar from '../../assets/img/avatar.png'
import { deleteArticle } from '../../store/articleSlice'

import classes from './Item.module.scss'

const Item = ({ article, isFull }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const username = useSelector((state) => state.user.user.username)
  const slug = useSelector((state) => state.article.article.slug)

  const formatDate = (date) => format(new Date(date), 'LLLL d, yyyy')

  const onConfirm = () => {
    dispatch(deleteArticle(slug)).then(() => {
      message.success('Article has been deleted')
      navigate('/articles')
    })
  }

  return (
    <article className={classes.item}>
      <section className={classes.section}>
        <div className={classes.info}>
          <h2 className={classes.title}>
            <Link to={`/articles/${article.slug}`}>{article.title}</Link>
          </h2>
          <LikeIcon favorited={article.favorited} slug={article.slug} count={article.favoritesCount} />
        </div>

        <ul className={classes.tags}>
          {article.tagList.map((tag, index) => (
            <li key={index}>{tag && <Tag>{tag}</Tag>}</li>
          ))}
        </ul>

        <p className={classes.text}>{article.description}</p>
      </section>

      <section className={classes.user}>
        <div className={classes.user__info}>
          <span>{article.author.username}</span>
          <span className={classes.date}>{article.createdAt && formatDate(article.createdAt)}</span>
        </div>

        <img
          className={classes.avatar}
          src={article.author.image}
          onError={(e) => (e.currentTarget.src = avatar)}
          alt="avatar"
        />

        {article.author.username === username && isFull && (
          <div className={classes.btns}>
            <Popconfirm
              placement="bottom"
              title="Delete the article"
              description="Are you sure to delete this article?"
              okText="Yes"
              cancelText="No"
              onConfirm={onConfirm}
            >
              <button className={`${classes.btn} ${classes['btn--delete']}`} type="button">
                Delete
              </button>
            </Popconfirm>

            <Link to="edit">
              <button className={classes.btn} type="button">
                Edit
              </button>
            </Link>
          </div>
        )}
      </section>
    </article>
  )
}

export default Item
