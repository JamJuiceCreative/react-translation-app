import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Recordinput from "./Recordinput";
import Recordoutput from "./Recordoutput";
import libreTranslateAPI from './libreTranslateAPI';
import UploadText from "./UploadText";
import { libreLangMap } from "../data/languageMaps";
import PreLoader1 from "./PreLoader1";


const languageMap = libreLangMap;

export default function Homepage() {
  const [sourceLang, setSourceLang] = useState("english");
  const [outputLang, setOutputLang] = useState("english");
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async (event) => {
    event.preventDefault();

    console.log(`Translating from ${languageMap[sourceLang]} to ${languageMap[outputLang]}`);
    console.log(`Text to translate: ${input}`);

    try {
      setIsLoading(true); // Start the loading state

      setTimeout(async () => {
        const response = await libreTranslateAPI.translateText(input, languageMap[sourceLang], languageMap[outputLang]);
        console.log('Translation response:', response.data);
        setTranslation(response.data.translatedText);
        setIsLoading(false); // Stop the loading state
      }, 2000);
    } catch (error) {
      console.error('Failed to translate text:', error);
      setIsLoading(false); // Stop the loading state
    }
  };

  useEffect(() => {
    const savedSourceLang = localStorage.getItem("sourceLang");
    const savedOutputLang = localStorage.getItem("outputLang");

    if (savedSourceLang) {
      setSourceLang(savedSourceLang);
    }

    if (savedOutputLang) {
      setOutputLang(savedOutputLang);
    }
  }, []);

  return (
    <div>
      <UploadText setInput={setInput} />
      <form onSubmit={handleTranslate} className="d-flex flex-column align-items-center">
        <Dropdown value={sourceLang} sourceLang={sourceLang} setSourceLang={setSourceLang} />
        <Recordinput input={input} setInput={setInput} />
        <button type="submit">Translate</button>
        <Dropdown value={outputLang} outputLang={outputLang} setOutputLang={setOutputLang} />
        {isLoading ? (
          <PreLoader1 /> // Show the loader while translating/ 2 second timeout function in PreLoader.js
        ) : (
          <Recordoutput outputText={translation} />
        )}
      </form>
    </div>
  );
}
