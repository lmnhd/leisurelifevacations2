//import React from 'react';
// import { Fade } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'
import { Image } from 'semantic-ui-react';

const ImageFade = (props) => {

    console.log(props)
    const fadeImages = [
        {
          url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'First Slide'
        },
        {
          url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
          caption: 'Second Slide'
        },
        {
          url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Third Slide'
        },
      ];
      
      const Slideshow = () => {
        return (
          <div className="slide-container">
            {/* <Fade> */}
              {fadeImages.map((fadeImage, index) => (
                <div key={index}>
                  <Image  src={fadeImage.url} 
                  //size="medium" 
                  centered />
                  {/* <h2>{fadeImage.caption}</h2> */}
                </div>
              ))}
            {/* </Fade> */}
          </div>
        )
      }

      return Slideshow()

}
export default ImageFade;