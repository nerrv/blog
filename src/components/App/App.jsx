import { Route, Routes } from 'react-router'

import Header from '../Header/Header'
import ItemList from '../ItemList/ItemList'
import Article from '../Article/Article'
import SignIn from '../UserForms/SignIn'
import SignUp from '../UserForms/SignUp'
import Profile from '../UserForms/Profile'
import CreateArticle from '../UserForms/CreateArticle'
import EditArticle from '../UserForms/EditArticle'

import classes from './App.module.scss'

const App = () => {
  return (
    <div className={classes.app}>
      <Header />
      <main className={classes.content}>
        <Routes>
          <Route index element={<ItemList />} />
          <Route path="/articles" element={<ItemList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="articles/:slug/edit" element={<EditArticle />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
