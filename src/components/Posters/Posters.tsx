// import { Carousel } from 'antd'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getPosters } from 'src/api'
import { Poster } from 'src/types'

import styles from './Posters.module.css'
import { Typography } from 'antd'

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

  return (
    <>
      <Typography.Title level={3}>Постеры</Typography.Title>
      <div className={styles.posters}>Posters</div>
    </>
  )
  // return (
  //   <Carousel afterChange={() => console.log('')} className={styles.posters}>
  //     <div className={styles.poster}>ksdhge</div>
  //     <div className={styles.poster}>iiii</div>
  //   </Carousel>
  // )
}
