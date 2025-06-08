import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAtHome, setIsAtHome] = useState(false);

  useEffect(() => {
    location.pathname === "/" && setIsAtHome(true);
  }, [location]);

  return (
    <nav className="tw-h-16 tw-bg-sky-700 tw-text-white tw-flex tw-items-center tw-justify-between">
      <section className="tw-flex tw-items-center tw-justify-between tw-max-w-4xl tw-mx-auto tw-w-full tw-p-3 lg:tw-p-0">
      {isAtHome ? (
        <>
          <div className="tw-text-white tw-font-bold tw-py-2 tw-text-lg">
            Virtualized list
          </div>
            <a
            href="https://github.com/J-Zam/virtualization-windowing"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-flex tw-justify-center tw-items-center tw-gap-1 tw-bg-gray-500 hover:tw-bg-gray-600 tw-text-white tw-border-2 tw-border-white tw-py-1 tw-px-2 tw-rounded"
            >
            <FaGithub size={20} style={{ strokeWidth: '1', stroke: 'currentColor', fill: 'currentColor' }}/> <p>Source</p>
            </a>
        </>
      ) : (
        <>
            <button
            className="tw-flex tw-justify-center tw-items-center tw-bg-gray-500 hover:tw-bg-gray-600 tw-text-white tw-border-2 tw-border-white tw-py-1 tw-px-3 tw-rounded"
            onClick={() => navigate(-1)}
            >
            <IoMdArrowBack />Back
            </button>
          <div className="tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-text-lg">
            { location.pathname.split('/')[1]?.charAt(0).toUpperCase() + location.pathname.split('/')[1]?.slice(1) || 'Home'}
          </div>
        </>
      )}

      </section>
    </nav>
  );
}
