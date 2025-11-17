import { useEffect, useState } from "react";
import { getLeagues } from "../services/getLeagues";
import League from "../components/League";
import { useDispatch, useSelector } from "react-redux";
import { setLeagues } from "../state/leagues/leaguesSlice";

export default function Leagues() {
  const leagues = useSelector((state) => state.leagues.value);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      const leagues = await getLeagues();
      dispatch(setLeagues(leagues.data[0]));
    };
    fetchLeagues();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-10 flex flex-col items-center">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide text-[#4CAF50]">
          Leagues
        </h1>
        <p className="text-gray-400 mt-2">
          Browse leagues and explore fixtures & stats
        </p>
      </div>

      {/* Error */}
      {errorMessage && (
        <p className="text-red-500 text-lg bg-red-500/10 px-4 py-2 rounded-lg mb-6">
          {errorMessage}
        </p>
      )}

      {/* Leagues grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] max-w-6xl">
        {leagues.map((league) => (
          <League key={league.league_id} league={league} />
        ))}
      </div>
    </div>
  );
}
