import fetcher from './fetcher';

export const auth = (
  mode: 'signIn' | 'signup' | 'signout',
  body: { email: string; password: string }
) => fetcher(`/${mode}`, body);
