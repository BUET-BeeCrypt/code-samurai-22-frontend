export default function Register() {
    return (<form className="form-signin" style={{width: '400px', margin: 'auto'}}>
    <h1 className="h3 mb-4 font-weight-normal">Registration</h1>
    <label for="inputEmail" className="sr-only  mt-2">Username</label>
    <input type="text" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
    <label for="inputPassword" className="sr-only mt-4">Password</label>
    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required />
    <label for="inputPassword" className="sr-only">Confirm Password</label>
    <input type="password" id="inputPassword" className="form-control mb-4" placeholder="Rewrite Password" required />
    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
  </form>)
}