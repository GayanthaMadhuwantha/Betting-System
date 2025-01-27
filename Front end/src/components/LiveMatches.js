import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import '../App.css';

const LiveMatches = () => {
    const [matches, setMatches] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLiveMatches = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/live-matches/all");
                setMatches(response.data);
            } catch (error) {
                console.error("Error fetching live matches:", error);
            }
        };

        fetchLiveMatches();
    }, []);

    const togglePopup = (match) => {
        setSelectedMatch(match);
        setPopupVisible(!isPopupVisible);
    };

    const handleBetNow = (match) => {
        // Redirect to Place Bet page with match details
        navigate("/place-bet", { state: { match } });
    };

    return (
        <div>
            <h4 className="text-primary mt-5 text-center">Live Matches</h4>
            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        {matches.length > 0 ? (
                            matches.map((match) => (
                                <div key={match.id} className="col-md-4">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold">{match.teamA} vs {match.teamB}</h5>
                                            <p className="card-text">
                                                Match Time: {new Date(match.matchTime).toLocaleString()} <br />
                                                Status: {match.status} <br />
                                                Odds: {match.oddsTeamA} (Team A) | {match.oddsDraw} (Draw) | {match.oddsTeamB} (Team B)
                                            </p>
                                            <button onClick={() => togglePopup(match)} className="btn btn-primary">
                                                View Match
                                            </button>
                                            <button
                                                onClick={() => handleBetNow(match)}
                                                className="btn btn-success mx-2"
                                            >
                                                Bet Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h5 className="text-primary mt-5 text-center">No live matches available right now.</h5>
                        )}
                    </div>
                </div>
            </section>

            {isPopupVisible && selectedMatch && (
                <div className="overlay">
                    <div className="popup">
                        <h5 className="card-title fw-bold">
                            {selectedMatch.teamA} vs {selectedMatch.teamB}
                        </h5>
                        <p className="">
                            Match Time: {new Date(selectedMatch.matchTime).toLocaleString()} <br />
                            Status: {selectedMatch.status} <br />
                            Odds: {selectedMatch.oddsTeamA} (Team A) | {selectedMatch.oddsDraw} (Draw) | {selectedMatch.oddsTeamB} (Team B)
                        </p>
                        <button className="btn btn-secondary" onClick={togglePopup}>
                            Close
                        </button>
                        <button
                            className="btn btn-success mx-2"
                            onClick={() => handleBetNow(selectedMatch)}
                        >
                            Bet Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveMatches;

