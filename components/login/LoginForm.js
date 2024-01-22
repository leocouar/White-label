// LoginForm.js
import login from "/images/login.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { commonLogin, commonFacebookLogin, commonGoogleLogin } from './CommonFunctions';

const LoginForm = ({ credentials, setCredentials, showPassword, setShowPassword, router, csrfToken }) => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente
        commonLogin(credentials, csrfToken, router);
    };
    const handleFacebookLogin = () => {
        commonFacebookLogin(router);
    };

    const handleGoogleLogin = () => {
        commonGoogleLogin(router);
    };

    return (
        <div className="w-4/5 md:w-1/3 flex  justify-center">
            <div className="w-full mt-5 mb-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <img className="mx-auto h-12 w-auto"
                            src={login.src} alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-palette-primary">
                            Iniciar Sesión
                        </h2>
                    </div>
                    <div className="mt-6 space-y-6">
                        <div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">Usuario</label>
                                <input
                                    name="username"
                                    value={credentials.username}
                                    onChange={({ target }) => setCredentials({ ...credentials, username: target.value })}
                                    required
                                    type="type"
                                    maxLength={32} // Cambia el número según tus necesidades
                                    className="rounded relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                                    placeholder="Usuario"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        value={credentials.password}
                                        onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        maxLength={100} // Cambia el número según tus necesidades
                                        className="mt-5 relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                                        placeholder="Contraseña"
                                    />
                                    <div className="absolute top-2 right-2" style={{ zIndex: 10 }}>
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEye : faEyeSlash}
                                            className="h-5 w-5 text-palette-primary cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit"
                                onClick={handleSubmit}
                                className="rounded-md group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Iniciar Sesión
                            </button>
                            <h1 className="text-xs text-center my-1">O continuar con:</h1>
                        </div>
                        <div className="flex flex-wrap justify-evenly">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="group relative flex border border-current border-gray-300 rounded justify-center py-2 px-4 mb-2 mx-2 text-xs text-black hover:text-white hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                <img
                                    src="/icons/googlesesion.png"
                                    alt="Icono"
                                    height="48"
                                    width="48"
                                />
                            </button>
                            <button type="button"
                                onClick={handleFacebookLogin}
                                className="group relative rounded flex justify-center py-2 px-4 mb-2 mx-2 bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="48"
                                    width="48"
                                    viewBox="0 0 320 512">
                                    <path fill="#ffffff" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;