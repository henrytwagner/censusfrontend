import React from 'react';
import LoginForm from '@components/forms/LoginForm';
import HeaderNoAuth from '@components/layout/HeaderNoAuth';

const Login = () => {
  return (
    <>
      <HeaderNoAuth />
      <LoginForm />;
    </>
  );
};

export default Login;
