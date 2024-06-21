
import Swal from "sweetalert2";

export const LogoutModal = ({ handleLogout }) => {

  const handleLogoutConfirmation = () => {
    Swal.fire({
      icon: "warning",
      html: `
        <h4>Confirm Logout.</h4>
        <div>Are you sure you want to log out now?</div>`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        handleLogout();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <div
        style={{ cursor: "pointer", color: "black" }}
        onClick={handleLogoutConfirmation}
      >
        Logout
      </div>
    </>
  );
};
