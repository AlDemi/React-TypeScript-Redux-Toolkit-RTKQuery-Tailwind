import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models';

export default function RepoCard({ repo }: { repo: IRepo; }) {
  const { favorites } = useAppSelector((state) => state.github);
  const { addFavorites, removeFavorites } = useActions();
  const [isFavorite, setIsFavorite] = useState(favorites.includes(repo.html_url));

  const addToFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorites(repo.html_url);
    setIsFavorite(true);
  };

  const removeFromFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavorites(repo.html_url);
    setIsFavorite(false);
  };

  return (
    <div className="border flex items-center justify-between rounded p-3 mt-2 cursor-pointer hover:bg-gray-100 hover:shadow-md from-neutral-200 transition-all">
      <div>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <h3 className="text-lg font-semibold">{repo.full_name}</h3>
          <p className="text-sm">
            Forks: <span className="font-bold mr-2">{repo.forks}</span>
            Watchers: <span className="font-bold">{repo.watchers_count}</span>
          </p>
          {repo.description && <p className="font-thin mt-2 mr-2 max-w-60">{repo?.description}</p>}
        </a>
      </div>
      <div>
        {!isFavorite && <button
          className="py-2 px-5 bg-green-600 text-white shadow-md hover:bg-green-700 active:shadow-sm rounded"
          onClick={addToFavorites}
        >Add to ⭐️</button>}
        {isFavorite && <button
          className="py-2 px-5 bg-red-600 text-white shadow-md hover:bg-red-700 active:shadow-sm rounded"
          onClick={removeFromFavorites}
        >Remove From ⭐️</button>}
      </div>
    </div>
  );
}
