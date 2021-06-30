import React, { useState } from "react";
import "../../../../styles/login.css";

const AuthLoginScreen = () => {

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        alert("form submit")
    }

  return (
    <main className="login">
      <div className="login__form">
        <h1>Inicio de Sesión</h1>
        <form className="formulario" onSubmit={handleSubmit}>
          <label for="">Email:</label>
          <input
            type="email"
            name="email"
            className="formulario__input"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <label for="">Password:</label>
          <input
            type="password"
            name="password"
            className="formulario__input"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button className="formulario__submit" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </main>
  );
};

export default AuthLoginScreen;
