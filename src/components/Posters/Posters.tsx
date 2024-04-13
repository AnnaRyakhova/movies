import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getPosters } from 'src/api'
import { Poster } from 'src/types'

import styles from './Posters.module.css'
import { Image, Typography } from 'antd'
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export const Posters = () => {
  const { id } = useParams()
  const [posters, setPosters] = useState<Poster[]>([])

  useEffect(() => {
    if (id) {
      const getAllPosters = async () => {
        try {
          const posters = await getPosters(id)
          setPosters(posters)
        } catch {
          console.log('error')
        }
      }
      getAllPosters()
    }
  }, [id])

  // console.log(posters)

  const renderPosters = () => {
    if (!posters.length) {
      return null
    }

    return posters.map((poster) => {
      return (
        <SwiperSlide className={styles.poster} key={poster.previewUrl}>
          <Image src={poster.url} preview />
        </SwiperSlide>
      )
    })
  }

  return (
    <>
      <Typography.Title level={3}>Постеры</Typography.Title>
      <div className={styles.posters}>
        <SwiperContainer spaceBetween={8} slidesPerView={3.5} autoHeight>
          {renderPosters()}
        </SwiperContainer>
      </div>
    </>
  )
}
