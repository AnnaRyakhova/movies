import { Carousel } from 'antd'

import styles from './Posters.module.css'

export const Posters = () => {
  return <div className={styles.posters}>Posters</div>
  // return (
  //   <Carousel afterChange={() => console.log('')} className={styles.posters}>
  //     <div className={styles.poster}>ksdhge</div>
  //     <div className={styles.poster}>iiii</div>
  //   </Carousel>
  // )
}
