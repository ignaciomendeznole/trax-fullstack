import fetcher from './fetcher';

export const auth = (
  mode: 'signin' | 'signup' | 'signout',
  body: { email: string; password: string }
) => fetcher(`/${mode}`, body);
