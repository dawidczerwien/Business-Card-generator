import { useState, useEffect } from 'react';
import cardService from '../../services/card.service';
import QRCode from 'react-qr-code';

const Page2 = ({ setStep, slug }) => {
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
    const {name, email,company} = formData;

    const phone = sessionStorage.getItem('phone');
    
    cardService.saveClientContactInfo({phone: phone, name: name, email:email, company: company}).then((res) => {
    setStep(3);
    });
  };

  return (
    <>
      <div className='card-header'>Dziękuję!</div>
      <div className='card-content'>
        Za chwilę dostaniesz ode mnie SMS. Możesz podać jeszcze jak mam Cię
        zapisać?
        <div className='card-input'>
          <input
            placeholder='Twoje imię i nazwisko'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className='card-input'>
          <input
            placeholder='Adres email'
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className='card-input'>
          <input
            placeholder='Firma / miejsce kontaktu'
            type='text'
            name='company'
            value={formData.company}
            onChange={handleChange}
          ></input>
        </div>
        <div className='card-input'>
          <button onClick={submit} className='card-next'>
            DALEJ
          </button>
        </div>
        PS. Przejdź dalej to zobaczysz mema!
        <div className='card-input mt-3'>
          <button className='card-download'>
            POBIERZ WIZYTÓWKĘ
          </button>
        </div>
      </div>
    </>
  );
};

export default Page2;
