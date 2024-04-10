import styles from './Header.module.css'
import { Typography, Drawer } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import { Filters } from '../Filters/Filters'
import { useFilterParams } from 'src/utils/useFilterParams'
import { Movie } from 'src/types'

const { Text } = Typography

interface HeaderProps {
  setMovies: (movies: Movie[]) => void
}

export const Header: FC<HeaderProps> = ({ setMovies }) => {
  const [open, setOpen] = useState(false)
  const { setFilterParams } = useFilterParams()

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <div className={styles.header}>
      <Text style={{ color: '#C5C5C5' }}>Авито.Кино</Text>
      <Text strong>Все фильмы и сериалы</Text>
      <MenuFoldOutlined className={styles.mobileMenuIcon} onClick={showDrawer} />
      <Drawer title="Меню" onClose={onClose} open={open}>
        <Filters setFilterParams={setFilterParams} setMovies={setMovies} />
      </Drawer>
    </div>
  )
}
