import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../hooks/useCategory";
import { addOrchid } from "../../api/OrchidsAPI";
import Swal from "sweetalert2";

export const AddOrchidModal = ({ setIsRefresh }) => {
  const categories = useCategory();
  const [show, setShow] = useState(false);

  const handleShowJewelryDetail = () => setShow(true);

  const handleCloseJewelryDetail = () => setShow(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      rating: "",
      isSpecial: "",
      image: "",
      color: "",
      origin: "",
      category: "",
      date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      rating: Yup.number()
        .required("Rating is required.")
        .min(0, "Rating must be between 0 and 5.")
        .max(5, "Rating must be between 0 and 5."),
      image: Yup.string().required("URL is required.").url("Invalid url"),
      isSpecial: Yup.boolean(),
      color: Yup.string().required("Color is required."),
      origin: Yup.string().required("Origin is required."),
      category: Yup.string().required("Category is required."),
      date: Yup.date()
        .required("Date is required.")
        .max(new Date(), "Date cannot be in the future."),
    }),
    onSubmit: async (values) => {
      try {
        const addResult = await addOrchid(values);
        if (addResult) {
          Swal.fire({
            icon: "success",
            title: "Orchid added successfully.",
          });
          formik.resetForm();
          setIsRefresh(true);
          handleCloseJewelryDetail();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to add orchid.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to add orchid.",
          text: error.message,
        });
      }
    },
  });

  const handleSubmitForm = () => {
    formik.submitForm();
  };

  return (
    <>
      <Button
        variant="outline-success"
        size="md"
        onClick={handleShowJewelryDetail}
      >
        Add Orchid
      </Button>
      {show && (
        <div className="overlay">
          <Modal
            show={show}
            onHide={handleCloseJewelryDetail}
            centered
            backdrop="static"
            size="lg"
            className="p-4"
          >
            <Modal.Header>
              <Modal.Title className="w-100">
                <div className="col-12 text-center">Add Orchid</div>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && (
                    <Alert variant="danger">{formik.errors.name}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter rating"
                    name="rating"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.rating && (
                    <Alert variant="danger">{formik.errors.rating}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.image && (
                    <Alert variant="danger">{formik.errors.image}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter color"
                    name="color"
                    value={formik.values.color}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.color && (
                    <Alert variant="danger">{formik.errors.color}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.date && (
                    <Alert variant="danger">{formik.errors.date}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Origin</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter origin"
                    name="origin"
                    value={formik.values.origin}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.origin && (
                    <Alert variant="danger">{formik.errors.origin}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    aria-label="Default select category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                  >
                    <option value="" disabled>Choose Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.errors.category && (
                    <Alert variant="danger">{formik.errors.category}</Alert>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    name="isSpecial"
                    label="Special"
                    value={formik.values.isSpecial}
                    onChange={formik.handleChange}
                  ></Form.Check>
                  {formik.errors.isSpecial && (
                    <Alert variant="danger">{formik.errors.isSpecial}</Alert>
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={handleCloseJewelryDetail}>
                Đóng
              </Button>
              <Button
                type="button"
                onClick={handleSubmitForm}
                className="btn ms-2 btn-success "
                id="save-profile-tab"
                role="tab"
                aria-controls="account-details"
                aria-selected="false"
              >
                Đồng ý
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};
