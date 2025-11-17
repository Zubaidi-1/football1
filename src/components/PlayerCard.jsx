import { motion } from "framer-motion";

export default function PlayerCard({ player }) {
  const stats = player.statistics[0];

  return (
    <motion.div
      key={player.player_id}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative bg-[#1a1a1a] border border-[#2b2b2b] rounded-xl shadow-lg p-6 w-80 flex flex-col items-center text-[#eaeaea] overflow-hidden"
    >
      {/* Photo */}
      <div className="relative">
        <img
          src={player.player.photo}
          className="w-24 h-24 rounded-full border-4 border-[#4CAF50] shadow-md object-cover"
        />
        <div className="absolute -bottom-2 -right-2 bg-[#4CAF50] text-white text-xs px-2 py-1 rounded-full font-semibold">
          {stats.games?.position || "Player"}
        </div>
      </div>

      {/* Name */}
      <div className="text-center mt-4 space-y-2">
        <h2 className="text-lg font-bold text-[#4CAF50]">
          {player.player.name}
        </h2>
        <div className="flex items-center justify-center gap-2 text-[#b3b3b3]">
          <img src={stats.team.logo} className="w-6 h-6" />
          <span className="text-sm">{stats.team.name}</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="flex justify-around w-full mt-5 text-sm">
        <div className="flex flex-col items-center">
          <span className="text-[#4CAF50] font-bold text-lg">
            {stats.goals?.total ?? 0}
          </span>
          <span className="text-gray-400 text-xs">Goals</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#4CAF50] font-bold text-lg">
            {stats.goals?.assists ?? 0}
          </span>
          <span className="text-gray-400 text-xs">Assists</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#4CAF50] font-bold text-lg">
            {stats.games?.minutes ?? 0}
          </span>
          <span className="text-gray-400 text-xs">Minutes</span>
        </div>
      </div>

      {/* League tag */}
      <div className="mt-4 text-xs text-[#777] italic">
        {stats.league?.name || ""}
      </div>

      {/* HOVER REVEAL EXTRA STATS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 w-full p-4 bg-[#141414]/90 border-t border-[#2b2b2b] text-sm"
      >
        <p className="text-[#4CAF50] font-bold mb-2">More Stats</p>

        <div className="flex justify-between text-[#b3b3b3]">
          <span>Dribbles</span>
          <span>
            {stats.dribbles?.success ?? 0} / {stats.dribbles?.attempts ?? 0}
          </span>
        </div>
        <div className="flex justify-between text-[#b3b3b3]">
          <span>Shots</span>
          <span>{stats.shots?.total ?? 0}</span>
        </div>
        <div className="flex justify-between text-[#b3b3b3]">
          <span>Key Passes</span>
          <span>{stats.passes?.key ?? 0}</span>
        </div>
        <div className="flex justify-between text-[#b3b3b3]">
          <span>Fouls Drawn</span>
          <span>{stats.fouls?.drawn ?? 0}</span>
        </div>
        <div className="flex justify-between text-[#b3b3b3]">
          <span>Fouls</span>
          <span>{stats.fouls?.committed ?? 0}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
