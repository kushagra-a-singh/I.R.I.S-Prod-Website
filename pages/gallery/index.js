import { Carousel } from '../../src/components/Carousel';
import styles from './Gallery.module.scss';
import galleryData from './galleryData.json';

const Gallery = () => {
    return (
        <div className={styles['gallery-container']}>
            <div className={styles['gallery-heading-container']}>
                <span style={{ fontSize: '50px', fontWeight: 'bold', letterSpacing: '0.2rem' }}>Gallery</span>
                <p style={{ fontSize: '20px', fontWeight: 'underline', letterSpacing: '0.1rem' }}>
                    These are all the amazing photos that were taken at our events
                </p>
                <hr />
            </div>
            <div className={styles['gallery-blocks-container']}>
                {Object.entries(galleryData).map(([heading, data]) => {
                    const [title, description] = heading.split('-');
                    return (
                        <div className={styles['gallery-block']} key={heading}>
                            <div className={styles['gallery-content']}>
                                <h2>{title}</h2>
                                <p>{description}</p>
                            </div>
                            <div className={styles['carousel-container']}>
                                <Carousel className={styles.carousel} data={data} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Gallery;