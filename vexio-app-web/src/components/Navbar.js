import logo from "../assets/logo.png";
import "../App.css";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        fontSize: "20px",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo" width={100} height={100} />
        <div
          style={{
            paddingRight: "20px",
            paddingTop: "15px",
            paddingBottom: "15px",
            fontSize: "40px",
          }}
        >
          Vexio
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
          }}
        >
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "15px",
              paddingBottom: "15px",
              maxHeight: "max-content",
            }}
            className="navitem"
          >
            Home
          </div>

          <a
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "15px",
              paddingBottom: "15px",
              maxHeight: "max-content",
              textDecoration: "none",
              color: "black",
            }}
            className="navitem"
            href="mailto: ishita@gluelabs.com"
          >
            Contact
          </a>
        </div>
        <div
          style={{
            display: "flex",
            gap: "40px",
          }}
        >
          <a
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "15px",
              paddingBottom: "15px",
              maxHeight: "max-content",
              textDecoration: "none",
              color: "black",
            }}
            className="navitemhover"
            href="/login"
          >
            Login
          </a>
          <a
            style={{
              backgroundColor: "#FF4495",
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingTop: "15px",
              paddingBottom: "15px",
              borderRadius: "150px",
              cursor: "pointer",
              maxHeight: "max-content",
              textDecoration: "none",
              color: "white",
            }}
            href="/signup"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
