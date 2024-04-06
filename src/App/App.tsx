import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import { MainPage } from '../pages/Main/MainPage'
import { MoviePage } from '../pages/Movie/MoviePage'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="movie/:id" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  )
}
