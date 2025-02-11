import React, { useState } from "react";
import QRCode from "qrcode";
import "./index.css";

function QrGenerator() {
  const [darkMode, setDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [qrImageUrl, setQrImageUrl] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert("Enter a valid text or URL!");
      return;
    }

    try {
      const url = await QRCode.toDataURL(text, { width: size });
      setQrImageUrl(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQRCode = () => {
    if (!qrImageUrl) return;

    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = "QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`qr-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="qrcontainer">
        <div className="box">
          <div className="qr-header">
            <h1>Generate QR Code</h1>

            {/* Dark Mode Toggle Switch */}
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider round"></span>
            </label>
            <span className="mode-text">{darkMode ? "Dark Mode" : "Light Mode"}</span>

            <input
              type="text"
              placeholder="Type your text or URL"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div>
              <label>Select Size:</label>
              <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
                <option value={100}>100x100</option>
                <option value={200}>200x200</option>
                <option value={300}>300x300</option>
                <option value={400}>400x400</option>
              </select>
            </div>
          </div>
          <div className="qr-body">
            {qrImageUrl && <img src={qrImageUrl} alt="QR Code" />}
          </div>
          <div className="qr-footer">
            <button onClick={generateQRCode}>Generate</button>
            <button onClick={downloadQRCode} disabled={!qrImageUrl}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrGenerator;
