import { useState } from 'react'

function Gallery({ pictures }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
    )
  }

  const showNavigation = pictures.length > 1

  return (
    <div className="gallery">
      <img src={pictures[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      
      {showNavigation && (
        <>
          <button className="gallery-arrow gallery-arrow-left" onClick={goToPrevious}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <button className="gallery-arrow gallery-arrow-right" onClick={goToNext}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
          
          <div className="gallery-counter">
            {currentIndex + 1}/{pictures.length}
          </div>
        </>
      )}
    </div>
  )
}

export default Gallery