import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLeague } from "../state/league/leagueSlice";

export default function League({ league }) {
  const dispatch = useDispatch();
  const MotionLink = motion(Link);

  return (
    <MotionLink
      onClick={() => dispatch(setLeague(league))}
      to={`/leagues/${league.league_id}`}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(76,175,80,0.15)",
        borderColor: "#4CAF50",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-[#1a1a1a] border border-[#2b2b2b] rounded-xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer 
                 hover:shadow-[#4CAF50]/20 hover:shadow-xl"
    >
      <img
        src={league.logo}
        className="w-20 h-20 object-contain mb-3 drop-shadow-md"
      />
      <h2 className="text-xl font-bold text-[#eaeaea]">{league.name}</h2>
      <p className="text-gray-400 text-sm mt-1">{league.country}</p>
    </MotionLink>
  );
}
