import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        fontSize: "20px",
        justifyContent: "space-between",
        alignItems: "center",
        //   fontFamily: "Times New Roman",
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
        >
          Home
        </div>
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "15px",
            paddingBottom: "15px",
            maxHeight: "max-content",
          }}
        >
          About
        </div>
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "15px",
            paddingBottom: "15px",
            maxHeight: "max-content",
          }}
        >
          Services
        </div>
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "15px",
            paddingBottom: "15px",
            maxHeight: "max-content",
          }}
        >
          Contact
        </div>
      </div>
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
        >
          Login
        </div>
        <div
          style={{
            backgroundColor: "#FF4495",
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingTop: "15px",
            paddingBottom: "15px",
            borderRadius: "150px",
            cursor: "pointer",
            maxHeight: "max-content",
            color: 'white'
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}
