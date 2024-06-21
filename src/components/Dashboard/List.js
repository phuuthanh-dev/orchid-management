import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Badge,
  Container,
  Image,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { DeleteOrchidModal } from "../Modal/DeleteOrchid";
import { getAllOrchids } from "../../api/OrchidsAPI";
import { EditOrchidModal } from "../Modal/EditOrchid";
import { AddOrchidModal } from "../Modal/AddOrchid";

export default function List() {
  const [orchidList, setOrchidList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  
  useEffect(() => {
    fetchOrchids();
  }, [isRefresh]);

  const fetchOrchids = async () => {
    const data = await getAllOrchids();
    setOrchidList(data);
    setIsRefresh(false);
  };

  return (
    <Container className="mt-4" style={{ textAlign: "start" }}>
      <div className="d-flex mb-2" style={{ justifyContent: "space-between" }}>
        <h1 className="fw-bold">List Orchid</h1>
        <AddOrchidModal setIsRefresh={setIsRefresh} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th style={{ width: "25%" }}>Name of Orchid</th>
            <th>Color</th>
            <th>Origin</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orchidList.map((orchid) => (
            <tr key={orchid.id}>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      {orchid.isAttractive ? "Attractive" : "Not Attractive"}
                    </Tooltip>
                  }
                >
                  <Badge bg="success" pill>
                    <Image
                      src={orchid.image}
                      roundedCircle
                      width={100}
                      style={{ height: "100px" }}
                      fluid
                    />
                  </Badge>
                </OverlayTrigger>
              </td>
              <td>{orchid.name}</td>
              <td>{orchid.color}</td>
              <td>{orchid.origin}</td>
              <td>{orchid.category}</td>
              <td>
                <div className="d-flex gap-2">
                  <EditOrchidModal
                    orchid={orchid}
                    setIsRefresh={setIsRefresh}
                  ></EditOrchidModal>
                  <DeleteOrchidModal
                    orchid={orchid}
                    setIsRefresh={setIsRefresh}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
