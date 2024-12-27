import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
    return(
    <!-- Background image -->
    <div id="intro" className="bg-image shadow-2-strong">
        <div className="mask d-flex align-items-center h-100" style="background-color: rgba(0, 0, 0, 0.8);">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-md-8">
                        <form className="bg-white rounded shadow-5-strong p-5">
                            <!-- Email input -->
                            <div className="form-outline mb-4" data-mdb-input-init>
                                <input type="email" id="form1Example1" className="form-control" />
                                <label className="form-label" htmlFor="form1Example1">Email address</label>
                            </div>

                            <!-- Password input -->
                            <div className="form-outline mb-4" data-mdb-input-init>
                                <input type="password" id="form1Example2" className="form-control" />
                                <label className="form-label" htmlFor="form1Example2">Password</label>
                            </div>

                            <!-- 2 column grid layout for inline styling -->
                            <div className="row mb-4">
                                <div className="col d-flex justify-content-center">
                                    <!-- Checkbox -->
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                        <label className="form-check-label" htmlFor="form1Example3">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <div className="col text-center">
                                    <!-- Simple link -->
                                    <a href="#!">Forgot password?</a>
                                </div>
                            </div>

                            <!-- Submit button -->
                            <button type="submit" className="btn btn-primary btn-block" data-mdb-ripple-init>Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Background image -->
<!--Main Navigation-->

<!--Footer-->
);
};

export default Login;