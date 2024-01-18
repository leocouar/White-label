import React, { useEffect, useRef, useState } from 'react';

const largeImages = ['/images/ImgCamara1.png', '/images/ImgCamara4.png', '/images/ImgCamara2.png'];
const responsiveImages = ['/images/ImgCamara1Responsive.png', '/images/ImgCamara4Responsive.png', '/images/ImgCamara2Responsive.png'];

function Carousel() {
  const containerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState([0, 0]);
  const [imgs, setImgs] = useState([]);
  const [initialHeight, setInitialHeight] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  
  useEffect(() => {
    const container = containerRef.current;
  
    if (container) {
      const newImgs = container.getElementsByTagName('img');
      setImgs(newImgs); // No necesitas convertir HTMLCollection a un array
    }
  }, [containerRef]);
  
  useEffect(() => {
    const updateWindowDimensions = () => {
      let height;
  
      setImages(largeImages);
  
      if (window.innerWidth >= 1024) {
        height = window.innerHeight - 60;
      } else if (window.innerWidth >= 768) {
        height = window.innerHeight - 74.37;
      } else {
        setImages(responsiveImages);
        height = window.innerHeight - 88;
      }
  
      setWindowDimensions([height, window.innerWidth * 3]);
  
      const container = containerRef.current;
      const newImgs = container.getElementsByTagName('img');
      setImgs(newImgs);
  
      imgs[1] && imgs[1].scrollIntoView({ block: 'nearest', inline: 'start' });
  
      // Añadir lógica para ajustar el height de las imágenes en pantallas pequeñas
      const imgHeight = window.innerWidth < 768 ? 'auto' : `${initialHeight}px`;
  
      Array.from(newImgs).forEach((img) => {
        img.style.height = imgHeight;
      });
    };
  
    // Llama a la función de actualización inicial
    updateWindowDimensions();
  
    updateWindowDimensions();

    const intervalId = setInterval(() => {
      const nextImgIndex = currentImage !== images.length - 1 ? currentImage + 1 : 0;
      setCurrentImage(nextImgIndex);
      imgs[2].setAttribute('src', `${images[nextImgIndex]}`);

      const temp = imgs[0].cloneNode(true);

      for (let i = 0; i < imgs.length - 1; i++) {
        const nextElement = imgs[i + 1].cloneNode(true);
        imgs[i].parentNode.replaceChild(nextElement, imgs[i]);
      }
      imgs[imgs.length - 1].parentNode.replaceChild(temp, imgs[imgs.length - 1]);
      containerRef.current.scrollTo({ left: 0 });

      imgs[1].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
        height: '200',
      });
    }, 5000);

    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, [containerRef, imgs, initialHeight, largeImages, responsiveImages, currentImage, images]);

  const spin = (backwards) => {
    const numimgs = imgs.length;

    if (numimgs < 2) {
      return;
    }
    if (backwards) {
      const prevImgIndex = currentImage !== 0 ? currentImage - 1 : images.length - 1;
      setCurrentImage(prevImgIndex);
      imgs[0].setAttribute('src', `${images[prevImgIndex]}`);

      const temp = imgs[numimgs - 1].cloneNode(true);

      for (let i = numimgs - 1; i > 0; i--) {
        const prevElement = imgs[i - 1].cloneNode(true);
        imgs[i].parentNode.replaceChild(prevElement, imgs[i]);
      }
      imgs[0].parentNode.replaceChild(temp, imgs[0]);
      containerRef.current.scrollTo({ left: containerRef.current.scrollWidth - containerRef.current.clientWidth });
    } else {
      const nextImgIndex = currentImage !== images.length - 1 ? currentImage + 1 : 0;
      setCurrentImage(nextImgIndex);
      imgs[2].setAttribute('src', `${images[nextImgIndex]}`);

      const temp = imgs[0].cloneNode(true);

      for (let i = 0; i < numimgs - 1; i++) {
        const nextElement = imgs[i + 1].cloneNode(true);
        imgs[i].parentNode.replaceChild(nextElement, imgs[i]);
      }
      imgs[numimgs - 1].parentNode.replaceChild(temp, imgs[numimgs - 1]);
      containerRef.current.scrollTo({ left: 0 });
    }

    imgs[1].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
      height: '200',
    });
  };

  const heightAdjust = {
    height: `${initialHeight}px`,
  };

  const arrowStyle = 'absolute text-white text-2xl z-10 bg-white h-10 w-10 rounded-full opacity-75 flex items-center justify-center';

  const sliderControl = isLeft => (
  <></>
  );

  const positions = [1, 2, 3];
  return (

    <div style={{heightAdjust}}className="relative">
      <div id="container" ref={containerRef} className="w-full overflow-hidden">
        {sliderControl(true)}
        <div className="flex" style={{ width: `${windowDimensions[1]}px` }}>
          {positions.map((item, index) => (
            <img key={index} className="w-1/3" style={heightAdjust} src={`${images[0]}`} alt={`carousel-img-${index}`} />
          ))}
        </div>
      </div>

            {sliderControl()}
        </div>
    );
}

export default Carousel;