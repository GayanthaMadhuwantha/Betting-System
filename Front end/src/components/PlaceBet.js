import React, { useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";

const PlaceBet = ({setIsLoggedIn}) => {
  const [matchId, setMatchId] = useState("");
  const [betOn, setBetOn] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate;
  const location = useLocation();
  const { match } = location.state || {};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token || !setIsLoggedIn) {
      navigate('/login');
    }
    else{
      if (!match) {
        return <h4>No match selected!</h4>;
        
      }
      setIsLoggedIn(true)
    }
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/bets/place", {
        userId: 1, // Replace with logged-in user ID
        matchId,
        betOn,
        betAmount,
      });

      setMessage("Bet placed successfully!");
    } catch (error) {
      setMessage("Error placing bet: " + error.response.data);
    }
  };

  return (
    <div>
  
      <><h2>Place Bet</h2><h5 className="card-title">{match.teamA} vs {match.teamB}</h5><p>
          Match Time: {new Date(match.matchTime).toLocaleString()} <br />
          Status: {match.status} <br />
          Odds: {match.oddsTeamA} (Team A) | {match.oddsDraw} (Draw) | {match.oddsTeamB} (Team B)
        </p><form onSubmit={handleSubmit}>
            <div>
              <label>Match ID:</label>
              <input
                type="number"
                value={matchId}
                onChange={(e) => setMatchId(e.target.value)}
                required />
            </div>
            <div>
              <label>Bet On:</label>
              <select value={betOn} onChange={(e) => setBetOn(e.target.value)} required>
                <option value="">Select</option>
                <option value="TEAM_A">Team A</option>
                <option value="TEAM_B">Team B</option>
                <option value="DRAW">Draw</option>
              </select>
            </div>
            <div>
              <label>Bet Amount:</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                required />
            </div>
            <button type="submit">Place Bet</button>
          </form></>  
      {message && <p>{message}</p>}

 
    </div>
  );
};

export default PlaceBet;
