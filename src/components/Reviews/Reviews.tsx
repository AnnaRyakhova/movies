import { FC, useEffect, useState } from 'react'
import { Pagination, Typography } from 'antd'
import cn from 'classnames'
import { useParams } from 'react-router-dom'

import { Review } from 'src/types'
import { getReviews } from 'src/api'
import { getList } from 'src/utils/getList'

import styles from './Reviews.module.css'

const { Title, Text } = Typography

interface ReviewCardProps {
  review: Review
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <div className={cn(styles.wrapper, { [styles.open]: isOpen })} onClick={handleOpen}>
      <Title level={5}>{review.author}</Title>
      <Text type="secondary" className={cn({ [styles.reviewText]: !isOpen })}>
        {review.review}
      </Text>
    </div>
  )
}

export const Reviews: FC = () => {
  const { id } = useParams()
  const [reviews, setReviews] = useState(Array<Review>)
  const [page, setPage] = useState(1)

  const handleReviews = (value: number) => {
    setPage(value)
  }

  useEffect(() => {
    const fetchReviews = async (id: string) => {
      try {
        const reviews = await getReviews(id)
        setReviews(reviews)
      } catch (error) {
        // console.log(error)
      }
    }
    if (id) {
      fetchReviews(id)
    }
  }, [id])

  const pageSize = 3

  const reviewList = getList(page, reviews, pageSize)

  return (
    <div className={styles.container}>
      <Typography.Title level={3}>Отзывы</Typography.Title>
      {reviewList.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
      <Pagination
        simple
        defaultCurrent={1}
        total={reviews.length}
        onChange={handleReviews}
        hideOnSinglePage
        size="small"
        showSizeChanger={false}
        style={{ alignSelf: 'center' }}
        pageSize={pageSize}
      />
    </div>
  )
}
