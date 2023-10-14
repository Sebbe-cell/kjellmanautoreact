import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

interface ISliderProps {
    images: any
}

const Slider = (props: ISliderProps): JSX.Element => {
    const {images} = props;
    console.log(images)
    return (
        <Carousel>
            {images.map((imageSrc: any, index: number) => (
                <div key={index}>
                    <img alt='car' src={imageSrc.fileName} width="200px" height="200px"/>
                </div>
            ))}
        </Carousel>
    )
}

export default Slider
