import { useState, useEffect } from 'react';
import cardService from '../../services/card.service';

const Page1 = ({ setStep, card }) => {
  const [phone, setPhone] = useState();
  
  const handleChange = (e) => {
    const { value } = e.target;
    setPhone(value)
  };

  useEffect(() => {
    sessionStorage.setItem('phone', phone);
  }, [phone]);

  const submit = () => {
    cardService.saveClientContactInfo({phone: phone}).then((res) => {
    setStep(2);
    });
  };

  return (
    <>
      <div className='card-header'>
        Cześć, tu {card.username}, z {card.company}
      </div>
      <div className='card-content'>
        Proszę, zostaw mi numer kontaktowy, a ja wyślę Ci moją wizytówkę.
        <div className='img-container'>
          <div className='round-image'>
            <img src='Designer.jpeg' alt='profile' />
          </div>
        </div>
        
        <div className='card-input'>
          <input
            placeholder='Numer telefonu'
            type='tel'
            name='phone'
            value={phone}
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

export default Page1;
