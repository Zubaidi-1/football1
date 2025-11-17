import axios from "axios";
import Standings from "./components/Standings";

export default function LandingPage() {
  return (
    <div className="grid grid-cols-2 items-center min-h-screen bg-[#020202]">
      <div>
        <h1 className="text-[#16db65] text-3xl font-bold text-center">
          Watch Live Football Scores & Stats
        </h1>
        <p className="text-white text-center mt-4">
          Stay updated with real-time scores, fixtures, <br /> and league
          standings from top football leagues around the world.
        </p>
      </div>
      <div className="justify-self-start w-full">
        <Standings leagueId={39} />
      </div>
    </div>
  );
}
