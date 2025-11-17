import { motion } from "framer-motion";

export default function Fixture({ fixture }) {
  const dateObj = new Date(fixture.date);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      whileHover={{
        backgroundColor: "#058c42",
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="w-1/3 p-4 border border-[#058c42] text-white flex flex-col items-center rounded space-y-3"
    >
      {/* League name */}
      <h1 className="text-lg font-bold text-center">
        {fixture.league_info.name}
      </h1>

      {/* Date */}
      <p className="text-sm text-gray-300">{formattedDate}</p>

      {/* GRID (unchanged layout) */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-items-center w-full text-center gap-2">
        {/* Home team */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-md font-medium">{fixture.teams.home.name}</p>
          <img
            src={fixture.teams.home.logo}
            alt={fixture.teams.home.name}
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Score OR Time (kept exactly where it was) */}
        <div className="text-center">
          {fixture.status === "NS" ? (
            <p className="text-lg font-semibold">{formattedTime}</p>
          ) : (
            <p className="text-lg font-semibold">
              {fixture.goals.home} - {fixture.goals.away}
            </p>
          )}
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-md font-medium">{fixture.teams.away.name}</p>
          <img
            src={fixture.teams.away.logo}
            alt={fixture.teams.away.name}
            className="w-14 h-14 object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
}
