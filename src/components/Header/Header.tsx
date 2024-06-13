import { Typography, Drawer } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'

import { Filters } from '../Filters/Filters'

import styles from './Header.module.css'
import { Movie } from 'src/types'

const { Text } = Typography

interface Props {
  setLoading: (arg: boolean) => void
  setTotal: (total: number | undefined) => void
  setMovies: (movies: Movie[]) => void
}

export const Header: FC<Props> = ({ setTotal, setLoading, setMovies }) => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => setOpen(true)

  const onClose = () => setOpen(false)

  return (
    <div className={styles.header}>
      <Text className={styles.title}>Авито.Кино</Text>
      <Text strong className={styles.sectionName}>
        Все фильмы и сериалы
      </Text>
      <MenuFoldOutlined className={styles.mobileMenuIcon} onClick={showDrawer} />
      <Drawer title="Меню" onClose={onClose} open={open}>
        <Filters mobile setLoading={setLoading} setTotal={setTotal} setMovies={setMovies} />
      </Drawer>
    </div>
  )
}
