import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Translator.css';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('it');

  const handleTranslate = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        headers: {
          'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
          'x-rapidapi-key': '61b67c97c8msh5ae9831a348ae09p13e3d5jsn8b5a4f6dbec5',
          'Content-Type': 'application/json'
        },
        data: [
          {
            text: inputText
          }
        ],
        params: {
          'api-version': '3.0',
          from: sourceLanguage,
          to: targetLanguage
        }
      });

      setTranslatedText(response.data[0].translations[0].text);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="translator-container">
      <h2 className="translator-heading">Language Translator</h2>
      <textarea
        className="translator-textarea"
        rows="4"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
      ></textarea>
      <div className="translator-controls">
        <div className="translator-select">
          <label>Source Language:</label>
          <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        <div className="translator-select">
          <label>Target Language:</label>
          <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      </div>
      <button className="translator-button" onClick={handleTranslate}>Translate</button>
      <h3 className="translator-result-heading">Translated Text:</h3>
      <p className="translator-result">{translatedText}</p>   
    </div>
    </div>
  );
};

export default Translator;
