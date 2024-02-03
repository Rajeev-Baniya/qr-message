import React, { useState, useRef } from 'react';
import './App.css';
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';

function App() {
  const elementRef = useRef(null);
  // console.log('elementRef', elementRef)

  const [name, setName] = useState("")
  const [message, setMessage] = useState('');
  const [showQr, setShowQr] = useState(false)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(name, message)
    if (name && message) {
      setShowQr(true)
    }

  }

  const reset = () => {
    setShowQr(false);
    setName("")
    setMessage("")
  }

  const handleMessageChange = (e: any) => {
    setShowQr(false)
    setMessage(e.target.value)

  }



  const htmlToImageConvert = () => {
    const idCon = document.getElementById("download")!
    toPng(idCon, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });


  };
  return (
    <>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit} >
          <h1 className='heading'>Create a QR message</h1>
          <div className='input'>
            <input type='text' value={name} placeholder='Enter your name' onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className='input'>
            <textarea value={message} placeholder="Type your message" cols={27} rows={5} onChange={handleMessageChange} required></textarea>
          </div>
          <div>
            <button className='button' type='submit'>Generate Qr</button>
            <button className='button reset' type='button' onClick={reset}>Reset</button>
          </div>
        </form>
        {
          showQr &&
          <div className='qr-container'>

            <div className='qr-div' ref={elementRef} id="download"
              style={{ background: "white", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <h3 className='heading_name' style={{ width: "100%" }}>A message from {name}</h3>
              <p className='scan_read'>Scan to read</p>
              <QRCode
                size={24}
                className='qr'
                value={message}
                viewBox={`0 0 256 256`}
              />
            </div>

            <div className='button-container'>
              <button className='button' onClick={htmlToImageConvert}>Download QR</button>
              <button className='button reset' type='button' onClick={reset}>Reset</button>
            </div>

          </div>
        }
      </div>
      <p className='copyright'>	&#169; Rajeev Baniya</p>
    </>
  );
}

export default App;
