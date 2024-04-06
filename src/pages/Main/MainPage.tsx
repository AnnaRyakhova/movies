import { Link } from 'react-router-dom'
import styles from './MainPage.module.css'

export const MainPage = () => {
  return (
    <div>
      <h1>Главная</h1>
      <Link to="/movie/1">К фильму</Link>
    </div>
  )
}
