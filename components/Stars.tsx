import { Icon } from "./Icon";

export function Stars() {
  return (
    <div className="stars" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star-fill" />)}
    </div>
  );
}
