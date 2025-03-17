import { useRef, useState } from 'react'

export default function Login() {
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginClickHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    console.log(enteredEmail, enteredPassword);

    if (!enteredEmail.includes('@')) {
      setIsEmailValid(false);
      return;
    }

    setIsEmailValid(true);

    console.log('Sending HTTP call...')
  }

  return (
    <form onSubmit={loginClickHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            ref={emailRef}
          />
          {!isEmailValid && <div className="control-error">Use a valid email address</div>}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={passwordRef}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
