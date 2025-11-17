import { useEffect, useState, useMemo } from "react";
import { getFixturesByLeague } from "../services/getFixturesApi";
import { useDispatch, useSelector } from "react-redux";
import Fixture from "../components/Fixture";
import { setFixture } from "../state/fixtures/fixture";
import DateRangePicker from "../components/Calender";

export default function LeagueFixtures() {
  const originalFixtures = useSelector((state) => state.fixture.value);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [range, setRange] = useState({ from: null, to: null });

  const leagueId = useSelector((state) => state.league.value.league_id);

  useEffect(() => {
    if (!leagueId) return;

    (async () => {
      try {
        const data = await getFixturesByLeague(leagueId);
        dispatch(setFixture(data.data[0])); // ONLY STORE RAW
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, [leagueId]);

  // 💡 Filtered fixtures using pure frontend logic
  const filteredFixtures = useMemo(() => {
    if (!range.from || !range.to) return originalFixtures;

    const start = new Date(range.from);
    const end = new Date(range.to);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return originalFixtures.filter((fixture) => {
      const fixtureDate = new Date(fixture.date);
      return fixtureDate >= start && fixtureDate <= end;
    });
  }, [originalFixtures, range]);

  const handleRangeChange = (type, value) => {
    setRange((prev) => ({ ...prev, [type]: value }));
  };

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full py-6">
      {/* Calendar above fixtures */}
      <DateRangePicker onChange={handleRangeChange} />

      {filteredFixtures?.length === 0 ? (
        <p className="text-gray-500">No fixtures found.</p>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full">
          {filteredFixtures.map((fixture) => (
            <Fixture key={fixture.match_id} fixture={fixture} />
          ))}
        </div>
      )}
    </div>
  );
}
