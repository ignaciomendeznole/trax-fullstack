import AuthForm from '../components/auth/authForm';

const SignIn = () => {
  return <AuthForm mode='signIn' />;
};

Object.assign(SignIn, {
  authPage: true,
});

export default SignIn;
