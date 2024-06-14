import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import queryString from 'query-string'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { Toaster } from 'sonner'

// import { MoviesListPage } from 'src/pages/MoviesListPage/MoviesListPage'
import { MoviesListPage } from 'src/pages/MoviesListPage/MoviesListPageRedesign'
import { MoviePage } from 'src/pages/MoviePage/MoviePage'

import './App.css'

const { parse, stringify } = queryString

export const App = () => {
  return (
    <>
      <Toaster closeButton expand={true} richColors />
      <BrowserRouter>
        <QueryParamProvider
          adapter={ReactRouter6Adapter}
          options={{
            searchStringToObject: parse,
            objectToSearchString: stringify,
          }}
        >
          <Routes>
            <Route path="/" element={<MoviesListPage />} />
            <Route path="movie/:id" element={<MoviePage />} />
          </Routes>
        </QueryParamProvider>
      </BrowserRouter>
    </>
  )
}
