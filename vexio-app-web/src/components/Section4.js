import discussion from "../assets/discussion.jpg";

export default function Section4() {
  return (
    <div
      style={{
        marginTop: "150px",
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <img
          src={discussion}
          alt="discussion"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: '40px'
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "120px",
            right: "120px",
            borderRadius: "100%",
            backgroundColor: "#FF4495",
            opacity: 0.7,
            padding: "100px",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#fff",
              // text-transform: capitalize;
              marginBottom: "30px",
              // display: block
              textAlign: "center",
            }}
          >
            Interested To
            <br /> Digging Deeper?
          </div>
          <div
            style={{
              // fontFamily: "Jost",sans-serif;
              color: "#545454",
              fontSize: "16px",
              lineHeight: "18px",
              marginBottom: "15px",
              fontWeight: "normal",
              textAlign: "center",
              // lineHeight: 1.5
            }}
          >
            We’re out to create purposeful spaces that balance art
            <br /> and creativity with science and strategy.
          </div>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px",
              border: "1px solid #fff",
              color: "#fff",
              background: "none",
              maxWidth: "max-content",
              textTransform: "normal",
              padding: "15px 34px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "1px",
              transition: "color 0.4s linear",
              overflow: "hidden",
              borderRadius: "30px",
            }}
          >
            Contact Us
          </div>
        </div>
      </div>
    </div>
  );
}
