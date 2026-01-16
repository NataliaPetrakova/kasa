import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer Component', () => {
  it('should render the footer', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should render the Kasa logo', () => {
    render(<Footer />)
    
    const logo = screen.getByAltText('Kasa')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass('footer-logo')
  })

  it('should render copyright text', () => {
    render(<Footer />)
    
    const copyright = screen.getByText('© 2020 Kasa. All rights reserved')
    expect(copyright).toBeInTheDocument()
  })

  it('should render logo and copyright together', () => {
    render(<Footer />)
    
    expect(screen.getByAltText('Kasa')).toBeInTheDocument()
    expect(screen.getByText(/2020 Kasa/i)).toBeInTheDocument()
  })
})