import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';  
import styles from './Carousel.module.css';
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
    <div className={styles.carousel}>
      <BsArrowLeftCircleFill 
        size={40}
        style={{cursor: 'pointer'}}
        onClick={prevSlide} 
        className={styles.arrowLeft} 
      />
      
      {data && Array.isArray(data) && data.map((item, index) => (
        <div className={styles.carouselContainer} key={index}>
          <Image
            src={item.src} 
            alt={item.alt} 
            className={`${styles.images} ${styles.slide} ${
              slide === index ? styles.slideActive : styles.slideHidden
            }`}
            style={{ height: '500px', width: '100vw', maxHeight: '100vh' }}
            width={1200}   
            height={500}  
          />
        </div>
      ))}

      <BsArrowRightCircleFill 
        onClick={nextSlide} 
        size={40}
        style={{cursor: 'pointer'}}
        className={styles.arrowRight} 
      />
      <span className={styles.indicators}>
        {data.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlide(idx)}
            className={`${styles.indicator} ${
              slide === idx ? '' : styles.indicatorInactive
            }`}
          ></button>
        ))}
      </span>
    </div>
  );
};
