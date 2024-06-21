import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleCredentialResponse = (response) => {
    const decoded = jwtDecode(response.credential);
    localStorage.setItem("token", response.credential)
    setUser(decoded);
    document.getElementById("buttonDiv").hidden = true;
    navigate("/dashboard");
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        setUser(decoded);
        document.getElementById("buttonDiv").hidden = true;
        return;
      }
    }

    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "40613383185-c00d2q8ee5q4ahbg2ttodtad19loo40f.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <Container>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ margin: "50px" }}
      >
        <div id="buttonDiv"></div>
        {user && (
          <div>
            <h5>{user.name}</h5>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Login;
