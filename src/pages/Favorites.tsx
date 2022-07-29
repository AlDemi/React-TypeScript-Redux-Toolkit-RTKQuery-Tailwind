import { useAppSelector } from '../hooks/redux';

export default function Favorites() {

  const { favorites } = useAppSelector((state) => state.github);

  if (favorites.length === 0) {
    return <div className="flex justify-center p-10 h-screen w-screen">
      <p>No favorites</p>
    </div>;
  }

  return (
    <div className="flex justify-center p-10 h-screen w-screen">
      <ul>
        {favorites.map((f) => <li key={f}>
          <a href={f} target="_blank" rel="noopener noreferrer">{f}</a>
        </li>)}
      </ul>
    </div>
  );
}
