import { Typography, Drawer } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'

import { Filters } from '../Filters/Filters'

import styles from './Header.module.css'

const { Text } = Typography

export const Header: FC = () => {
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
        <Filters mobile />
      </Drawer>
    </div>
  )
}
