export default function Reviews() {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          fontSize: "22px",
          fontWeight: 500,
          color: "#012970",
        }}
      >
        Review Requests
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <table style={{}}>
          <thead
            style={{
              backgroundColor: "#FEDBEE",
            }}
          >
            <tr
              style={{
                backgroundColor: "#FEDBEE",
              }}
            >
              <td
                style={{
                  padding: "10px 15px",
                  borderRadius: "6px",
                }}
              >
                Order Id
              </td>
              <td
                style={{
                  padding: "10px 15px",
                  borderRadius: "6px",
                }}
              >
                Product
              </td>
              <td
                style={{
                  padding: "10px 15px",
                  borderRadius: "6px",
                }}
              >
                Customer
              </td>
              <td
                style={{
                  padding: "10px 15px",
                  borderRadius: "6px",
                }}
              >
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>No Orders yet!</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
