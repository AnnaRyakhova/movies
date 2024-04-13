import { Typography, Pagination } from 'antd'
import { FC, useState } from 'react'
import cn from 'classnames'

import { Person } from 'src/types'
import { getList } from 'src/utils/getList'

import styles from './ActorsInfo.module.css'

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

  const actorsList = getList(actorsPage, actors, 10)

  const actorsCount = actors.length - 1

  const isEmpty = actorsList.length === 0

  return (
    <div className={cn(styles.root, { [styles.empty]: isEmpty })}>
      <div>
        <Title level={4}>В ролях</Title>
        <div className={styles.actorsList}>
          {isEmpty ? (
            <Text type="secondary">Нет информации об актерах</Text>
          ) : (
            actorsList.map((actor, index) => <Text key={index}>{actor.name}</Text>)
          )}
        </div>
      </div>

      {!isEmpty && (
        <Pagination
          simple
          defaultCurrent={1}
          total={actorsCount}
          onChange={handlePage}
          hideOnSinglePage
          size="small"
          style={{ alignSelf: 'center' }}
          pageSize={10}
          className={styles.pagination}
        />
      )}
    </div>
  )
}
