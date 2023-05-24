import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Recordinput from "./Recordinput";
import Recordoutput from "./Recordoutput";
import libreTranslateAPI from './libreTranslateAPI';
import UploadText from "./UploadText";
import React, { useEffect } from "react";


const languageMap = { //mapping dropdown list to match libretranslate API
    english: 'en',
    japanese: 'ja',
    french: 'fr',
    german: 'de',
};

export default function Homepage() {
    const [sourceLang, setSourceLang] = useState("english");
    const [outputLang, setOutputLang] = useState("english");
    const [input, setInput] = useState('');
    const [translation, setTranslation] = useState('');

    const handleTranslate = async (event) => {
        event.preventDefault(); // Stops the page from reloading after clicking the translate button

        console.log(`Translating from ${languageMap[sourceLang]} to ${languageMap[outputLang]}`); // Requesting the translation tool to translate our text
        console.log(`Text to translate: ${input}`);

        try { //Try and catch method to handle errors
            const response = await libreTranslateAPI.translateText(input, languageMap[sourceLang], languageMap[outputLang]);
            console.log('Translation response:', response.data);
            setTranslation(response.data.translatedText);
        } catch (error) {
            console.error('Failed to translate text:', error); //To catch the error
        }
    };

    // eslint-disable-next-line no-undef
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
          <UploadText setInput={ setInput } />
          <form onSubmit={handleTranslate} className="d-flex flex-column align-items-center">
              <Dropdown value={sourceLang} sourceLang={sourceLang} setSourceLang={setSourceLang} />
              <Recordinput input={input} setInput={setInput} />
              <button type="submit">Translate</button>
              <Dropdown value={outputLang} outputLang={outputLang} setOutputLang={setOutputLang} />
              <Recordoutput outputText={translation} />
          </form>
      </div>
  );
}
