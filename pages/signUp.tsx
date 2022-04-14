import AuthForm from '../components/auth/authForm';

const SignUp = () => {
  return <AuthForm mode='signUp' />;
};

Object.assign(SignUp, {
  authPage: true,
});

export default SignUp;
