import { useState, useEffect } from 'react';
import cardService from '../../services/card.service';

import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page404 from './Page404';

const Page = () => {
  const [step, setStep] = useState(1);
  const [slug, setSlug] = useState(window.location.pathname.substring(1));
  const [card, setCard] = useState({});

  useEffect(()=>{
    cardService.getBusinessCard(slug).then(res => {
      setCard(res.data)
    }).catch(err => {
      setStep(0)
    })
  },[slug])

  return (
    <div className='business-card-container'>
      <div className='business-card'>
      {step === 0 && <Page404 setStep={setStep} slug={slug} />}

        {step === 1 && <Page1 setStep={setStep} setSlug={setSlug} card={card} />}
        {step === 2 && <Page2 setStep={setStep} slug={slug} />}
        {step === 3 && <Page3 setStep={setStep} slug={slug} />}
        {step === 4 && <Page4 setStep={setStep} slug={slug} />}
      </div>
    </div>
  );
};




export default Page;
