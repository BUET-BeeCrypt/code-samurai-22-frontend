import { useRef } from "react";
import { login } from "../api";

export default function Login() {

    const usernameRef = useRef();
    const passwordRef = useRef();

    return (<form className="form-signin" style={{width: '400px', margin: 'auto'}} onSubmit={ e => {e.preventDefault()}}>
    <h1 className="h3 mb-4 font-weight-normal">Log-in</h1>
    <label for="inputEmail" className="sr-only  mt-2">Username</label>
    <input ref={usernameRef} type="text" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
    <label for="inputPassword" className="sr-only mt-4">Password</label>
    <input ref={passwordRef} type="password" id="inputPassword" className="form-control mb-4" placeholder="Password" required />
    <button className="btn btn-lg btn-primary btn-block" onClick={e => {
        e.preventDefault();
        console.log(usernameRef.current.value, passwordRef.current.value);
        login(usernameRef.current.value, passwordRef.current.value)
            .then(({token}) => {
                localStorage.setItem('token', token);
                window.location.reload();
            })
    }}>Login</button>
  </form>)
}