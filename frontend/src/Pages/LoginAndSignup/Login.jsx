import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import styles from "./LoginSignup.module.css";
import PopupBox from "../../utils/popupbox/PopupBox";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [popup, setPopup] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  const API_URL = import.meta.env.VITE_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setPopup({
          message: data.message || "Login Successful!",
          type: "success",
          isVisible: true,
        });

        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);

        // Delay navigation to show message
        setTimeout(() => {
          navigate("/root/dashboard");
        }, 2000);
      } else {
        setPopup({
          message: data.message || "Login failed",
          type: "error",
          isVisible: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setPopup({
        message: "Something went wrong. Please try again.",
        type: "error",
        isVisible: true,
      });
    }
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, isVisible: false }));
  };


  return (
    <section>
      {popup.isVisible && (
        <PopupBox
          message={popup.message}
          type={popup.type}
          onClose={closePopup}
        />
      )}

      {Array.from({ length: 200 }).map((_, index) => (
        <span key={index}></span>
      ))}


      <div className={styles.signin}>
        <div className={styles.content}>
          <h2>Login</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <i>Email</i>
            </div>

            <div className={styles.inputBox}>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <i>Password</i>
            </div>

            <div className={styles.inputBox}>
              <input type="submit" value="Login" />
            </div>

            <p className="text-sm text-gray-400 text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="bg-gradient-to-r from-sky-400 to-purple-400 
           bg-clip-text text-transparent hover:underline"
              >
                Sign Up{" "}
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
