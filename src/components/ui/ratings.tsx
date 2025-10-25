import { Star } from "lucide-react";

type RatingsProps = {
  rating: number;
  ratingCount?: number;
  max?: number;
  className?: string;
  starClassName?: string;
  size?: number;
};

export function Ratings({
  rating,
  ratingCount,
  max = 5,
  className = "",
  starClassName = "",
  size = 16,
}: RatingsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <span
      className={`inline-flex items-center gap-1 text-primary-orange ${className}`}
    >
      {Array.from({ length: max }, (_, i) => {
        // Full
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className={`fill-current ${starClassName}`}
              width={size}
              height={size}
            />
          );
        }
        // Half
        if (i === fullStars && hasHalf) {
          return (
            <Star
              key={i}
              className={`[clip-path:polygon(0_0,50%_0,50%_100%,0_100%)] fill-current ${starClassName}`}
              width={size}
              height={size}
            />
          );
        }
        // Empty
        return (
          <Star
            key={i}
            className={`opacity-30 ${starClassName}`}
            width={size}
            height={size}
          />
        );
      })}
      {typeof ratingCount === "number" && (
        <span className="ml-1 text-xs text-primary-blue/70">
          {ratingCount} rating{ratingCount !== 1 ? "s" : ""}
        </span>
      )}
    </span>
  );
}
