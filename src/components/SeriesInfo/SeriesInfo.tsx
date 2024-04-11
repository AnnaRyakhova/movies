import { Typography, Pagination } from 'antd'
import { FC, useEffect, useState } from 'react'

import { Episode, Season } from 'src/types'
import { getSeasons } from 'src/api'
import { useParams } from 'react-router-dom'
import { getList } from 'src/utils/getList'

import styles from './SeriesInfo.module.css'

const { Title, Text } = Typography

export const SeriesInfo: FC = () => {
  const [seriesPage, setSeriesPage] = useState(1)
  const [seasons, setSeasons] = useState(Array<Season>)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      try {
        const fetchSeasons = async () => {
          const seasons = await getSeasons(id)
          const seasonsWithoutSpecials = seasons.filter(({ number }) => number)
          setSeasons(seasonsWithoutSpecials)
        }
        fetchSeasons()
      } catch {
        console.log('error Seasons')
      }
    }
  }, [id])

  const episodes = seasons.reduce((allEpisodes, season) => {
    const seasonEpisodes = season.episodes.map((episod) => ({
      number: episod.number,
      seasonNumber: season.number,
      name: episod.name,
    }))
    return [...allEpisodes, ...seasonEpisodes]
  }, [] as Episode[])

  const handleSeries = (value: number) => {
    setSeriesPage(value)
  }

  const pageSize = 4

  const episodeList = getList(seriesPage, episodes, pageSize) as Episode[]

  const episodesCount = episodes?.length - 1

  return (
    <div className={styles.seriesWrapper}>
      <div>
        <Title level={4} style={{ margin: '0' }}>
          Сезоны и серии
        </Title>
        <Text type="secondary">Всего сезонов: {seasons.length}</Text>

        <div className={styles.seriesList}>
          {episodeList.map((episode, index) => (
            <Text key={index}>
              Эпизод {episode.number}, сезон {episode.seasonNumber} {episode.name}
            </Text>
          ))}
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
        pageSize={pageSize}
      />
    </div>
  )
}
