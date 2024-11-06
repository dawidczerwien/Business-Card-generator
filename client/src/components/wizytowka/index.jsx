import { useState, useEffect } from 'react';
import './wizytowka.css'

import Config from './Config';
import Result from './Result';

const Page = () => {
  const [step, setStep] = useState(1);
  const [slug, setSlug] = useState(window.location.pathname.substring(1));

  return (
    <div className='business-card-container'>
      <div className='business-card'>
        {step === 1 && <Config setStep={setStep} setSlug={setSlug} />}
        {step === 2 && <Result setStep={setStep} slug={slug} />}
      </div>
    </div>
  );
};




export default Page;
