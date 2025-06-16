'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import FavoriteButton from '../components/FavoriteButton';

const typeKoMap = {
  normal: "노말",
  fire: "불꽃",
  water: "물",
  electric: "전기",
  grass: "풀",
  ice: "얼음",
  fighting: "격투",
  poison: "독",
  ground: "땅",
  flying: "비행",
  psychic: "에스퍼",
  bug: "벌레",
  rock: "바위",
  ghost: "고스트",
  dragon: "드래곤",
  dark: "악",
  steel: "강철",
  fairy: "페어리",
};

export default function FavoritePage() {
  const favoriteIds = useSelector((state) => state.pokemon.favoriteIds);
  const { list } = useSelector((state) => state.pokemon);

  const favoritePokemons = list.filter((poke) =>
    favoriteIds.includes(poke.id)
  );

  if (favoritePokemons.length === 0) {
    return <div className="p-10">찜한 포켓몬이 없습니다.</div>;
  }

  return (
    <div className="p-20">
      <section className="flex flex-wrap gap-6 justify-center">
        {favoritePokemons.map((poke) => (
          <li
            key={poke.id}
            className="list-none border rounded-lg shadow-md p-5 w-60 flex flex-col items-center bg-white transform transition-transform duration-200 hover:scale-105 relative"
          >
            <FavoriteButton
              pokemonId={poke.id}
              className="absolute top-3 right-3 z-20"
            />

            <Link href={`/detail/${poke.id}`} className="block w-full h-full">
              <img
                src={poke.imageFront}
                alt={poke.koreaName}
                className="w-48 h-48 object-contain"
              />
              <p className="mt-3 text-xl font-semibold">{poke.koreaName}</p>
              <p className="text-gray-500 text-sm mb-2">
                No.{poke.id.toString().padStart(4, "0")}
              </p>
              <div className="flex gap-2 mt-auto">
                {poke.types
                  ? poke.types.map((type) => (
                      <span
                        key={type}
                        className={`text-white font-semibold px-4 py-1 rounded-full text-sm ${
                          type === "grass"
                            ? "bg-[#42bf24]"
                            : type === "poison"
                            ? "bg-[#994dcf]"
                            : type === "fire"
                            ? "bg-[#ff612c]"
                            : type === "water"
                            ? "bg-[#2992ff]"
                            : type === "bug"
                            ? "bg-[#9fa424]"
                            : type === "flying"
                            ? "bg-[#95c9ff]"
                            : type === "ground"
                            ? "bg-[#ab7939]"
                            : type === "fairy"
                            ? "bg-[#ffb1ff]"
                            : type === "fighting"
                            ? "bg-[#FFA202]"
                            : type === "psychic"
                            ? "bg-[#FF637F]"
                            : type === "steel"
                            ? "bg-[#6aaed3]"
                            : type === "rock"
                            ? "bg-[#bcb889]"
                            : type === "ice"
                            ? "bg-[#42d8ff]"
                            : type === "dragon"
                            ? "bg-[#5462d6]"
                            : type === "ghost"
                            ? "bg-[#6e4570]"
                            : type === "electric"
                            ? "bg-yellow-400 text-gray-800"
                            : "bg-gray-400"
                        }`}
                      >
                        {typeKoMap[type] || type}
                      </span>
                    ))
                  : "타입 정보 없음"}
              </div>
            </Link>
          </li>
        ))}
      </section>
    </div>
  );
}
