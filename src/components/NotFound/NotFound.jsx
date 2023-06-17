import { useNavigate } from 'react-router'
import { Button, Result } from 'antd'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate('/articles')} type="primary">
          Back Home
        </Button>
      }
    />
  )
}
export default NotFound
