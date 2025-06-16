import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../lib/slices/pokemonSlice";

function FavoriteButton({ pokemonId }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.pokemon.favoriteIds);
  const isFavorite = favoriteIds.includes(pokemonId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorite(pokemonId));
    } else {
      dispatch(addToFavorite(pokemonId));
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isFavorite ? "follow" : "Unfollow"}
      className="text-2xl focus:outline-none"
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;
