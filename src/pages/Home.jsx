import Banner from '../components/Banner'
import Card from '../components/Card'
import useFetch from '../hooks/useFetch'
import bannerImage from '../assets/Banner_home.jpg'

function Home() {
  const { data: properties, loading, error } = useFetch('http://localhost:8080/api/properties')

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur : {error}</div>

  return (
    <div className="home">
      <Banner 
        image={bannerImage} 
        text="Chez vous, partout et ailleurs" 
      />
      <div className="properties-grid">
        {properties && properties.map((property) => (
          <Card 
            key={property.id}
            id={property.id}
            title={property.title}
            cover={property.cover}
          />
        ))}
      </div>
    </div>
  )
}

export default Home