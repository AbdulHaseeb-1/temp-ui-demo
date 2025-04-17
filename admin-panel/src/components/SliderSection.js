import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleImageSlider from 'react-simple-image-slider';

function SliderSection() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/slider/images')
      .then(res => {
        const imageUrls = res.data.map(filename => ({
          url: `http://localhost:5000/slider/${filename}`
        }));
        setImages(imageUrls);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      position: 'relative',
      
      width: '100%',         // ✅ Responsive width
      maxWidth: '100vw',      // ✅ Prevent overflow
      height: '543px',
      overflow: 'hidden',
      opacity: 0.87
    }}>
      {images.length > 0 && (
        <SimpleImageSlider
          width={'100%'}         // ✅ Responsive slider width
          height={543}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={3}
          style={{ objectFit: 'contain' }} // ✅ Shows full image
        />
      )}
    </div>
  );
}

export default SliderSection;
