import React from 'react';

function Login() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Login Page</h1>
      <p>Login form coming soon!</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}

export default Login;