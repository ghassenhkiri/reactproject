import React, { useState } from 'react';
import axios from 'axios';
import image from './1.jpg';

const MangaTranslator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [translatedPage, setTranslatedPage] = useState('');
  const apiKey = 'af0a04f33amsh315ffdb986c6937p1f5b92jsna215fa7dfb1d';
  const sourceLanguage = 'en';
  const targetLanguage = 'fr';

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleTranslateClick = async () => {
    if (!selectedImage) {
      console.log('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('https://mangapi3.p.rapidapi.com/api/translate', formData, {
        headers: {
          'x-rapidapi-host': 'mangapi3.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        params: {
          sourceLanguage,
          targetLanguage,
        },
      });

      const translatedContent = response.data.translatedContent;
      setTranslatedPage(translatedContent);
    } catch (error) {
      console.error('Error translating manga page:', error);
    }
  };

  return (
    <div>
      <button onClick={handleTranslateClick}>Translate Manga Page</button>
      {translatedPage && <div>{translatedPage}</div>}
      <img src={image} alt="Manga" />

      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};



export default MangaTranslator;
