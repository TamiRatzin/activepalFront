// CardCarousel.jsx
import React from 'react';
import EventCard from './FcEventCard';
import './CardCarousel.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



 export default function CardCarousel  ({ events }) {

   /* const group = (items, n) => items.reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
      }, []);*/


      const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 3,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,

        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3,
        }
      };


    


    return (
       
        

        <Carousel  
           swipeable={true}
        itemClass='carouselItem'  partialVisible={false}
        draggable={true}
        infinite={true}
        responsive={responsive} 
        centerMode={true}
        ssr={true}
        >  

        {events.map((event, index) => (
               
                  <EventCard 
                      key={index}
                      image={event.image}
                      title={event.title}
                      subtitle={event.subtitle}
                      details={event.details}
                  />
             
            ))}

            
          </Carousel>



     /*    <Carousel className='card-carousel'  data-bs-theme="dark">
          {group(events, 2).map((events,i )=>
          <Carousel.Item key={i} >
        {events.map((event, index) => (
                 
                    <EventCard
                        key={index}
                        image={event.image}
                        title={event.title}
                        subtitle={event.subtitle}
                        details={event.details}
                    />
               
                ))   }
        </Carousel.Item>)}
             
    </Carousel>*/


     
    );
};


