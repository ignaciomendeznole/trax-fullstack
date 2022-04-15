import fetcher from './fetcher';

export const auth = (
  mode: 'signIn' | 'signUp' | 'signOut',
  body: { email: string; password: string }
) => fetcher(`/${mode}`, body);
