import { useEffect, useState } from "react";
import { leagues } from "../services/topLeagues";
import axios from "axios";
import { getFixtures } from "../services/getFixturesApi";
import Fixture from "../components/Fixture";
import { useDispatch, useSelector } from "react-redux";
import { setFixture } from "../state/fixtures/fixture";
export function Fixtures() {
  const fixtures = useSelector((state) => state.fixture.value);
  const dispatch = useDispatch();
  // const [fixtures, setFixtures] = useState([]);
  const [error, setErrorMsg] = useState(null);
  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const data = await getFixtures();
        console.log("data", data);

        dispatch(setFixture(data.data[0]));
      } catch (error) {
        setErrorMsg(error.message);
      }
    };
    fetchFixtures();
  }, []);
  console.log("fix", fixtures);

  return (
    <div className="text-white flex flex-col ">
      {error && <p className="text-red-500">Error: {error}</p>}
      <h1 className="text-3xl font-bold mb-4 self-center my-4">
        Today's Fixtures
      </h1>
      <div className="flex flex-col items-center gap-8">
        {fixtures.map((fixture) => {
          return <Fixture key={fixture.match_id} fixture={fixture} />;
        })}
      </div>
    </div>
  );
}
