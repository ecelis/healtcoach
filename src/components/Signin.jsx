import React, { useState } from 'react';
import axios from 'axios';

const SigninForm = (props) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('Joyful User');

  const sendMagicLink = e => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_APIURL}/login/email`,
    {destination: email, displayName: displayName},
      {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      console.log(res);
      props.setSent(true);
    })
    .catch(error => {
      console.log('error sending email', error)
    })
  }

  return (
    <form onSubmit={sendMagicLink}>
      <p>Type your email to login/register</p>
      <div>
      <input type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="e.j.: you@example.com"
        aria-label="e-mail"
        /></div>
        <div>
      <button type="submit">Get In!</button></div>
        <div><p>Display Name (optional)</p><input type="text"
        value={displayName} placeholder="Joyful User"
        aria-label="Display Name"
        onChange={e => setDisplayName(e.target.value)} /></div>
    </form>
  );
}

const EmailSent = (props) => {
  return (
    <div><h1>Email sent to: {props.email}</h1><p>check your inbox to get your login hyperlink</p></div>
  );
}

export default function SignIn(props) {
  const [sent, setSent] = useState(false);
  const [destination, setDetination] = useState('');

  return (
    <div>
      {sent ?<EmailSent email={destination} /> : <SigninForm setSent={setSent} />}
    </div>
  );
}
