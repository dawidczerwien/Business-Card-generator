import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const Result = ({ setStep, slug }) => {
  const [url, setUrl] = useState(window.location.origin + '/' + slug);
  return (
    <>
      <div className='card-header'>Oto Twoje dane</div>
      <div className='card-content'>
        <div>
          Kod QR -{' '}
          <span style={{ color: 'blue', textDecoration: 'underline' }}>
            pobierz
          </span>
        </div>
        <div className='qr-code'>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={url}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className='card-input'>
          <input
            placeholder='Nazwa firmy'
            type='text'
            value={url}
            onChange={(value) => setUrl(value.target.value)}
            disabled
          ></input>
        </div>

        {/* <div className='card-input'>
          <button onClick={() => setStep(1)} className='card-next'>
            WSTECZ
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Result;
