import { useEffect, useState } from "react";
import { gettopLeaguesStandings } from "../services/standingsApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Standings({ leagueId, numberOfTeams = 5 }) {
  const [league, setLeague] = useState([]);
  const [standings, seStandings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const standings = await gettopLeaguesStandings(leagueId);
        standings.data.map((league) => {
          setLeague((prevLeagues) => [...prevLeagues, league.league]);
          seStandings((prevStandings) => [...prevStandings, league.standings]);
        });
      } catch (error) {
        console.error("Failed to fetch standings:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white w-full max-w-3xl mx-auto mt-10">
      <div className="bg-[#121212] rounded-xl shadow-lg overflow-hidden border border-[#1f1f1f]">
        {/* Header */}
        <div className="bg-[#1a1a1a] px-6 py-4 border-b border-[#1f1f1f]">
          <h2 className="text-xl font-bold text-[#4CAF50] tracking-wide">
            League Standings
          </h2>
        </div>

        {/* Table or No Standings */}
        {standings.length > 0 ? (
          <table className="w-full table-auto">
            <thead className="bg-[#181818] text-gray-300 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Team</th>
                <th className="px-4 py-3 text-center">P</th>
                <th className="px-4 py-3 text-center">Pts</th>
                <th className="px-4 py-3 text-center">GD</th>
              </tr>
            </thead>

            <tbody>
              {standings[0].slice(0, numberOfTeams).map((standing) => (
                <motion.tr
                  key={standing.rank}
                  whileHover={{
                    backgroundColor: "rgba(76, 175, 80, 0.15)",
                    scale: 1.02,
                    transition: { duration: 0.25 },
                  }}
                  className="text-gray-200 text-sm border-b border-[#1f1f1f]"
                >
                  <td className="px-4 py-3 font-semibold text-[#4CAF50]">
                    {standing.rank}
                  </td>

                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={standing.team.logo}
                      alt={standing.team.name}
                      className="w-6 h-6 rounded-sm"
                    />
                    <span>{standing.team.name}</span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {standing.all.played}
                  </td>

                  <td className="px-4 py-3 text-center font-bold text-[#4CAF50]">
                    {standing.points}
                  </td>

                  <td
                    className={`px-4 py-3 text-center font-semibold ${
                      standing.goalsDiff >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {standing.goalsDiff}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-[#1a1a1a] border border-[#2b2b2b] rounded-xl px-8 py-10 shadow-lg max-w-md">
              <div className="text-[#4CAF50] text-5xl mb-4">⚽</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No Standings Available
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Standings for this league or event are not available.
                <br />
                Please check back later.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========== SEE FIXTURES BUTTON (NEW) ========== */}
      <div className="flex justify-center mt-6">
        <Link
          to={`/leagues/league/fixtures`}
          className="bg-[#4CAF50] text-black font-semibold px-6 py-2 rounded-lg shadow-lg 
                     hover:bg-[#58d76d] transition-colors duration-200"
        >
          See Fixtures →
        </Link>
      </div>
      {/* =============================================== */}
    </div>
  );
}
