import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MatchForm = ({ setIsLoggedIn ,match, onFormSubmit }) => {
const navigate=useNavigate;
   useEffect(() => {
          const token = localStorage.getItem('adminToken');
          if (!token ) {
              navigate('/admin/login');
          }
          else{
            setIsLoggedIn(true)
          }
      }, []);
  const isEditMode = !!match;

  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    matchTime: "",
    oddsTeamA: "",
    oddsTeamB: "",
    oddsDraw: "",
    status: "Scheduled",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Populate the form when in edit mode
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        teamA: match.teamA,
        teamB: match.teamB,
        matchTime: match.matchTime,
        oddsTeamA: match.oddsTeamA,
        oddsTeamB: match.oddsTeamB,
        oddsDraw: match.oddsDraw,
        status: match.status,
      });
    }
  }, [match, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // Update match
        await axios.put(`http://localhost:8080/api/live-matches/admin/matches/${match.id}`, formData);
        setSuccessMessage("Match updated successfully!");
      } else {
        // Create new match
        await axios.post("http://localhost:8080/api/live-matches/admin/matches", formData);
        setSuccessMessage("Match created successfully!");
      }
      setErrorMessage("");

      // Notify parent component of the form submission
      if (onFormSubmit) onFormSubmit();

      // Reset form in create mode
      if (!isEditMode) {
        setFormData({
          teamA: "",
          teamB: "",
          matchTime: "",
          oddsTeamA: "",
          oddsTeamB: "",
          oddsDraw: "",
          status: "Scheduled",
        });
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mt-5 bg-image mask" style={{ position: 'relative' ,marginBottom:'40px'}} >
      <div className="image-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/images/pngegg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: 0.5, // Adjust the opacity here
        zIndex: 1 // Ensure this is below the content
    }}></div>
      <div className="row" style={{ position: 'relative', zIndex: 1000 }}>
        <div className="col-md-5">
          <div className="">
            <div className="">
              <h3 className="mb-4 text-primary">{isEditMode ? "Update Match" : "Create a New Match"}</h3>
              {successMessage && <div className="alert alert-success mt-1">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className=""><h6>Team A</h6> </label>
                  <input
                    type="text"
                    className="form-control"
                    name="teamA"
                    value={formData.teamA}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label><h6>Team B</h6></label>
                  <input
                    type="text"
                    className="form-control"
                    name="teamB"
                    value={formData.teamB}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label><h6>Match Time</h6></label>
                  <input
                    type="datetime-local"  placeholder="10/23/2025 06:30PM"
                    className="form-control"
                    name="matchTime"
                    value={formData.matchTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label><h6>Odds Team A</h6></label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="oddsTeamA"
                    value={formData.oddsTeamA}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label><h6>Odds Team B</h6></label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="oddsTeamB"
                    value={formData.oddsTeamB}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label><h6>Odds Draw</h6></label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="oddsDraw"
                    value={formData.oddsDraw}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label><h6>Status</h6></label>
                  <select
                    className="form-control"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  {isEditMode ? "Update Match" : "Create Match"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchForm;
