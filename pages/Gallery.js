import { Carousel } from '../src/components/Carousel';
import './Gallery.scss';
import galleryData from './galleryData.json';

const Gallery = () => {
    return (
        <div className="gallery-container">
            <div className="gallery-heading-container">
                <span style={{ fontSize: '50px', fontWeight: 'bold', letterSpacing: '0.2rem' }}>Gallery</span>
                <p style={{ fontSize: '20px', fontWeight: 'underline', letterSpacing: '0.1rem' }}>
                    These are all the amazing photos that were taken at our events
                </p>
                <hr />
            </div>
            <div className='gallery-blocks-container'>
                {Object.entries(galleryData).map(([heading, data]) => {
                    const [title, description] = heading.split('-');
                    return (
                        <div className="gallery-block" key={heading}>
                            <div className='gallery-content'>
                                <h2>{title}</h2>
                                <p>{description}</p>
                            </div>
                            <div className='carousel-container'>
                                <Carousel className="carousel" data={data} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Gallery; 
