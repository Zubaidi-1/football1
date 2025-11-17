import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./Home";

import Mainlayout from "./layouts/Mainlayout";
import { Fixtures } from "./pages/Fixtures";
import Leagues from "./pages/Leagues";
import League from "./pages/League";
import { Provider } from "react-redux";
import { store } from "./state/store";
import LeagueFixtures from "./pages/LeagueFixtures";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/matches" element={<Fixtures />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/leagues/:leagueId" element={<League />} />
            <Route
              path="/leagues/league/fixtures"
              element={<LeagueFixtures />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
