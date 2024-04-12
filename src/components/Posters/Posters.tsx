// import { Carousel } from 'antd'

import { useParams } from 'react-router-dom'
import styles from './Posters.module.css'
import { useEffect, useState } from 'react'

export const Posters = () => {
  const { id } = useParams()
  const [posters, setPosters] = useState([])

  // useEffect(() => {
  //   const getAllPosters = () =>
  // }, [])
  return <div className={styles.posters}>Posters</div>
  // return (
  //   <Carousel afterChange={() => console.log('')} className={styles.posters}>
  //     <div className={styles.poster}>ksdhge</div>
  //     <div className={styles.poster}>iiii</div>
  //   </Carousel>
  // )
}
