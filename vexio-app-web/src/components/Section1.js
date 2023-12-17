import illustration from "../assets/illustration.jpg";

export default function Section1() {
  return (
    <div
      style={{
        display: "flex",
        gap: "80px",
        marginTop: "60px",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
      }}
      className="section1"
    >
      <div>
        <div
          style={{
            fontSize: "70px",
          }}
          className="bring"
        >
          We bring you
          <br /> new reviews
        </div>
        <div
          style={{
            fontSize: "25px",
            marginTop: "15px",
          }}
        >
          We create impactful strategies aimed at securing<br/> reviews from both
          customers and prospects<br/> throughout the entire online landscape.
        </div>
        {/* <a
          style={{
            backgroundColor: "#FF4495",
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingTop: "15px",
            paddingBottom: "15px",
            borderRadius: "150px",
            cursor: "pointer",
            maxWidth: "max-content",
            marginTop: "250px",
            fontSize: "20px",
            color: "white",
            //   fontWeight: ""
          }}
          href="/login"
        >
          Explore Services
        </a> */}
      </div>
      <img
        src={illustration}
        alt="reviews"
        height={550}
        width={550}
        style={{
          borderRadius: "100%",
        }}
        className="illustration"
      />
    </div>
  );
}
