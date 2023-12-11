import React, { useEffect, useRef, useState } from 'react';

const largeImages = ['/images/carruselshop.jpg', '/images/carruselshop1.jpg', '/images/carruselshop2.jpg'];
const responsiveImages = ['/images/carruselshopresponsive.jpg', '/images/carruselshop1responsive.jpg', '/images/carruselshop2responsive.jpg'];

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
      const newimgs = container.getElementsByTagName('img');
      setImgs(newimgs);
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

      imgs[1] && imgs[1].scrollIntoView({ block: 'nearest', inline: 'start' });
    };

    const handleVisibilityChange = (entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleVisibilityChange, {
      root: null, // use the viewport as the root
      rootMargin: '0px', // no margin
      threshold: 0.5, // 50% of the target element must be visible
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', updateWindowDimensions);
    updateWindowDimensions();

    setInitialHeight(windowDimensions[0]);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
      observer.disconnect();
    };
  }, [imgs, initialHeight]);

  useEffect(() => {
    if (isVisible) {
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
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isVisible, currentImage, imgs, images]);

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
    <button
      type="button"
      onClick={isLeft ? () => spin(true) : () => spin()}
      className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
      style={{ top: '40%' }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`} className={'bg-slate-900'}>
        {isLeft ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        )}
      </span>
    </button>
  );

  const positions = [1, 2, 3];
  return (

    <div style={heightAdjust} className="relative">
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