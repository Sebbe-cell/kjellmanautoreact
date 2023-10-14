import { useState } from 'react';
import Loader from './loader';

interface IHeroProps {
  imgSrc: string;
}

const Hero = (props: IHeroProps): JSX.Element => {
  const { imgSrc } = props;

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <div className="hero-container">
      {imagesLoaded ? (
        <img src={imgSrc} alt="hero"></img>
      ) : (
        <>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <Loader />
          <img
            src={imgSrc}
            alt="hero"
            style={{ display: 'none' }}
            onLoad={handleImageLoad}
          />
        </div>
        </>
      )}
    </div>
  );
};

export default Hero;