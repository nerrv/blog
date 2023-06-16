import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Pagination } from 'antd'

import Item from '../Item/Item'
import Loader from '../Loader/Loader'
import { fetchArticles, setPage } from '../../store/listSlice'

import classes from './ItemList.module.scss'

const ItemList = () => {
  const dispatch = useDispatch()

  const page = useSelector((state) => state.list.page)
  const offset = 5 * page - 5

  const total = useSelector((state) => state.list.total)
  const loading = useSelector((state) => state.list.loading)

  const items = useSelector((state) => state.list.articles)
  const elements = items.map((item) => (
    <li key={`${item.slug}${item.favoritesCount}`}>
      <Item article={item} isFull={false} />
    </li>
  ))

  const onChange = (page) => {
    dispatch(setPage(page))
  }

  useEffect(() => {
    dispatch(fetchArticles(offset))
  }, [offset])

  return (
    <>
      {loading && <Loader />}
      <ul className={classes.list}>{elements}</ul>
      <Pagination
        onChange={(page) => onChange(page)}
        style={{ textAlign: 'center', margin: '15px 0' }}
        total={total}
        current={page}
        pageSize={5}
        showSizeChanger={false}
      />
    </>
  )
}

export default ItemList
