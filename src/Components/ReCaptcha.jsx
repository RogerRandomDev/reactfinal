import React, { useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha"
const ReCaptcha=() => {
  const captchaRef = useRef(null)
  return (
    <div className="App">
      Hi!
      <ReCAPTCHA sitekey="6LdIDrciAAAAABglwOoli0l8DE0LTwbGMk9L8d3L" />
      
    </div>
  );
}
//ReCaptcha: site key = 6LdIDrciAAAAABglwOoli0l8DE0LTwbGMk9L8d3L
//ReCaptcha: secret key = 6LdIDrciAAAAAIPsU1qf3us_mVslPO8bxOOHQNyv
export default ReCaptcha