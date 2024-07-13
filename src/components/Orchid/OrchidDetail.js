import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrchid } from "../../hooks/useOrchid";
import { Rating } from "./Rating";
import { getOrchidById } from "../../api/OrchidsAPI";
import { Badge, Card, Col, Container, Image, Row } from "react-bootstrap";

export default function OrchidDetail() {
  const { id } = useParams();
  const orchidList = useOrchid();
  const [orchid, setOrchid] = useState(null);
  const [orchidSameCategory, setOrchidSameCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrchidDetails = async () => {
      const foundOrchid = await getOrchidById(id);
      if (!foundOrchid) navigate("/");
      const sameCategory = orchidList
        .filter(
          (o) => o.category === foundOrchid.category && o.id !== foundOrchid.id
        )
        .slice(0, 4);
      setOrchidSameCategory(sameCategory);
      setOrchid(foundOrchid);
    };
    fetchOrchidDetails();
  }, [id, orchidList, navigate]);

  return (
    <Container style={{ textAlign: "left" }}>
      <Row className="mt-4 mb-4">
        <Col md={4}>
          <Row style={{ textAlign: "center", marginBottom: "10px" }}>
            <Col>
              <Image
                src={orchid?.image}
                alt={orchid?.name}
                style={{ width: "350px", height: "350px" }}
                fluid
              />
            </Col>
          </Row>
        </Col>
        <Col md={8}>
          <Row>
            <Col>
              <h5>{Rating(orchid?.rating)}</h5>
              <h4>
                {orchid?.name}
                {orchid?.isSpecial && (
                  <Badge bg="danger" className="ms-2">
                    Special
                  </Badge>
                )}
              </h4>
              <hr />
              <div>
                Id: <span style={{ color: "grey" }}> {orchid?.id}</span>
              </div>
              <div>
                Color: <span style={{ color: "grey" }}> {orchid?.color}</span>
              </div>
              <div>
                Origin:
                <span style={{ color: "grey" }}> {orchid?.origin}</span>
              </div>
              <div>
                Category:
                <span style={{ color: "grey" }}> {orchid?.category}</span>
              </div>
              <div>
                Discription:
                <span style={{ color: "grey", marginLeft: "5px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris consequat quam ac justo facilisis, vitae gravida mi
                  fringilla. Mauris vel placerat ligula. Maecenas tempus purus
                  ut nisi pellentesque sollicitudin. Nunc velit neque, finibus
                  ut odio ut, vestibulum molestie neque. Donec sagittis bibendum
                  nisi vel ullamcorper. Vivamus nec consequat mauris. Quisque
                  imperdiet, ex vel consectetur congue, tortor elit gravida
                  libero, quis dignissim nisi leo sed augue. Ut metus arcu,
                  malesuada ut pharetra sed, sodales ullamcorper turpis.
                </span>
              </div>
              <hr />
            </Col>
          </Row>
        </Col>
        {orchidSameCategory.length > 0 && (
          <Col>
            <h2 className="mt-4">Same Category: </h2>
            <Row className="mt-4">
              {orchidSameCategory.map((orchid) => (
                <Col key={orchid.id} md={3} className="mb-4">
                  <Card style={{ width: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={orchid.image}
                      alt=""
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{orchid.name}</Card.Title>
                      <Card.Text>
                        <p>{Rating(orchid.rating)}</p>
                        <p>Category: {orchid.category}</p>
                      </Card.Text>
                      <Link className="btn btn-outline-dark" to={`/detail/${orchid.id}`}>
                        View Details
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}
