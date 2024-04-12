import { Typography, Drawer } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'

import { Filters } from '../Filters/Filters'
import { Movie } from 'src/types'

import styles from './Header.module.css'

const { Text } = Typography

interface HeaderProps {
  searchQuery: string
  setMovies: (movies: Movie[]) => void
  setPage: (page: number) => void
  setSearchQuery: (query: string) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
}

export const Header: FC<HeaderProps> = ({ pageSize, setPageSize, searchQuery, setMovies, setSearchQuery, setPage }) => {
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
          setPageSize={setPageSize}
          pageSize={pageSize}
          mobile
        />
      </Drawer>
    </div>
  )
}
