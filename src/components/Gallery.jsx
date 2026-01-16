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
            <svg width="96" height="120" viewBox="0 0 96 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_488802_94)">
                <path d="M70.04 15.4799L62.92 8.3999L23.36 47.9999L62.96 87.5999L70.04 80.5199L37.52 47.9999L70.04 15.4799Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_488802_94">
                  <rect width="96" height="119.64" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          
          <button className="gallery-arrow gallery-arrow-right" onClick={goToNext}>
            <svg width="96" height="120" viewBox="0 0 96 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_488802_99)">
                <path d="M25.96 80.5199L33.04 87.5999L72.64 47.9999L33.04 8.3999L25.96 15.4799L58.48 47.9999L25.96 80.5199Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_488802_99">
                  <rect width="96" height="119.64" fill="white"/>
                </clipPath>
              </defs>
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