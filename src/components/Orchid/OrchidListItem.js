import { Link } from "react-router-dom";
import { Rating } from "./Rating";
import Card from "react-bootstrap/Card";

export default function OrchidListItem(props) {
  const orchid = props.orchid;
  return (
    <div className="col-md-4 mt-4">
      <Card>
        <div key={orchid.id}>
          <Link to={"/detail/" + orchid.id}>
            <div
              className="orchid-image-container"
              style={{
                position: "relative",
                padding: "5px",
                width: "100%",
                height: "250px",
                overflow: "hidden",
              }}
            >
              <img
                src={orchid.image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>
            <Card.Body>
              <Card.Title
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "start",
                  color: "black",
                }}
              >
                {orchid.name}
                {
                  <span style={{ color: "red" }}>
                    {orchid?.isSpecial ? " (Special)" : ""}
                  </span>
                }
              </Card.Title>
              <div className="row" role="group">
                <div className="col-12" style={{ textAlign: "start" }}>
                  <span>{Rating(orchid.rating)}</span>
                  <br />
                  <span className="mt-4 text-dark">{`Category: ${orchid.category}`}</span>
                </div>
              </div>
              <Link className="mt-2 btn btn-outline-dark" to={`/detail/${orchid.id}`}>
                View Details
              </Link>
            </Card.Body>
          </Link>
        </div>
      </Card>
    </div>
  );
}
