import { useEffect, useState } from 'react'
import './Carousel.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

export const Carousel = ({ data }) => {

  const [slide, setSlide] = useState(0);
  const autoCaruoselSlideInterval = 3000;

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, autoCaruoselSlideInterval)
    return () => {
      clearInterval(autoSlide);
    };
  }, [slide]);

  return (
    <div className='carousel'>
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {data && Array.isArray(data) && data.map((item, index) => (
        <div className="carousel-container" key={index}>
          <img src={item.src} alt={item.alt} className={slide === index ? "images slide slide-active" : "images slide slide-hidden"} style={{ height: '500px', width: '100vw', maxHeight: '100vh' }} />
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
  )
}