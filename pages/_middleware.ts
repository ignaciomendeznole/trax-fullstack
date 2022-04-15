import { NextResponse } from 'next/server';

const signedInPages = ['/', '/playlist', '/playlist/:id', '/library'];

// Edge function for checking if user is signed in and blocking routes that require signed in users
export default function middleware(req) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN as string;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/signIn';
      return NextResponse.rewrite(url);
    }
  }
}
