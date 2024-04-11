import styles from './Header.module.css'
import { Typography, Drawer } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import { Filters } from '../Filters/Filters'
import { useFilterParams } from 'src/utils/useFilterParams'
import { Movie } from 'src/types'

const { Text } = Typography

interface HeaderProps {
  searchQuery: string
  setMovies: (movies: Movie[]) => void
  setPage: (page: number) => void
  setSearchQuery: (query: string) => void
}

export const Header: FC<HeaderProps> = ({ searchQuery, setMovies, setSearchQuery, setPage }) => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <div className={styles.header}>
      <Text className={styles.title}>Авито.Кино</Text>
      <Text strong className={styles.sectionName}>
        Все фильмы и сериалы
      </Text>
      <MenuFoldOutlined className={styles.mobileMenuIcon} onClick={showDrawer} />
      <Drawer title="Меню" onClose={onClose} open={open}>
        <Filters
          searchQuery={searchQuery}
          setMovies={setMovies}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
          mobile
        />
      </Drawer>
    </div>
  )
}
