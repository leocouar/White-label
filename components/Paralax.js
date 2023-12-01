// components/Parallax.js
// components/Parallax.js
import { useEffect, useState } from 'react';

const Parallax = ({ children }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    // Suscribirse al evento de desplazamiento
    window.addEventListener('scroll', handleScroll);

    // Limpiar el suscriptor cuando se desmonta el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax-container" style={{ transform: `translateY(-${offset * 0.5}px)` }}>
      <div className="parallax-content w-screen">
        {children}
      </div>
    </div>
  );
};

export default Parallax;

