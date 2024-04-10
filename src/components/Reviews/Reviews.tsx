import { Typography } from 'antd'

import styles from './Reviews.module.css'
import { Review } from 'src/types'
import { FC } from 'react'

const { Title, Text } = Typography

interface ReviewsProps {
  reviews: Review[]
}

export const Reviews: FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className={styles.container}>
      {reviews.map((review: Review, index) => (
        <div className={styles.wrapper} key={index}>
          <Title level={5}>{review.author}</Title>
          <Text type="secondary" className={styles.reviewText}>
            {review.review}
          </Text>
        </div>
      ))}
    </div>
  )
}
