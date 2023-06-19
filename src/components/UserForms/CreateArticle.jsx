import { useDispatch } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router'
import { message } from 'antd'
import cn from 'classnames'

import { createArticle, updateArticle } from '../../store/articleSlice'

import classes from './UserForms.module.scss'

const CreateArticle = ({ edit = false, defaultValues = { title: '', description: '', body: '' } }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = (data) => {
    const { tags, ...articleData } = data
    const tagList = tags.map((item) => item.tag)
    const newData = { article: { tagList, ...articleData }, slug }

    if (slug) {
      dispatch(updateArticle(newData)).then(() => {
        message.success('Article has been updated')
        navigate('/articles')
      })
    }
    if (!slug) {
      dispatch(createArticle(newData)).then(() => {
        message.success('Article has been created')
        navigate('/articles')
      })
    }
  }

  if (!localStorage.getItem('token')) {
    return <Navigate to="/sign-in" />
  }

  return (
    <div className={`${classes.wrapper} ${classes['wrapper--article']}`}>
      <h2 className={classes.title}>{edit ? 'Edit article' : 'Create new article'}</h2>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label} htmlFor="title">
          Title
        </label>
        <input
          className={cn(classes.input, { [classes['input--error']]: errors.title })}
          {...register('title', {
            required: 'Title is required',
            validate: (value) => value.trim().length || 'Title cannot be empty',
          })}
          id="title"
          placeholder="Title"
        />
        <div className={classes.error}>{errors?.title && <p>{errors?.title.message}</p>}</div>

        <label className={classes.label} htmlFor="description">
          Short description
        </label>
        <input
          className={cn(classes.input, { [classes['input--error']]: errors.description })}
          {...register('description', {
            required: 'Description is required',
            validate: (value) => value.trim().length || 'Description cannot be empty',
          })}
          id="description"
          placeholder="Description"
        />
        <div className={classes.error}>{errors?.description && <p>{errors?.description.message}</p>}</div>

        <label className={classes.label} htmlFor="text">
          Text
        </label>
        <textarea
          className={cn(classes.input, { [classes['input--error']]: errors.body })}
          {...register('body', {
            required: 'Text is required',
            validate: (value) => value.trim().length || 'Text cannot be empty',
          })}
          id="text"
          placeholder="Text"
        />
        <div className={classes.error}>{errors?.body && <p>{errors?.body.message}</p>}</div>

        <label className={classes.label}>Tags</label>
        <div className={classes.tags}>
          <ul>
            {fields.map((field, index) => {
              return (
                <li key={field.id}>
                  <div className={classes.tags__wrapper}>
                    <input
                      className={cn(classes.input, { [classes['input--error']]: errors.tags })}
                      {...register(`tags.${index}.tag`, {
                        required: 'Tag is required',
                        validate: (value) => value.trim().length || 'Tag cannot be empty',
                      })}
                      placeholder="Tag"
                    />
                    <div className={classes.error}>{errors?.tags && <p>{errors?.tags[index]?.tag?.message}</p>}</div>
                  </div>
                  <button
                    className={`${classes['btn']} ${classes['btn--delete']}`}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            className={`${classes['btn']} ${classes['btn--add']}`}
            onClick={() => append({ tag: '' })}
            type="button"
          >
            Add Tag
          </button>
        </div>

        <button className={`${classes.btn} ${classes['btn--send']}`} type="submit" disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  )
}

export default CreateArticle
