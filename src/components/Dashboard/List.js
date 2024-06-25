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
import { useDebouncedCallback } from "use-debounce";

export default function List() {
  const [orchidList, setOrchidList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [debouncedTxtSearch, setDebouncedTxtSearch] = useState('');
  const [txtSearch, setTxtSearch] = useState('');

  const debouncedTxtSearchChange = useDebouncedCallback(
    (txtSearch) => {
      setDebouncedTxtSearch(txtSearch);
    },
    1000
  );

  const handleTxtSearch = (e) => {
    const value = e.target.value;
    setTxtSearch(value);
    debouncedTxtSearchChange(value);
  };
  
  useEffect(() => {
    fetchOrchids(debouncedTxtSearch);
  }, [isRefresh, debouncedTxtSearch]);

  const fetchOrchids = async (debouncedTxtSearch) => {
    const data = await getAllOrchids();
    if (debouncedTxtSearch) {
      const filterByName = data.filter((orchid) =>
        orchid.name.toLowerCase().includes(debouncedTxtSearch.toLowerCase())
      );
      setOrchidList(filterByName);
    } else {
      setOrchidList(data);
    }
    setIsRefresh(false);
  };

  return (
    <Container className="mt-4" style={{ textAlign: "start" }}>
      <div className="d-flex mb-2" style={{ justifyContent: "space-between" }}>
        <h1 className="fw-bold">List Orchid</h1>
        <div className="mt-2">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name..."
                value={txtSearch}
                onChange={handleTxtSearch}
              />
            </div>
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
                  />
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
