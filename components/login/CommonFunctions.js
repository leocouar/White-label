import { signIn } from "next-auth/react";
import { getByUsername } from "services/userService";

export const commonLogin = async (credentials, csrfToken, router) => {
  const { username, password } = credentials;
  const signInOptions = { username, password, csrfToken, remember: true };
  const userExists = await getByUsername(credentials.username);

  if (userExists?.username) {
    try {
      const result = await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        csrfToken: csrfToken,
        remember: true,
      });

      console.log('SignIn Result:', result);

      router.push('/stores/list');
    } catch (error) {
      console.error('Error during login:', error);
      router.push('/login/error');
    }
  } else {
    router.push('/login/error?error=invaliduser');
  }
};


export const commonFacebookLogin = async (router) => {
  try {
    await signIn('facebook');
    router.push('/stores/list');
  } catch (error) {
    console.error('Error during Facebook login:', error);
    router.push('/login/errors?error=facebook_login_error');
  }
};

export const commonGoogleLogin = async (router) => {
  try {
    await signIn('google');
    router.push('/stores/list');
  } catch (error) {
    console.error('Error during Google login:', error);
    router.push('/login/errors?error=google_login_error');
  }
};