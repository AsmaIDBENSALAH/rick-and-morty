import React, { useState, useEffect } from 'react'
import { fetchCharacters } from '../Api.js'
import CharacterCard from '../components/CharacterCard'
import Filter from '../components/Filter'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar.jsx'
import { Grid, Container, Typography } from '@mui/material'

const CharacterList = () => {
  const [characters, setCharacters] = useState([])
  const [info, setInfo] = useState({})
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true)
      try {
        const data = await fetchCharacters(page, filters, searchTerm)
        setCharacters(data.results)
        setInfo(data.info)
      } catch (error) {
        console.error('Error fetching characters:', error)
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [page, filters, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
    setPage(1)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        
        <SearchBar onSearch={handleSearch} />
        <Filter onFilterChange={handleFilterChange} />

        {loading ? (
          <Typography>Loading...</Typography>
        ) : characters.length === 0 ? (
          <Typography>No characters found</Typography>
        ) : (
          <>
            <Grid container spacing={3} justifyContent="center">  {/* Ajout de justifyContent="center" */}
  {characters.map((character) => (
    <Grid item key={character.id} xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="center">
                  <CharacterCard
                    character={character}
                    
                  />
                </Grid>
              ))}
            </Grid>

            <Pagination
              currentPage={page}
              totalPages={info.pages}
              onPageChange={setPage}
            />
          </>
        )}
      </Container>
    </div>
  )
}

export default CharacterList