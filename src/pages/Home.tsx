import { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';

export default function Home() {
  const [searchStr, setSearchStr] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(searchStr);
  const { isLoading, isError, data: users } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchUserRepos, { isLoading: isUserReposLoading, data: repos }] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length >= 3 && users?.length! > 0);
  }, [debounced, users]);

  const handleClick = (username: string) => {
    fetchUserRepos(username);
    setDropdown(false);
  };

  if (repos) { console.log(repos); };

  return (
    <div className="flex justify-center p-10 h-screen w-screen">
      <div className="relative w-[90%] max-w-[500px]">
        {isError && <div className="text-center text-red-500 mb-3">Something is wrong</div>}

        <input
          type="text"
          placeholder="Looking for GitHub users..."
          className="w-full border py-2 px-4 rounded outline-none"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)} />

        {dropdown && <ul className="bg-white absolute shadow-md max-h-56 overflow-y-scroll py-2 px-4 w-full rounded text-gray-500">
          {isLoading && <p className="text-center">Loading...</p>}
          {users?.map(user => (
            <li
              key={user.id}
              className="flex items-center hover:bg-gray-400 hover:text-white rounded transition-colors cursor-pointer p-2"
              onClick={() => handleClick(user.login)}
            >
              <img className="w-8 rounded-full mr-2" src={user.avatar_url} alt="" />
              <p><b>Login: </b> {user.login}</p>
            </li>
          )
          )}
        </ul>}
        {isUserReposLoading && <div className="container">
          <p className="text-center">Loading repos...</p>
        </div>}
        {!dropdown && repos?.map(repo => (
          <RepoCard repo={repo} key={repo.id} />
        ))}
      </div>
    </div>
  );
}
