import { useState, useEffect } from 'react';
import cardService from '../../services/card.service';
import QRCode from 'react-qr-code';

const Page3 = ({ setStep, slug }) => {
  const [formData, setFormData] = useState({});
  const [url, setUrl] = useState(window.location.origin + '/' + slug);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = () => {
    const { date, topic } = formData;

    const phone = sessionStorage.getItem('phone');

    cardService
      .saveClientContactInfo({ phone:phone, date: date, topic: topic })
      .then((res) => {
        setStep(4);
      });
  };

  return (
    <>
      <div className='card-header'>Aaa... i jeszcze jedno</div>
      <div className='card-content'>
        Jeśli chciałbyś żebym zadzwonił konkretnego dnia, godzinie lub w temacie
        to napisz! Dzięki!
        <div className='card-input'>
          <input
            placeholder='Data'
            type='datetime-local'
            name='date'
            value={formData.date}
            onChange={handleChange}
          ></input>
        </div>
        <div className='card-input'>
          <textarea
            placeholder='Temat'
            name='topic'
            value={formData.topic}
            onChange={handleChange}
            style={{ height: '100px' }}
          ></textarea>
        </div>
        <div className='card-input'>
          <button onClick={submit} className='card-next'>
            WYŚLIJ
          </button>
        </div>
        Teraz już na pewno będzie mem :)!
        
      </div>
    </>
  );
};

export default Page3;
