import { useState, useEffect } from 'react';
import cardService from '../../services/card.service';

const Config = ({ setStep, setSlug }) => {
    const [formData, setFormData] = useState(() => {
      const savedData = sessionStorage.getItem('formData');
      return savedData
        ? JSON.parse(savedData)
        : { name: '', company: '', phone: '', email: '', vcardAddress: '' };
    });
  
    // Effect to update session storage whenever formData changes
    useEffect(() => {
      sessionStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const submit = () => {
      cardService.createBusinessCard(formData).then((res) => {
        setSlug(res.data.slug);
        setStep(2);
      });
    };
  
    return (  
      <>
        <div className='card-header'>Wpisz dane by wygenerować QR i URL</div>
        <div className='card-content'>
          Konfig wizytówki
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
              placeholder='Nazwa firmy'
              type='text'
              name='company'
              value={formData.company}
              onChange={handleChange}
            ></input>
          </div>
          <div className='card-input'>
            <input
              placeholder='Numer telefonu'
              type='tel'
              name='phone'
              value={formData.phone}
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
            <input disabled placeholder='Zdjęcie (najlepiej kwadrat)'></input>
          </div>
          <div className='card-input'>
            <input
              placeholder='Adres vcard'
              type='text'
              name='vcardAddress'
              value={formData.vcardAddress}
              onChange={handleChange}
            ></input>
          </div>
          <div className='card-input'>
            <button onClick={submit} className='card-next'>
              DALEJ
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default Config