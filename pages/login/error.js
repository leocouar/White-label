import { useSession, getSession, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from 'react';
import LoginForm from "@/components/login/LoginForm";
import SEO from "@/components/SEO";
import { solicitPassRestoreEmail } from "services/userService";

const LoginError = ({ csrfToken }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "", csrfToken: csrfToken, remember: true })
  const [errorType, setErrorType] = useState(null);
  const [usernameFromQuery, setUsernameFromQuery] = useState("");
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [newPassRequestStatus, setNewPassRequestStatus] = useState();
  const messageRef = useRef(null);

  if (session) {
    router.push('/stores/list');
    return null;
  }

  useEffect(() => {
    const { error, user } = router.query;
    setErrorType(error);
    setUsernameFromQuery(user);
  }, [router.query]);

  useEffect(() => {
    console.log(usernameFromQuery)
    if (usernameFromQuery) {
      setCredentials(prevCredentials => ({
        ...prevCredentials,
        username: usernameFromQuery
      }));
    }
  }, [usernameFromQuery]);

  const handleForgotPassword = async () => {
    let request = await solicitPassRestoreEmail(usernameFromQuery);
    setNewPassRequestStatus(request.status)
    setShowResetMessage(true);
    setErrorType("");
    setTimeout(() => {
      newPassRequestStatus === 200 ? router.push("/") : router.push("/login")
    }, 5000);
  };

  return (
    <>
      <SEO title="Error de inicio de sesión" />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-col">
        <LoginForm
          credentials={credentials}
          setCredentials={setCredentials}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          router={router}
          csrfToken={csrfToken}
        />
        <div className="flex flex-col items-center">
          <div className="mx-auto">
            <a className="text-red-500">
              {errorType === "invalidUser" && "Usuario inexistente."}
              {errorType === "passwrdError" && "Contraseña erronea."}
            </a>
          </div>
          {errorType === "passwrdError" &&
            <div className="mx-auto">
              <div className="text-sm">
                <button
                  className="font-medium text-indigo-600 hover:text-indigo-500 text-center"
                  onClick={handleForgotPassword}
                >
                  ¿Olvidaste la contraseña?
                </button>
              </div>
            </div>
          }
          {showResetMessage &&
            <div className="mx-auto mt-2 text-sm  text-center" ref={messageRef}>
              {newPassRequestStatus === 200 ?
                <div className="text-green-500">
                  Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña. Sera redirigido a la pagina principal.
                </div>
                :
                <div className="text-red-500" ref={messageRef}>
                  Error: el mensaje no ha podido ser enviado, vuelva a intentarlo mas tarde...
                </div>
                }
            </div>
          }
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/stores/list",
        permanent: false
      }
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default LoginError;