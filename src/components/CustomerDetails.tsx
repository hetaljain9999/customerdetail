
import React, { useEffect, useState } from 'react';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface CustomerDetailsProps {
  customer: Customer;
}

function splitArrayBufferIntoBlobs(arrayBuffer: ArrayBuffer) { const blobs = []; let start = 0; const IMAGE_SIZE = 500 * 1024; while (start < arrayBuffer.byteLength) { const slice = arrayBuffer.slice(start, start + IMAGE_SIZE); blobs.push(new Blob([slice])); start += IMAGE_SIZE; } return blobs; }
const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  console.log('I am in customer details')
  useEffect(() => {
    const fetchPhotos = async () => {
    
      const response = await fetch('https://api.api-ninjas.com/v1/randomimage?count=9', {
        headers: {
          'X-Api-Key': 'M9xJ9i76AIG8qd4JUUrX4A==aFfwUkWCp2sOYR4h',
          'Accept': 'image/jpg' 
        },
      });

      const data = await response.arrayBuffer()
      
      const imagesBLob = splitArrayBufferIntoBlobs(data)
      const imagesURL = imagesBLob.map((blob) => URL.createObjectURL(blob))
      console.log('anyhting', imagesURL)

      setPhotos(imagesURL)
    };

    fetchPhotos();

    const intervalId = setInterval(fetchPhotos, 10000);

    return () => { clearInterval(intervalId)
      photos.forEach((myUrl)=>URL.revokeObjectURL(myUrl))
     };
  }, []);
  console.log(photos, 'photo callledd')
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{customer.name} details here</h2>
      <p style={{ textAlign: 'center' }}>{customer.address}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {[1, 2, 3, 4, 5, 6,7,8,9].map((url, index) => (
          <img key={index} src={photos[0]} alt="Customer" style={{ width: '100%', height: 'auto' }} />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
