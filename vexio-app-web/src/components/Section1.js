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
        alignItems: 'center'
      }}
    >
      <div>
        <div
          style={{
            fontSize: "70px",
          }}
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
          We build effective strategies to help you get
          <br /> reviews by customers and prospects across the entire web.
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
            maxWidth: "max-content",
            marginTop: "50px",
            fontSize: "20px",
            color: "white",
            //   fontWeight: ""
          }}
        >
          Explore Services
        </div>
      </div>
      <img
        src={illustration}
        alt="reviews"
        height={550}
        width={550}
        style={{
          borderRadius: "100%",
        }}
      />
    </div>
  );
}
