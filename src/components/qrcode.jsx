import React, { useState } from 'react';

const QRGenerator = ({objectId,objectName}) => {
  
  const siteUrl="unclaimed.vercel.app"
  const [imageUrl, setImageUrl] = useState(null);
  const data=siteUrl+"/objects/"+objectId;

  fetch("https://lemondrop47.pythonanywhere.com/generate_qr_code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data: data, object_name: objectName})
    })
    .then(response => response.json())
    .then(response => {
        // console.log(response);
      const img = `data:image/png;base64,${response.image}`;
      setImageUrl(img);
    })
    .catch(error => console.error(error));
    
  const handleDownload = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${objectName}.png`;
    document.body.appendChild(link);
    link.click();
  };
return (
    <div align="left">
      {imageUrl && <img src={imageUrl} id="qc" alt="QR Code" />}
      <br/>
      <div className="btn-qr" >
        {/* <form onSubmit={handleSubmit}>
          <button type="submit" className="btn-land" id="sign">Generate QR Code</button>
        </form> */}
        <button  onClick={handleDownload} className="btn-land" id="sign">Download QR Code</button>
      </div>
    </div>
  );
};

export default QRGenerator;