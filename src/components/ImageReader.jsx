import { useEffect, useState } from "react";
import Tesseract from 'tesseract.js';
import libreTranslateAPI from "./libreTranslateAPI";
import Recordinput from "./Recordinput";
import Recordoutput from "./Recordoutput";
import Dropdown from "./Dropdown";
import { libreLangMap, tessaractLangMap } from '../data/languageMaps';

export default function ImageReader() {
    const [inputString, setInputString] = useState("");
    const [outputString, setOutputString] = useState("")
    const [imageFile, setImageFile] = useState(null);
    const [sourceLang, setSourceLang] = useState("english");
    const [outputLang, setOutputLang] = useState("english");

    const handleFile = (e) => {
        console.log(e.target.files)
        setImageFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleImgSubmit = () => {
      if (imageFile) {
        (async () => {
          const worker = await Tesseract.createWorker();
          await worker.loadLanguage(tessaractLangMap[sourceLang]);
          await worker.initialize(tessaractLangMap[sourceLang]);
          const { data: { text } } = await worker.recognize(imageFile);
          setInputString(text);
          await worker.terminate();
        })();
      }
      else {
        alert("Please select a file.");
      }
    }

    const handleTranslate = async () => {
      console.log(`Translating from ${libreLangMap[sourceLang]} to ${libreLangMap[outputLang]}`); // Requesting the translation tool to translate our text
      console.log(`Text to translate: ${inputString}`);
  
      try { //Try and catch method to handle errors
          const response = await libreTranslateAPI.translateText(inputString, libreLangMap[sourceLang], libreLangMap[outputLang]);
          console.log('Translation response:', response.data);
          setOutputString(response.data.translatedText);
      } catch (error) {
          console.error('Failed to translate text:', error); //To catch the error
      }
    }
    
    const handleTxtSubmit = (e) => {
      e.preventDefault();
      handleTranslate();
    }

    useEffect(() => {
      handleTranslate();
    }, [inputString]);

  return (
    <div>
        <label htmlFor="image-upload">Select an image to upload</label>
        <input type="file" name="image-upload" onChange={ (e) => handleFile(e) } />
        <button onClick={ handleImgSubmit }>Upload</button>
        <Dropdown sourceLang={sourceLang} setSourceLang={setSourceLang} />
        <Recordinput input={inputString} setInput={setInputString} />
        <Dropdown outputLang={outputLang} setOutputLang={setOutputLang} />
        <Recordoutput outputText={outputString} />
        <button type="submit" onClick={handleTxtSubmit}>Translate</button>
    </div>
  )
}
