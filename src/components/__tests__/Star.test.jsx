import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Star from '../Star'

describe('Star Component', () => {
  it('should render a star svg', () => {
    const { container } = render(<Star filled={false} />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('star')
  })

  it('should render a filled star with red color', () => {
    const { container } = render(<Star filled={true} />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('star')
    expect(svg).toHaveClass('filled')
    
    const path = container.querySelector('path')
    expect(path).toHaveAttribute('fill', '#FF6060')
  })

  it('should render an empty star with grey color', () => {
    const { container } = render(<Star filled={false} />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('star')
    expect(svg).not.toHaveClass('filled')
    
    const path = container.querySelector('path')
    expect(path).toHaveAttribute('fill', '#E3E3E3')
  })

  it('should have correct SVG dimensions', () => {
    const { container } = render(<Star filled={true} />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '36')
    expect(svg).toHaveAttribute('height', '36')
    expect(svg).toHaveAttribute('viewBox', '0 0 36 36')
  })

  it('should render different stars based on filled prop', () => {
    const { container: filledContainer } = render(<Star filled={true} />)
    const { container: emptyContainer } = render(<Star filled={false} />)
    
    const filledPath = filledContainer.querySelector('path')
    const emptyPath = emptyContainer.querySelector('path')
    
    expect(filledPath).toHaveAttribute('fill', '#FF6060')
    expect(emptyPath).toHaveAttribute('fill', '#E3E3E3')
  })
})