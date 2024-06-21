import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { deleteOrchidById } from "../../api/OrchidsAPI";

export const DeleteOrchidModal = ({ orchid, setIsRefresh }) => {
  const handleLogoutConfirmation = () => {
    Swal.fire({
      icon: "warning",
      html: `
        <h4>Confirm Delete.</h4>
        <div>Are you sure you want to delete ${orchid.name}?</div>`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        deleteOrchidById(orchid.id).then((response) => {
          if (response) {
            Swal.fire({
              icon: "success",
              title: "Orchid deleted successfully.",
            });
            setIsRefresh(true);
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to delete orchid.",
            });
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <Button
        variant="outline-danger"
        size="md"
        onClick={handleLogoutConfirmation}
      >
        <i className="bi bi-trash"></i> Delete
      </Button>
    </>
  );
};
