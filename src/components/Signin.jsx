import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container } from 'e-react-ui/dist';

const SigninForm = (props) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('Joyful User');

  const sendMagicLink = e => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_APIURL}/login/email`,
    {destination: email, displayName: displayName},
      {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      props.setSent(true);
    })
    .catch(error => {
      console.log('error sending email', error)
    })
  }

  return (
    <Container>
      <form onSubmit={sendMagicLink}>
        <label htmlFor="email">Type your email to login/register</label>
        {' '}
        <input type="email"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="e.j.: you@example.com"
          aria-label="e-mail"
          />
        <Button type="submit" label="Get In!" primary />
        <label htmlFor="displayName">{`Display Name (optional) `}</label>
        <input type="text"
          name="displayName"
          id="displayName"
          value={displayName} placeholder="Joyful User"
          aria-label="Display Name"
          onChange={e => setDisplayName(e.target.value)} />
      </form>
    </Container>
  );
}

const EmailSent = (props) => {
  return (
    <div><h1>Email sent to: {props.email}</h1><p>check your inbox to get your login hyperlink</p></div>
  );
}

export default function SignIn(props) {
  const [sent, setSent] = useState(false);
  const [destination] = useState('');

  return (
    <div>
      {sent ?<EmailSent email={destination} /> : <SigninForm setSent={setSent} />}
    </div>
  );
}
