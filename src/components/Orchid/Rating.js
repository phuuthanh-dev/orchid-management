import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

export const Rating = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<StarFill className="text-warning" key={i} />);
    } else if (i - 0.5 <= rating) {
      stars.push(<StarHalf className="text-warning" key={i} />);
    } else {
      stars.push(<Star className="text-secondary" key={i} />);
    }
  }

  return stars;
};
