import { FC } from 'react'
import { Image, Skeleton } from 'antd'

import styles from './MainPoster.module.css'

interface Props {
  image?: string
}

export const MainPoster: FC<Props> = ({ image }) => {
  if (!image) {
    return <Skeleton.Image className={styles.skeleton} active={true} />
  }

  return <Image className={styles.image} src={image} />
}
