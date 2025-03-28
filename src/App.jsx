import { useState } from "react";
import "./App.css";

import toast, { Toaster } from "react-hot-toast";

function App() {
  const [totalPlayers, setTotalPlayers] = useState("");
  const [numTeams, setNumTeams] = useState("");
  const [teams, setTeams] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getTeamName = (index) => {
    return `Team ${String.fromCharCode(65 + index)}`;
  };

  const handleRandomize = () => {
    const players = parseInt(totalPlayers);
    const teamsCount = parseInt(numTeams);

    if (!players || !teamsCount || players < teamsCount) {
      toast.error(
        "Please enter valid numbers. Total players must be greater than number of teams."
      );

      return;
    }

    const playerNumbers = Array.from({ length: players }, (_, i) => i + 1);
    const shuffledPlayers = shuffleArray([...playerNumbers]);

    const playersPerTeam = Math.floor(players / teamsCount);
    const extraPlayers = players % teamsCount;

    const newTeams = [];
    let playerIndex = 0;

    for (let i = 0; i < teamsCount; i++) {
      const teamSize = playersPerTeam + (i < extraPlayers ? 1 : 0);
      const team = shuffledPlayers.slice(playerIndex, playerIndex + teamSize);
      newTeams.push(team);
      playerIndex += teamSize;
    }

    setTeams(newTeams);
    // Reset inputs
    setTotalPlayers("");
    setNumTeams("");
  };

  const handleReset = () => {
    setTotalPlayers("");
    setNumTeams("");
    setTeams([]);
  };

  return (
    <main className="relative">
      <Toaster />
      <div className="min-h-screen h-full w-full">
        <div className="flex-1 h-full w-full bg-gradient-to-r from-purple-400 to-purple-950">
          <div className="sm:py-8 py-4 flex flex-col min-h-screen h-full gap-10 xl:px-24 lg:px-16 sm:px-10 px-4 w-full">
            <div>
              <img
                src="/FootyFate_Transparent (1).png"
                alt="FootyFate logo"
                className="object-contain sm:w-20 w-14 h-auto"
              />
            </div>
            <div className="w-full flex items-center justify-center flex-1 h-full pb-14 pt-8">
              <div className="max-w-lg w-full bg-white rounded-2xl p-8 max-sm:px-4 space-y-4">
                <h1 className="text-2xl font-bold text-center mb-1 text-purple-950">
                  Welcome to FootyFate
                </h1>
                <p className="text-sm text-center text-gray-500 mb-4">
                  Determine your fate in today's match
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total Players
                    </label>
                    <input
                      type="number"
                      value={totalPlayers}
                      onChange={(e) => setTotalPlayers(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 px-2 h-10 outline-none bg-purple-100"
                      placeholder="Enter total players (e.g., 30) "
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Teams
                    </label>
                    <input
                      type="number"
                      value={numTeams}
                      onChange={(e) => setNumTeams(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 px-2 h-10 outline-none bg-purple-100"
                      placeholder="Enter number of teams (e.g., 5)"
                    />
                  </div>

                  <div className="flex flex-wrap space-x-4">
                    <button
                      onClick={handleRandomize}
                      className="flex-1 whitespace-nowrap max-sm:text-sm w-full transition-all duration-300 bg-purple-950 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
                    >
                      Randomize
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 whitespace-nowrap w-full max-sm:text-sm transition-all duration-300 bg-purple-200 hover:bg-purple-300 text-purple-950 font-bold py-2 px-4 rounded"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {teams.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Teams:</h2>
                    <div className="space-y-4">
                      {teams.map((team, index) => (
                        <div key={index} className="bg-purple-100 p-3 rounded">
                          <h3 className="font-medium text-purple-950">
                            {getTeamName(index)} ({team.length} players):
                          </h3>
                          <div className="flex flex-wrap space-x-2 mt-2">
                            {team.map((player) => (
                              <div
                                key={player}
                                className="w-12 h-12 bg-white flex items-center justify-center rounded text-purple-950 font-medium"
                              >
                                {player}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
