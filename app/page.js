'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonList } from '../lib/slices/pokemonSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FavoriteButton from './components/FavoriteButton';

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

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { list, loading, error } = useSelector((state) => state.pokemon);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = keyword.trim();
      if (trimmed !== '') {
        router.push(`/search?keyword=${encodeURIComponent(trimmed)}`);
      }
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-10 m-0">
      <div className="flex items-center justify-center w-full h-12 mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="포켓몬 이름을 입력해보세요."
            value={keyword}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       transition placeholder-gray-400 text-gray-800"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16 11a5 5 0 11-10 0 5 5 0 0110 0z"
            ></path>
          </svg>
        </div>
        <button
          type="button"
          onClick={() => router.push('/favorite')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-red-500"
          aria-label="찜 목록 보기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
                 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
                 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>

      <section className="flex flex-wrap gap-6 justify-center">
        {list.map((poke) => (
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
                No.{poke.id.toString().padStart(4, '0')}
              </p>
              <div className="flex gap-2 mt-auto">
                {poke.types?.map((type) => (
                  <span
                    key={type}
                    className={`text-white font-semibold px-4 py-1 rounded-full text-sm ${
                      type === 'grass'
                        ? 'bg-[#42bf24]'
                        : type === 'poison'
                        ? 'bg-[#994dcf]'
                        : type === 'fire'
                        ? 'bg-[#ff612c]'
                        : type === 'water'
                        ? 'bg-[#2992ff]'
                        : type === 'bug'
                        ? 'bg-[#9fa424]'
                        : type === 'flying'
                        ? 'bg-[#95c9ff]'
                        : type === 'ground'
                        ? 'bg-[#ab7939]'
                        : type === 'fairy'
                        ? 'bg-[#ffb1ff]'
                        : type === 'fighting'
                        ? 'bg-[#FFA202]'
                        : type === 'psychic'
                        ? 'bg-[#FF637F]'
                        : type === 'steel'
                        ? 'bg-[#6aaed3]'
                        : type === 'rock'
                        ? 'bg-[#bcb889]'
                        : type === 'ice'
                        ? 'bg-[#42d8ff]'
                        : type === 'dragon'
                        ? 'bg-[#5462d6]'
                        : type === 'ghost'
                        ? 'bg-[#6e4570]'
                        : type === 'electric'
                        ? 'bg-yellow-400 text-gray-800'
                        : 'bg-gray-400'
                    }`}
                  >
                    {typeKoMap[type] || type}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </section>
    </div>
  );
}
