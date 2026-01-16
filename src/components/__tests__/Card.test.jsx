import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Card from '../Card'

// Helper pour wrapper le composant avec Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Card Component', () => {
  const mockCard = {
    id: '123',
    title: 'Appartement cosy',
    cover: '/images/apartment.jpg'
  }

  it('should render with title', () => {
    renderWithRouter(<Card {...mockCard} />)
    
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Appartement cosy')
  })

  it('should render with cover image', () => {
    renderWithRouter(<Card {...mockCard} />)
    
    const img = screen.getByAltText('Appartement cosy')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/images/apartment.jpg')
  })

  it('should have correct link to logement page', () => {
    renderWithRouter(<Card {...mockCard} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/logement/123')
  })

  it('should render all props correctly', () => {
    renderWithRouter(<Card id="456" title="Maison spacieuse" cover="/house.jpg" />)
    
    expect(screen.getByText('Maison spacieuse')).toBeInTheDocument()
    expect(screen.getByAltText('Maison spacieuse')).toHaveAttribute('src', '/house.jpg')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/logement/456')
  })
})