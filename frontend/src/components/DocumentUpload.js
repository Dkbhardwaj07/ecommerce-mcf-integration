import React, { useState } from "react";

function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Handle upload action
    if (selectedFile) {
      console.log("File uploaded:", selectedFile.name);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default DocumentUpload;
