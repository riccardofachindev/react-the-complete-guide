import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import { useInput } from '../hooks/useInput'

export default function Login() {
  const {
    value: emailValue,
    valueChangeHandler: emailChangeHandler,
    valueOnBlurHandler: emailOnBlurHandler,
    isInvalid: emailIsInvalid
  } = useInput('', (value) => !isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    valueChangeHandler: passwordChangeHandler,
    valueOnBlurHandler: passwordOnBlurHandler,
    isInvalid: passwordIsInvalid
  } = useInput('', (value) => !hasMinLength(value.trim(), 6));

  const loginClickHandler = (event) => {
    event.preventDefault();

    if (emailIsInvalid || passwordIsInvalid) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={loginClickHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          error={emailIsInvalid && 'Please insert a valid email.'}
          type="email"
          name="email"
          onBlur={emailOnBlurHandler}
          onChange={emailChangeHandler}
          value={emailValue}
        />

        <Input
          label="Password"
          id="password"
          error={passwordIsInvalid && 'Please insert a valid password. It needs more than 6 characters'}
          type="password"
          name="password"
          onBlur={passwordOnBlurHandler}
          onChange={passwordChangeHandler}
          value={passwordValue}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
