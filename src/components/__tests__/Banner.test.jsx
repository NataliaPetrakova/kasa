import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Banner from '../Banner'

describe('Banner Component', () => {
  it('should render with image', () => {
    const testImage = '/test-image.jpg'
    render(<Banner image={testImage} />)
    
    const img = screen.getByAltText('Banner')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', testImage)
  })

  it('should render with text when provided', () => {
    render(<Banner image="/test.jpg" text="Welcome Home" />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Welcome Home')
  })

  it('should not render text when not provided', () => {
    render(<Banner image="/test.jpg" />)
    
    const heading = screen.queryByRole('heading', { level: 1 })
    expect(heading).not.toBeInTheDocument()
  })

  it('should render with both image and text', () => {
    const testImage = '/banner.jpg'
    const testText = 'Chez vous, partout et ailleurs'
    
    render(<Banner image={testImage} text={testText} />)
    
    expect(screen.getByAltText('Banner')).toHaveAttribute('src', testImage)
    expect(screen.getByText(testText)).toBeInTheDocument()
  })
})