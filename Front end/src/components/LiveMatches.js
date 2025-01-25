import React, { useEffect, useState } from "react";
import axios from "axios";

import '../App.css';

const LiveMatches = () => {
    const [matches, setMatches] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);

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
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <div>
            <h4 className="text-primary mt-5 text-center">Live Matches</h4>


            <section className="py-5 ">
                <div className="container">
                    <div className="row g-4">
                        {matches.length > 0 ? (
                            matches.map((match) => (
                                <div key={match.id} className="col-md-4">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold">{match.teamA} vs {match.teamB}</h5>
                                            <p className="card-text">
                                                Match Time: {new Date(match.matchTime).toLocaleString()} and Status: {match.status} and
                                                Odds: {match.oddsTeamA} (Team A) | {match.oddsDraw} (Draw) | {match.oddsTeamB} (Team B)
                                            </p>
                                            <button onClick={togglePopup} className="btn btn-primary">
                                                View Matches
                                            </button>
                                            <button onClick={togglePopup} className="btn btn-primary mx-2"> View Matches
                                            </button>
                                            {isPopupVisible && (
                                                <div className="overlay">
                                                    <div className="popup">
                                                        <h5 className="card-title fw-bold">{match.teamA} vs {match.teamB}</h5>
                                                        <p className="card-text">
                                                            Match Time: {new Date(match.matchTime).toLocaleString()} and Status: {match.status} and
                                                            Odds: {match.oddsTeamA} (Team A) | {match.oddsDraw} (Draw) | {match.oddsTeamB} (Team B)
                                                        </p>

                                                        <button className="btn btn-secondary" onClick={togglePopup}>
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h5 className="text-primary mt-5 text-center">No live matches Available right now.</h5>
                        )}

                    </div>
                </div>
            </section>

        </div>
    );
};

export default LiveMatches;
