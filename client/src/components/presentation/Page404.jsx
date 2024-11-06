import { useState, useEffect } from 'react';
import cardService from '../../services/card.service';
import QRCode from 'react-qr-code';

const Page404 = ({ setStep, slug }) => {
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
      .saveClientContactInfo({ phone: phone, date: date, topic: topic })
      .then((res) => {
        // setStep(2);
        alert('Hurra! Wysłano zapytanie');
      });
  };

  return (
    <>
      <div className='card-header'>Oops! 404 error</div>
      <div className='card-content'>
        The page you're looking for does not exist.
        <div className='card-input'>
          <button className='card-download'>REFRESH</button>
        </div>
        
      </div>
    </>
  );
};

export default Page404;
