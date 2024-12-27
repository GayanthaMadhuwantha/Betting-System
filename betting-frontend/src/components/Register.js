import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import SuccessModal from "./SuccessModal"; // Import the reusable modal

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to register");
            }

            setShowModal(true); // Show success modal
        } catch (err) {
            alert(err.message || "Something went wrong!");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="container mt-5"
        >
            <div className="w-50 mx-auto card shadow p-4 m-5">
                <h2 className="text-center mb-4">User Registration</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                            {...register("fullName", { required: "Full Name is required" })}
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>
            </div>

            {/* Success Modal */}
            <SuccessModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title="Registration Successful"
                message="You have successfully registered. Welcome to our platform!"
                actionButtonText="Go to Login"
                onAction={() => { setShowModal(false); navigate("/login"); }}
            />
        </motion.div>
    );
};

export default Register;
