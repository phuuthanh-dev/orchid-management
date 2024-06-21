import OrchidList from "../components/Orchid/OrchidList";
import OrchidDetail from "../components/Orchid/OrchidDetail";
import { Contact } from "../components/Contact/Contact";
import { About } from "../components/About/About";
import List from "../components/Dashboard/List";
import Login from "../components/Login/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default function RouterCom() {
  return (
    <Routes>
      <Route path="/" element={<OrchidList />} />
      <Route path="/:category" element={<OrchidList />} />
      <Route path="/detail/:id" element={<OrchidDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<List />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
