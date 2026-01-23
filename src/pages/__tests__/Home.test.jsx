import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'

// Mock du hook useFetch
vi.mock('../../hooks/useFetch')
import useFetch from '../../hooks/useFetch'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display loading state', () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    })

    renderWithRouter(<Home />)
    
    expect(screen.getByText('Chargement...')).toBeInTheDocument()
  })

  it('should redirect to 404 when API fails', () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Erreur de connexion',
    })

    renderWithRouter(<Home />)
    
    // Vérifie que le contenu normal (banner, grid) n'est pas affiché
    expect(screen.queryByText('Chez vous, partout et ailleurs')).not.toBeInTheDocument()
    expect(screen.queryByRole('img', { name: /banner/i })).not.toBeInTheDocument()
  })

  it('should render banner with correct text', () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    })

    renderWithRouter(<Home />)
    
    expect(screen.getByText('Chez vous, partout et ailleurs')).toBeInTheDocument()
  })

  it('should render properties grid with cards from API', () => {
    const mockProperties = [
      { id: '1', title: 'Appartement cosy', cover: '/cover1.jpg' },
      { id: '2', title: 'Maison spacieuse', cover: '/cover2.jpg' },
      { id: '3', title: 'Studio moderne', cover: '/cover3.jpg' },
    ]

    useFetch.mockReturnValue({
      data: mockProperties,
      loading: false,
      error: null,
    })

    renderWithRouter(<Home />)
    
    expect(screen.getByText('Appartement cosy')).toBeInTheDocument()
    expect(screen.getByText('Maison spacieuse')).toBeInTheDocument()
    expect(screen.getByText('Studio moderne')).toBeInTheDocument()
  })

  it('should render cards with correct links', () => {
    const mockProperties = [
      { id: '1', title: 'Appartement cosy', cover: '/cover1.jpg' },
      { id: '2', title: 'Maison spacieuse', cover: '/cover2.jpg' },
    ]

    useFetch.mockReturnValue({
      data: mockProperties,
      loading: false,
      error: null,
    })

    renderWithRouter(<Home />)
    
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/logement/1')
    expect(links[1]).toHaveAttribute('href', '/logement/2')
  })

  it('should call useFetch with correct API URL', () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    })

    renderWithRouter(<Home />)
    
    expect(useFetch).toHaveBeenCalledWith('http://localhost:8080/api/properties')
  })

  it('should render empty grid when no properties', () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    })

    const { container } = renderWithRouter(<Home />)
    
    const grid = container.querySelector('.properties-grid')
    expect(grid).toBeInTheDocument()
    expect(grid.children).toHaveLength(0)
  })
})