'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPokeData } from '../../../lib/slices/fetchAPI';

export default function DetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchPokeData(id);
        setPokemon(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;
  if (!pokemon) return null;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">
        No. {id.toString().padStart(4, '0')} {pokemon.koreaName}
      </h1>
      <img
        src={pokemon.imageFront}
        alt={pokemon.koreaName}
        className="w-64 h-64"
      />
      <p className="whitespace-pre-line leading-relaxed mt-4 text-base text-gray-800">
        {pokemon.description}
      </p>
      <div className="flex gap-2 mt-4">
        {pokemon.types.map((type) => (
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
        ))}
      </div>
    </div>
  );
}
