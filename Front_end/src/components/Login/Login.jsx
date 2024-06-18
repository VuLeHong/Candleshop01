import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <Form className='login-form'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Text className="text-muted">Forgot your password?</Form.Text>
        <Button variant="primary" type="submit">Submit</Button>
        <Link to = '/signup'><Form.Text className="text-muted">Create account</Form.Text></Link>
      </Form>
    </div>
  );
}

export default Login;