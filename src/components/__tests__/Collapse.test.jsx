import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Collapse from '../Collapse'

describe('Collapse Component', () => {
  it('should render with title', () => {
    render(<Collapse title="Test Title" content="Test content" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should be closed by default', () => {
    render(<Collapse title="Test Title" content="Test content" />)
    expect(screen.queryByText('Test content')).not.toBeInTheDocument()
  })

  it('should open when clicked', () => {
    render(<Collapse title="Test Title" content="Test content" />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should close when clicked twice', () => {
    render(<Collapse title="Test Title" content="Test content" />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(screen.queryByText('Test content')).not.toBeInTheDocument()
  })
})