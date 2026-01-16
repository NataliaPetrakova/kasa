import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

// Helper pour wrapper avec Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Header Component', () => {
  it('should render the header', () => {
    renderWithRouter(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('should render the Kasa logo', () => {
    renderWithRouter(<Header />)
    
    const logo = screen.getByAltText('Kasa')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass('logo')
  })

  it('should render navigation with two links', () => {
    renderWithRouter(<Header />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2) 
  })

  it('should render Accueil link with correct href', () => {
    renderWithRouter(<Header />)
    
    const accueilLink = screen.getByText('Accueil')
    expect(accueilLink).toBeInTheDocument()
    expect(accueilLink).toHaveAttribute('href', '/')
  })

  it('should render A Propos link with correct href', () => {
    renderWithRouter(<Header />)
    
    const aproposLink = screen.getByText('A Propos')
    expect(aproposLink).toBeInTheDocument()
    expect(aproposLink).toHaveAttribute('href', '/a-propos')
  })

  it('should render logo and navigation together', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByAltText('Kasa')).toBeInTheDocument()
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('A Propos')).toBeInTheDocument()
  })
})