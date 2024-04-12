import { Typography, Pagination } from 'antd'
import { FC, useState } from 'react'

import styles from './ActorsInfo.module.css'
import { Person } from 'src/types'

const { Title, Text } = Typography

interface ActorsInfoProps {
  actors: Person[]
}

export const ActorsInfo: FC<ActorsInfoProps> = ({ actors }) => {
  const [actorsPage, setPage] = useState(1)

  if (!actors) {
    return null
  }

  const handlePage = (value: number) => {
    setPage(value)
  }

  const getActorsList = (page: number, list: Person[], pageSize: number): Person[] => {
    const startSlice = page * pageSize - pageSize
    const endSlice = page * pageSize

    return list.slice(startSlice, endSlice)
  }

  const actorsList = getActorsList(actorsPage, actors, 10)

  const actorsCount = actors.length - 1

  return (
    <div className={styles.root}>
      <div>
        <Title level={4}>В ролях</Title>
        <div className={styles.actorsList}>
          {actorsList.map((actor, index) => (
            <Text key={index}>{actor.name}</Text>
          ))}
        </div>
      </div>

      <Pagination
        simple
        defaultCurrent={1}
        total={actorsCount}
        onChange={handlePage}
        hideOnSinglePage
        size="small"
        style={{ alignSelf: 'center' }}
        pageSize={10}
      />
    </div>
  )
}
