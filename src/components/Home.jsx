import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const events = [
    { name: "Marriage", link: "/marriage", color: "from-pink-500 to-rose-400" },
    { name: "Event", link: "/event", color: "from-indigo-500 to-blue-400" },
    { name: "Bartabanda", link: "/bartabanda", color: "from-amber-500 to-orange-400" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
          Automatic Agreement Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Generate professional event agreements instantly — beautifully and easily.
        </p>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {events.map((event) => (
          <div
            key={event.name}
            onClick={() => navigate(event.link)}
            className={`relative group bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300`}
          >
            {/* Gradient Accent */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br ${event.color}`}
            ></div>

            {/* Content */}
            <div className="relative p-10 text-center flex flex-col items-center justify-center h-full z-10">
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                {event.name}
              </h2>
              <p className="text-gray-500 mt-3 group-hover:text-gray-100 text-sm">
                Create a custom agreement for {event.name.toLowerCase()} in minutes.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-12 text-gray-400 text-sm">
        © {new Date().getFullYear()} Agreement Generator | Crafted with ❤️ by Nepal Leadership Technology
      </p>
    </div>
  );
};

export default Home;
