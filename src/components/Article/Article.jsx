import { useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import Item from '../Item/Item'
import Loader from '../Loader/Loader'
import { fetchArticle } from '../../store/articleSlice'

import classes from './Article.module.scss'

const Article = () => {
  const dispatch = useDispatch()
  const { article } = useSelector((state) => state.article)
  const loading = useSelector((state) => state.article.loading)
  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticle(slug))
    }
  }, [slug])

  return (
    <div className={classes.article}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Item article={article} isFull={true} />
          <div style={{ padding: '0 15px 15px 15px' }}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  )
}

export default Article
