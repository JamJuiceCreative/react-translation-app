import React, { useEffect } from "react";


export default function Dropdown(props) {
  const menuType = props.sourceLang ? "source-lang" : "output-lang";

  const languageSelect = (event) => {
    const selectedLanguage = event.target.value;
    if (props.setSourceLang) {
      props.setSourceLang(selectedLanguage);
      console.log(`Source language set to ${selectedLanguage}`);
      localStorage.setItem("sourceLang", selectedLanguage);
    } else if (props.setOutputLang) {
      props.setOutputLang(selectedLanguage);
      console.log(`Output language set to ${selectedLanguage}`);
      localStorage.setItem("outputLang", selectedLanguage);
    } else {
      console.log("Language dropdown could not detect if it is source or output.");
    }
  };

  useEffect(() => {
    const savedSourceLang = localStorage.getItem("sourceLang");
    const savedOutputLang = localStorage.getItem("outputLang");

    if (props.setSourceLang && savedSourceLang) {
      props.setSourceLang(savedSourceLang);
    }

    if (props.setOutputLang && savedOutputLang) {
      props.setOutputLang(savedOutputLang);
    }
  }, [props.setSourceLang, props.setOutputLang]);

  return (
    <div>
      <label htmlFor={menuType}>Language:</label>
      <select
        name={menuType}
        onChange={(e) => languageSelect(e)}
        value={props.sourceLang || props.outputLang}
      >
          <option value="english">English</option>
          <option value="arabic">Arabic</option>
          <option value="azerbaijani">Azerbaijani</option>
          <option value="catalan">Catalan</option>
          <option value="chinese">Chinese</option>
          <option value="czech">Czech</option>
          <option value="danish">Danish</option>
          <option value="dutch">Dutch</option>
          <option value="esperanto">Esperanto</option>
          <option value="finnish">Finnish</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="greek">Greek</option>
          <option value="hebrew">Hebrew</option>
          <option value="hindi">Hindi</option>
          <option value="hungarian">Hungarian</option>
          <option value="indonesian">Indonesian</option>
          <option value="irish">Irish</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
          <option value="korean">Korean</option>
          <option value="persian">Persian</option>
          <option value="polish">Polish</option>
          <option value="portuguese">Portuguese</option>
          <option value="russian">Russian</option>
          <option value="slovak">Slovak</option>
          <option value="spanish">Spanish</option>
          <option value="swedish">Swedish</option>
          <option value="turkish">Turkish</option>
          <option value="ukrainian">Ukrainian</option>
          <option value="auto">Auto Detect</option>
        </select>
      </div>
    );
  }
  