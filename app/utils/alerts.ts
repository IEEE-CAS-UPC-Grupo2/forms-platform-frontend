import Swal from "sweetalert2";

export const showConfirmationAlert = async (title: string, text: string) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    iconColor: "#C20000",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    customClass: {
      confirmButton: "btn-yes",
      cancelButton: "btn-cancel",
    },
    buttonsStyling: true,
  });

  return result.isConfirmed;
};

const injectSweetAlertStyles = () => {
  if (!document.getElementById("sweetalert-styles")) {
    const style = document.createElement("style");
    style.id = "sweetalert-styles";
    style.innerHTML = `
      .swal2-popup .btn-yes {
        background-color: #155544;
        border-color: #155544;
        color: white;
      }
      .swal2-popup .btn-cancel {
        background-color: transparent;
        border-color: #ccc;
        color: #333;
      }
    `;
    document.head.appendChild(style);
  }
};

injectSweetAlertStyles();
