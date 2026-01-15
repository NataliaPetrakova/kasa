function Star({ filled }) {
  return (
    <svg 
      width="36" 
      height="36" 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`star ${filled ? 'filled' : ''}`}
    >
      <path 
        d="M18 2L22.163 13.847H34.511L24.674 21.306L28.837 33.153L18 25.694L7.163 33.153L11.326 21.306L1.489 13.847H13.837L18 2Z" 
        fill={filled ? '#FF6060' : '#E3E3E3'}
      />
    </svg>
  )
}

export default Star