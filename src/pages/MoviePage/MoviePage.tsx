import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Pagination, Spin, Button } from 'antd'

import styles from './MoviePage.module.css'
import { getMovie } from 'src/api'
import { useEffect } from 'react'

export const MoviePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { Text, Title, Paragraph } = Typography

  useEffect(() => {
    if (!id) {
      navigate('/')
    } else {
      const fetchMovie = async () => {
        const response = await getMovie(id)
        console.log(response)
      }
      fetchMovie()
    }
  })
  return (
    <div className={styles.background}>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Text style={{ color: '#C5C5C5' }}>Авито.Кино</Text>
            <Button>Назад</Button>
          </div>

          <div className={styles.content}>
            <div className={styles.poster}>jfjf</div>
            <div className={styles.info}>
              <div className={styles.about}>
                <Title level={2} className={styles.title}>
                  Название
                </Title>
                <Text type="secondary">Jgbejhgjkweh ekjwrghkrjeqbg ejhgerjkgbrek</Text>
              </div>
              <Title level={2} className={styles.rating}>
                9.0
              </Title>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
