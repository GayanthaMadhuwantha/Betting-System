import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoticeManager = ({ isAdmin , setIsLoggedIn}) => {
  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [editingNotice, setEditingNotice] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate;

  // Fetch notices on component load
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if(!token) {
      navigate('/admin/login');
    }
    else{
      fetchNotices();
      setIsLoggedIn(true)
    }
    
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/notices");
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("file", formData.file);

      if (editingNotice) {
        // Update existing notice
        await axios.put(
          `http://localhost:8080/api/notices/${editingNotice.id}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setSuccessMessage("Notice updated successfully!");
      } else {
        // Create new notice
        await axios.post("http://localhost:8080/api/notices", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Notice created successfully!");
      }

      setErrorMessage("");
      setFormData({ title: "", description: "", file: null });
      setEditingNotice(null);
      fetchNotices(); // Refresh notices
    } catch (error) {
      setErrorMessage("Error creating or updating notice. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      description: notice.description,
      file: null, // Reset file input for update
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/notices/${id}`, {
          headers: {
            Authorization: `Basic ${btoa("admin:admin123")}`, // Use appropriate credentials
          },
        });
        alert(response.data); // Show success message
        fetchNotices(); // Refresh the notices list
      } catch (error) {
        console.error("Error deleting notice:", error);
        alert("Failed to delete the notice.");
      }
    }
  };
  

  return (
    <div className="container mt-4">
      <h2 className="text-center">Notices</h2>

      {(isAdmin) && (
        <div className="mt-4">
          <h4>{editingNotice ? "Edit Notice" : "Create Notice"}</h4>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label>File</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              {editingNotice ? "Update Notice" : "Create Notice"}
            </button>
            {editingNotice && (
              <button
                type="button"
                className="btn btn-secondary mt-3 ms-2"
                onClick={() => {
                  setEditingNotice(null);
                  setFormData({ title: "", description: "", file: null });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      )}

      <div className="mt-5">
        <h4>All Notices</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>File</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id}>
                <td>{notice.title}</td>
                <td>{notice.description}</td>
                <td>
                  {notice.filePath && (
                    <a href={`http://localhost:8080/${notice.filePath}`} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  )}
                </td>
                {isAdmin && (
                  <td>
                    <button
                      className="btn btn-warning btn-sm ms-2"
                      onClick={() => handleEdit(notice)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(notice.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticeManager;
