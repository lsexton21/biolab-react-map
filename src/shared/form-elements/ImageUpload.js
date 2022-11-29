import { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../../shared/form-elements/Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  library.add(faImagePortrait);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImgHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png,.heic"
        ref={filePickerRef}
        onChange={pickedHandler}
        //errorText={props.errorText}
      />
      <div className="image-upload centered">
        <div className="image-upload__preview">
          {previewUrl ? (
            <img
              style={{ border: "0.3rem solid #9ae07f" }}
              src={previewUrl}
              alt="Preview"
            />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-image-portrait"
              size="7x"
              style={{ color: "#9ae07fb9" }}
            />
          )}
        </div>
        <Button inverse type="button" onClick={pickImgHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
