import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStats } from "../services/getStat";
import Standings from "../components/Standings";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { sortAssists, sortGoals } from "../services/sort.js";
import PlayerCard from "../components/PlayerCard.jsx";

export default function League() {
  const [stat, setStat] = useState([]);
  // Switch filter
  const [filter, setFilter] = useState("goals");
  const [top, setTop] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const { leagueId } = useParams();
  const leagueDetails = useSelector((state) => state.league.value);
  const handleFilter = () => {
    switch (filter) {
      case "goals":
        setFilter("assists");
        break;
      case "assists":
        setFilter("goals");
    }
  };
  useEffect(() => {
    try {
      (async () => {
        const response = await getStats(leagueId);
        setStat(response.data.data);
      })();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [leagueId]);

  useEffect(() => {
    switch (filter) {
      case "goals":
        setTop(sortGoals(stat));
        break;
      case "assists":
        setTop(sortAssists(stat));
        break;
    }
  }, [filter, stat]);

  console.log(top, "top");

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center py-8 bg-[#0f0f0f]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center mb-10">
        <div className="bg-[#fff] p-6 rounded-full shadow-lg border border-[#2b2b2b]">
          <img
            src={leagueDetails.logo}
            className="w-28 h-28 object-contain drop-shadow-lg "
            alt={leagueDetails.name}
          />
        </div>
        <div className="flex">
          <h1 className="text-2xl font-bold text-[#4CAF50] mb-6 mt-2">
            {filter === "goals" ? "Top scorers" : "Top assists"}
          </h1>
          <button
            onClick={handleFilter}
            className="ml-3 bg-[#1a1a1a] border border-[#333] w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#222] transition"
          >
            <span className="text-[#4CAF50] text-xl">→</span>
          </button>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {top?.slice(0, 3).map((player) => (
            <PlayerCard player={player} />
          ))}
        </motion.div>
      </div>

      <div className="mt-10 w-full flex justify-center">
        <Standings numberOfTeams={400} leagueId={leagueId} />
      </div>
    </motion.div>
  );
}
