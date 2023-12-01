import Parallax from "../Paralax";
import { useEffect , useState } from "react";

const About = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        // Update the state based on the window.innerWidth
        setIsLargeScreen(window.innerWidth > 768); // Change the breakpoint as needed
        };

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check for screen size
        handleResize();

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const image = ['/images/camara-frente.jpeg']
    return(
        <div>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl text-blue-700 font-semibold mb-6">NUESTROS PILARES</h2>
                <p className="text-lg mb-6 text-justify">
                    La Cámara Comercial e Industrial del partido de Bolívar es una entidad de representación gremial,
                    comprometida con la defensa del comercio, la industria y los servicios locales, que,
                    mediante un trabajo mancomunado con entidades afines, acompaña el desarrollo y la sostenibilidad del sector,
                    a través del asesoramiento, capacitación y de la implementación de iniciativas
                    tendientes a la obtención de beneficios para sus asociados y para la comunidad en general.
                </p>
                <div className="flex justify-around">
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold mb-4">Valores</h3>
                        <ul className="list-disc list-inside">
                            <li>Diálogo</li>
                            <li>Transparencia</li>
                            <li>Compromiso</li>
                            <li>Respeto</li>
                            <li>Eficiencia</li>
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold mb-4">Pilares de Acción</h3>
                        <ul className="list-disc list-inside">
                            <li>Impulsando el Sector</li>
                            <li>Haciendo el Futuro Hoy</li>
                            <li>Tu voz Cuenta</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full max-h-96 overflow-hidden">
                {isLargeScreen ? (
                    <Parallax>
                        <img
                            src={`${image}`}
                            className="w-full pt-40 2xl:pb-96"></img>
                    </Parallax>
                ) : (
                    <img
                        src={`${image}`}
                        className="w-full"></img>
                )}
            </div>
        </div>
    );
  };
export default About;