import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';  
import './Carousel.css';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const autoCaruoselSlideInterval = 3000;

  const nextSlide = useCallback(() => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  }, [slide, data.length]); 

  const prevSlide = useCallback(() => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  }, [slide, data.length]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, autoCaruoselSlideInterval);
    return () => {
      clearInterval(autoSlide); 
    };
  }, [nextSlide]);  

  return (
    <div className='carousel'>
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      
      {data && Array.isArray(data) && data.map((item, index) => (
        <div className="carousel-container" key={index}>
          <Image
            src={item.src} 
            alt={item.alt} 
            className={slide === index ? "images slide slide-active" : "images slide slide-hidden"}
            style={{ height: '500px', width: '100vw', maxHeight: '100vh' }}
            width={1200}   
            height={500}  
          />
        </div>
      ))}

      <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
      <span className='indicators'>
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={slide === idx ? "indicator" : "indicator indicator-inactive"}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
