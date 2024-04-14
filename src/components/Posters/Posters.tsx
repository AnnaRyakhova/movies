import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Image, Typography } from 'antd'
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { getPosters } from 'src/api'
import { Poster } from 'src/types'

import styles from './Posters.module.css'

const { Title } = Typography

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
          toast.error('Не удалось загрузить постеры')
        }
      }
      getAllPosters()
    }
  }, [id])

  const renderPosters = () => {
    if (!posters.length) {
      return null
    }

    return posters.map((poster) => {
      return (
        <SwiperSlide className={styles.poster} key={poster.url}>
          <Image src={poster.url} preview />
        </SwiperSlide>
      )
    })
  }

  return (
    <div>
      <Title level={3}>Постеры</Title>
      <SwiperContainer spaceBetween={8} slidesPerView={3.5} autoHeight>
        {renderPosters()}
      </SwiperContainer>
    </div>
  )
}
