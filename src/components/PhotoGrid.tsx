
import React, { useEffect, useRef, useState } from 'react';

const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const pollingref = useRef<any>(null)
  console.log("I am here");
  
  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.unsplash.com/photos/random?count=9', {
        headers: {
          Authorization: '76xrsap8NgwEC3oDg4P5ZK5zouyfGd1yRWCl2w5iI1ja3D6qpnZTcAdY', 
        },
      });
      const data = await response.json();
      if (data.photos) {
        console.log('abc called')
        setPhotos(data.photos.map((photo: any) => photo.src.small));
      } else {
        console.error('Unexpected API response:', data);
        setPhotos([]);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
      pollingref.current = setInterval(()=> {
        fetchPhotos()
      }, 3000)

    const shufflePhotos = () => {
      setPhotos((prevPhotos) => {
        const shuffledPhotos = [...prevPhotos];
        for (let i = shuffledPhotos.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledPhotos[i], shuffledPhotos[j]] = [shuffledPhotos[j], shuffledPhotos[i]];
        }
        console.log('Shuffled Photos:', shuffledPhotos); // Debugging: log the shuffled photos
        return shuffledPhotos;
      });
    };

    fetchPhotos();

    //const interval = setInterval(shufflePhotos, 10000);

    return () => clearInterval(pollingref.current);
  }, [pollingref.current]);

  return (
    <div className="photo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Random ${index}`} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
        ))
      )}
    </div>
  );
};

export default PhotoGrid;
