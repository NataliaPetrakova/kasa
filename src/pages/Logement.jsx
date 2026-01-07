import { useParams, Navigate } from 'react-router-dom'
import Gallery from '../components/Gallery'
import Collapse from '../components/Collapse'
import useFetch from '../hooks/useFetch'

function Logement() {
  const { id } = useParams()
  const { data: properties, loading, error } = useFetch('http://localhost:8080/api/properties')

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur : {error}</div>

  // Trouve le logement avec l'ID correspondant
  const property = properties?.find(p => p.id === id)

  // Si le logement n'existe pas, redirige vers la page 404
  if (!property) {
    return <Navigate to="/404" replace />
  }

  return (
    <div className="logement">
      <Gallery pictures={property.pictures} />
      
      <div className="logement-header">
        <div className="logement-info">
          <h1>{property.title}</h1>
          <p className="logement-location">{property.location}</p>
          <div className="logement-tags">
            {property.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        
        <div className="logement-host">
          <div className="host-info">
            <span className="host-name">{property.host.name}</span>
            <img src={property.host.picture} alt={property.host.name} />
          </div>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < property.rating ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="logement-details">
        <Collapse title="Description" content={property.description} />
        <Collapse title="Équipements" content={property.equipments.join(', ')} />
      </div>
    </div>
  )
}

export default Logement