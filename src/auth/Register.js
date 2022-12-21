import { useRef } from "react";
import { register } from "../api";

export default function Register() {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordCRef = useRef();

    return (<form className="form-signin" style={{width: '400px', margin: 'auto'}} onSubmit={ e => {e.preventDefault()}}>
    <h1 className="h3 mb-4 font-weight-normal">Registration</h1>
    <label for="inputEmail" className="sr-only  mt-2">Username</label>
    <input ref={usernameRef} type="text" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
    <label for="inputPassword" className="sr-only mt-4">Password</label>
    <input ref={passwordRef} type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required />
    <label for="inputPassword" className="sr-only">Confirm Password</label>
    <input ref={passwordCRef} type="password" id="inputPassword" className="form-control mb-4" placeholder="Rewrite Password" required />
    <button className="btn btn-lg btn-primary btn-block" onClick={e => {
        e.preventDefault();
        console.log(usernameRef.current.value, passwordRef.current.value, passwordCRef.current.value);
        if (!usernameRef.current.value)
            usernameRef.current.focus()
        else if (!passwordRef.current.value)
            passwordRef.current.focus()
        else if (!passwordCRef.current.value)
            passwordCRef.current.focus()
        else if (passwordRef.current.value === passwordCRef.current.value) {
            register(usernameRef.current.value, passwordRef.current.value)
                .then(() => {
                    window.location.reload();
                })
        } else {
            passwordCRef.current.focus()
        }
    }}>Register</button>
  </form>)
}