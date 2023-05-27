import { useState } from "react";
import Tesseract from 'tesseract.js';
import libreTranslateAPI from "./libreTranslateAPI";
import Recordinput from "./Recordinput";
import Recordoutput from "./Recordoutput";
import Dropdown from "./Dropdown";
import { libreLangMap, tessaractLangMap } from '../data/languageMaps';
import PreLoader1 from "./PreLoader1";

export default function ImageReader() {
  const [inputString, setInputString] = useState("");
  const [outputString, setOutputString] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [sourceLang, setSourceLang] = useState("english");
  const [outputLang, setOutputLang] = useState("english");
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (e) => {
    console.log(e.target.files);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

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
    } else {
      alert("Please select a file.");
    }
  };

  const handleTranslate = async () => {
    console.log(`Translating from ${libreLangMap[sourceLang]} to ${libreLangMap[outputLang]}`);
    console.log(`Text to translate: ${inputString}`);

    try {
      setIsLoading(true); // Start the loading state
      const response = await libreTranslateAPI.translateText(
        inputString,
        libreLangMap[sourceLang],
        libreLangMap[outputLang]
      );
      console.log('Translation response:', response.data);
      setOutputString(response.data.translatedText);
    } catch (error) {
      console.error('Failed to translate text:', error);
    } finally {
      setIsLoading(false); // Stop the loading state
    }
  };

  const handleTxtSubmit = (e) => {
    e.preventDefault();
    handleTranslate();
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center align-items-center mb-4">
        <div className="col-md-6 mb-3 text-center">
          <label htmlFor="image-upload">Select an image to upload</label>
          <input type="file" name="image-upload" onChange={(e) => handleFile(e)} />
        </div>
        <div className="col-md-6 mb-3 text-center">
          <button onClick={handleImgSubmit} className="btn btn-primary">Upload</button>
        </div>
      </div>
      <div className="row justify-content-between align-items-stretch">
        <div className="col-md-6 mb-3">
          <div className="d-flex flex-column align-items-center">
            <Dropdown sourceLang={sourceLang} setSourceLang={setSourceLang} />
            <Recordinput input={inputString} setInput={setInputString} />
            <button type="submit" onClick={handleTxtSubmit} className="btn btn-primary m-1">Translate</button>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-flex flex-column align-items-center">
            <Dropdown outputLang={outputLang} setOutputLang={setOutputLang} />
            {isLoading ? (
              <PreLoader1 /> // Show the loader while translating
            ) : (
              <Recordoutput outputText={outputString} />
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
  

}