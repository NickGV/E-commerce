export const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  const renderStar = (index) => {
    if (index < fullStars) {
      return <i key={index} className="fas fa-star text-yellow-400"></i>;
    } else if (index === fullStars && decimalPart > 0) {
      if (decimalPart < 0.25) {
        return <i key={index} className="far fa-star text-yellow-400"></i>;
      } else if (decimalPart < 0.75) {
        return (
          <i key={index} className="fas fa-star-half-alt text-yellow-400"></i>
        );
      } else {
        return <i key={index} className="fas fa-star text-yellow-400"></i>;
      }
    } else {
      return <i key={index} className="far fa-star text-yellow-400"></i>;
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => renderStar(index))}
      <span className="ml-2 text-lg text-gray-600">({rating.toFixed(2)})</span>
    </div>
  );
};
