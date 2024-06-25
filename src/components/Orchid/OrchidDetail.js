import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrchid } from "../../hooks/useOrchid";
import { Rating } from "./Rating";
import { getOrchidById } from "../../api/OrchidsAPI";

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
    <div className="container" style={{ textAlign: "left" }}>
      <div className="row mt-4 mb-4">
        <div className="col-md-4">
          <div className="row" style={{ textAlign: "center", marginBottom: "10px" }}>
            <div className="col-12">
              <img
                src={orchid?.image}
                alt={orchid?.name}
                style={{ width: "350px", height: "350px" }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-8">
              <h5>{Rating(orchid?.rating)}</h5>
              <h4>
                {orchid?.name}
                {
                  <span style={{ color: "Red" }}>
                    {orchid?.isSpecial ? " (Special)" : ""}
                  </span>
                }
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
            </div>
          </div>
        </div>
        {
          orchidSameCategory.length > 0 && (
            <h2 className="mt-4">Same Category: </h2>
          )
        }
        {
          orchidSameCategory.map((orchid) => {
            return (
              <div className="col-md-2 mb-4 me-4 orchid-item" key={orchid.id}>
                <Link className="text-dark" to={"/detail/" + orchid.id} >
                  <img
                    src={orchid.image}
                    alt=""
                    style={{
                      marginTop: "12px",
                      width: "100%",
                      height: "250px",
                    }}
                  />
                  <p className="fw-bold">Name: {orchid.name}</p>
                  <p>{Rating(orchid.rating)}</p>
                  <p>Category: {orchid.category}</p>
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
