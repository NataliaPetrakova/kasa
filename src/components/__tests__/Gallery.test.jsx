import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Gallery from '../Gallery'

describe('Gallery Component', () => {
  const multiplePictures = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg'
  ]

  const singlePicture = ['/single-image.jpg']

  it('should render the first image by default', () => {
    render(<Gallery pictures={multiplePictures} />)
    
    const img = screen.getByAltText('Slide 1')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/image1.jpg')
  })

  it('should show navigation buttons when multiple pictures', () => {
    render(<Gallery pictures={multiplePictures} />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(screen.getByText('1/3')).toBeInTheDocument()
  })

  it('should not show navigation when only one picture', () => {
    render(<Gallery pictures={singlePicture} />)
    
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
    expect(screen.queryByText(/\//)).not.toBeInTheDocument()
  })

  it('should navigate to next image when clicking next button', async () => {
    const user = userEvent.setup()
    render(<Gallery pictures={multiplePictures} />)
    
    const buttons = screen.getAllByRole('button')
    const nextButton = buttons[1] // Le bouton de droite
    
    await user.click(nextButton)
    
    const img = screen.getByAltText('Slide 2')
    expect(img).toHaveAttribute('src', '/image2.jpg')
    expect(screen.getByText('2/3')).toBeInTheDocument()
  })

  it('should navigate to previous image when clicking previous button', async () => {
    const user = userEvent.setup()
    render(<Gallery pictures={multiplePictures} />)
    
    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0] // Le bouton de gauche
    
    await user.click(prevButton)
    
    // Devrait aller à la dernière image (comportement circulaire)
    const img = screen.getByAltText('Slide 3')
    expect(img).toHaveAttribute('src', '/image3.jpg')
    expect(screen.getByText('3/3')).toBeInTheDocument()
  })

  it('should loop to first image after last image', async () => {
    const user = userEvent.setup()
    render(<Gallery pictures={multiplePictures} />)
    
    const buttons = screen.getAllByRole('button')
    const nextButton = buttons[1]
    
    // Cliquer 3 fois pour faire le tour complet
    await user.click(nextButton)
    await user.click(nextButton)
    await user.click(nextButton)
    
    // Devrait revenir à la première image
    const img = screen.getByAltText('Slide 1')
    expect(img).toHaveAttribute('src', '/image1.jpg')
    expect(screen.getByText('1/3')).toBeInTheDocument()
  })
})