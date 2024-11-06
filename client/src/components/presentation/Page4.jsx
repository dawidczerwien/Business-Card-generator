import { useState, useEffect } from 'react';
import cardService from '../../services/card.service';
import QRCode from 'react-qr-code';

const Page4 = ({ setStep, slug }) => {
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
        // setStep(2);
        alert("Hurra! Wysłano zapytanie")
      });
  };

  return (
    <>
      <div className='card-header'>W kontakcie!</div>
      <div className='card-content'>
      Dzięki za przekazanie kontaktu, mój otrzymasz 
      do 5 minut. Do usłyszenia!
        <div>
          <img width='100%' src='meme.jpg'/>
        </div>
        Tak, to ten mem! Jest ok?
        <div className='card-input'>
          <button className='card-next'>
            OK
          </button>
        </div>
        <div className='card-input'>
          <button className='card-download'>
            NIE OK
          </button>
        </div>
        
      </div>
    </>
  );
};

export default Page4;
