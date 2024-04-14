import { Typography, Pagination } from 'antd'
import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { toast } from 'sonner'

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
          setSeasons([...seasonsWithoutSpecials].reverse())
        }
        fetchSeasons()
      } catch {
        toast.error('Не удалось загрузить эпизоды')
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

  const isEmpty = episodeList.length === 0

  return (
    <div className={cn(styles.seriesWrapper, { [styles.empty]: isEmpty })}>
      <div>
        <Title level={4}>Сезоны и серии</Title>
        {isEmpty ? (
          <Text type="secondary">Нет информации об эпизодах</Text>
        ) : (
          <>
            <Text type="secondary">Всего сезонов: {seasons.length}</Text>

            <div className={styles.seriesList}>
              {episodeList.map((episode, index) => (
                <Text key={index}>
                  Эпизод {episode.number}, сезон {episode.seasonNumber} {episode.name}
                </Text>
              ))}
            </div>
          </>
        )}
      </div>

      {episodeList.length > 0 && (
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
      )}
    </div>
  )
}
