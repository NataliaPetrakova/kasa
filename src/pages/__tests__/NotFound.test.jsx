import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFound from '../NotFound'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('NotFound Page', () => {
  it('should render 404 title', () => {
    renderWithRouter(<NotFound />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('404')
  })

  it('should render error message', () => {
    renderWithRouter(<NotFound />)
    
    expect(screen.getByText("Oups! La page que vous demandez n'existe pas.")).toBeInTheDocument()
  })

  it('should render link to home page', () => {
    renderWithRouter(<NotFound />)
    
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent("Retourner sur la page d'accueil")
  })

  it('should have correct link href to home', () => {
    renderWithRouter(<NotFound />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/home')
  })

  it('should render all elements together', () => {
    renderWithRouter(<NotFound />)
    
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText("Oups! La page que vous demandez n'existe pas.")).toBeInTheDocument()
    expect(screen.getByText("Retourner sur la page d'accueil")).toBeInTheDocument()
  })
})