import { Routes, Route } from 'react-router-dom'
import CharacterDetails from './pages/CharacterDetails'
import CharacterList from './pages/CharacterList'
import Favorites from './pages/Favorites'
import { FavoritesProvider } from './context/FavoritesContext'
import Navbar from './components/Navbar'


export default function App() {
  return (
    
      <FavoritesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </FavoritesProvider>
    
  )
}
