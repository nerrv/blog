import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CreateArticle from './CreateArticle'

const EditArticle = () => {
  const article = useSelector((state) => state.article.article)
  const { title, description, body, tagList } = article
  const tags = tagList.map((item) => ({ tag: item }))
  const defaultValues = { title, description, body, tags }
  if (!localStorage.getItem('token')) {
    return <Navigate to="/sign-in" />
  }
  if (localStorage.getItem('token')) {
    return <CreateArticle edit={true} defaultValues={defaultValues} />
  }
}

export default EditArticle
