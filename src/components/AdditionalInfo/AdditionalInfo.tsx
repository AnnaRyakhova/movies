import { Typography, Pagination } from 'antd'

import styles from './AdditionalInfo.module.css'
import { Episode, Person, Season } from 'src/types'
import { useState } from 'react'

const { Title, Text } = Typography

export const AdditionalInfo = ({ actors, seasons }: { actors: Person[]; seasons: Season[] }) => {
  const [actorsPage, setPage] = useState(1)
  const [seriesPage, setSeriesPage] = useState(1)

  const episodes: Episode[] = []

  seasons.forEach((season) => {
    season.episodes.map((episod) =>
      episodes.push({
        number: episod.number,
        seasonNumber: season.number,
        name: episod.name,
      }),
    )
  })

  const handlePage = (value: number) => {
    setPage(value)
  }

  const handleSeries = (value: number) => {
    setSeriesPage(value)
  }

  const getList = (page: number, coll: Episode[] | Person[], pageSize: number): Episode[] | Person[] => {
    const startSlice = page * pageSize - pageSize
    const endSlice = page * pageSize

    return coll?.slice(startSlice, endSlice)
  }

  const actorsList = getList(actorsPage, actors, 10) as Person[]
  const episodeList = getList(seriesPage, episodes, 4) as Episode[]

  const actorsCount = actors?.length - 1
  const episodesCount = episodes?.length - 1

  return (
    <div className={styles.container}>
      <div className={styles.actors}>
        <div>
          <Title level={4}>В ролях</Title>
          <div className={styles.list}>
            {actorsList?.map((actor, index) => (
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

      <div className={styles.series}>
        <div>
          <Title level={4} style={{ margin: '0' }}>
            Сезоны и серии
          </Title>
          <Text type="secondary">Всего сезонов: {seasons.length}</Text>

          <div className={styles.list} style={{ paddingTop: '12px' }}>
            {episodeList?.map((episode, index) => {
              return (
                <Text key={index}>
                  Эпизод {episode.number}, сезон {episode.seasonNumber} {episode.name}
                </Text>
              )
            })}
          </div>
        </div>

        <Pagination
          simple
          defaultCurrent={1}
          total={episodesCount}
          onChange={handleSeries}
          hideOnSinglePage
          size="small"
          showSizeChanger={false}
          style={{ alignSelf: 'center' }}
          pageSize={4}
        />
      </div>
    </div>
  )
}
