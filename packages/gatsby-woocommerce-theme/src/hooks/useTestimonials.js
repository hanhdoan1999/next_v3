import { useEffect, useState } from 'react';
import axios from 'axios';

function useTestimonials() {
  const TESTIMONIAL_URL =
    'https://app.gatherup.com/reviews/84352.0.json?page=1&perPage=10';
  const [testimonials, setTestimonials] = useState('');
  useEffect(() => {
    axios
      .get(TESTIMONIAL_URL)
      .then(function (response) {
        let reviews = [];
        response.data.reviews.reduce((prev, cur) => {
          if (prev.content !== cur.content) {
            reviews.push(prev);
          }
          return cur;
        });
        setTestimonials(response.data.reviews.slice(0, 3));
      })
      .catch((error) => {});
    return () => {
      setTestimonials([]);
    };
  }, []);

  return testimonials;
}

export default useTestimonials;
