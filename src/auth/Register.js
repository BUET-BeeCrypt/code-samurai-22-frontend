export default function Register() {
    return (<form class="form-signin" style={{width: '400px', margin: 'auto'}}>
    <h1 class="h3 mb-4 font-weight-normal">Registration</h1>
    <label for="inputEmail" class="sr-only  mt-2">Username</label>
    <input type="text" id="inputEmail" class="form-control" placeholder="Username" required autofocus />
    <label for="inputPassword" class="sr-only mt-4">Password</label>
    <input type="password" id="inputPassword" class="form-control mb-2" placeholder="Password" required />
    <label for="inputPassword" class="sr-only">Confirm Password</label>
    <input type="password" id="inputPassword" class="form-control mb-4" placeholder="Rewrite Password" required />
    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
  </form>)
}