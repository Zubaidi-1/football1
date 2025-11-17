import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  // * useState to manage active link states
  const activeLinkStyle = "text-[#0d2818] font-bold underline";
  const inactiveLinkStyle = "";
  const [activeLink, setActiveLink] = useState("Fixtures");

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <nav>
      <div className="bg-[#058c42] p-4 text-black flex justify-between items-center">
        <div>
          <Link
            to={"/"}
            className="text-2xl text-black !text-black font-bold"
            onClick={() => handleLinkClick("")}
          >
            Goalaski
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            to={"/matches"}
            className={`${
              activeLink === "Fixtures" ? activeLinkStyle : inactiveLinkStyle
            }`}
            onClick={() => handleLinkClick("Fixtures")}
          >
            Fixtures
          </Link>
          <Link
            to={"/leagues"}
            className={`${
              activeLink === "Competitions"
                ? activeLinkStyle
                : inactiveLinkStyle
            }`}
            onClick={() => handleLinkClick("Competitions")}
          >
            Competitions
          </Link>
          <Link
            className={`${
              activeLink === "Teams" ? activeLinkStyle : inactiveLinkStyle
            }`}
            onClick={() => handleLinkClick("Teams")}
          >
            Teams
          </Link>
        </div>
      </div>
    </nav>
  );
}
