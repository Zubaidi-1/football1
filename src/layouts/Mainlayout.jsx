import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
export default function Mainlayout({}) {
  return (
    <div className="min-h-screen bg-[#020202] flex flex-col">
      <div>
        <Nav />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
