import React, { useState, useEffect } from 'react';
import './App.css';

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');

  // Handle text change in the textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Calculate the statistics (word count and character count) as text changes
  useEffect(() => {
    const words = text.toLowerCase().match(/\b(\w+)\b/g);
    const uniqueWords = new Set(words);
    setUniqueWordCount(uniqueWords.size || 0);

    const chars = text.replace(/[^a-zA-Z0-9]/g, '');
    setCharCount(chars.length);
  }, [text]);

  // Handle the string replacement
  const handleReplaceAll = () => {
    const regex = new RegExp(searchString, 'gi');
    const newText = text.replace(regex, replaceString);
    setText(newText);
  };

  return (
    <div className="text-analyzer-container">
      <h2 className="heading">Real-Time Text Analysis</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
        className="textarea"
      />
      <div className="stats">
        <p>Unique Word Count: {uniqueWordCount}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {charCount}</p>
      </div>
      <div className="replace-section">
        <input
          type="text"
          placeholder="Search String"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Replace With"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          className="input"
        />
        <button onClick={handleReplaceAll} className="button">
          Replace All
        </button>
      </div>
    </div>
  );
};

export default TextAnalyzer;
