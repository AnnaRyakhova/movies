import styles from './Header.module.css'
import { Typography, Drawer } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Filters } from '../Filters/Filters'
import { useFilterParams } from 'src/utils/useFilterParams'

const { Text } = Typography

export const Header = () => {
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
        <Filters setFilterParams={setFilterParams} />
      </Drawer>
    </div>
  )
}
