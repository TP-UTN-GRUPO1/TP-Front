import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const confirmDialog = async ({
  title,
  text,
  confirmButtonText = "Sí",
  cancelButtonText = "Cancelar",
}) => {
  const result = await MySwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });
  return result.isConfirmed;
};

export const okAlert = ({ title, text }) => {
  MySwal.fire({ title, text, icon: "success" });
};

export const errorAlert = ({ title, text }) => {
  MySwal.fire({ title, text, icon: "error" });
};
