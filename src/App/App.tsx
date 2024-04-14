import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

import { MoviesListPage } from 'src/pages/MoviesListPage/MoviesListPage'
import { MoviePage } from 'src/pages/MoviePage/MoviePage'

import './App.css'

export const App = () => {
  return (
    <>
      <Toaster closeButton expand={true} richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesListPage />} />
          <Route path="movie/:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
