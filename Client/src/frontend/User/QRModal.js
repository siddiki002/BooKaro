import QRCode from "react-qr-code";

import "../Home/Home.css";
import "./User.css";

export default function QRModal({ modal, setModal }) {
  function handleClose() {
    setModal({
      key: 0,
      show: false,
    });
  }

  return (
    <div
      className="modal"
      style={{ display: modal.show ? "Block" : "None" }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-title">QR Code</div>

        <div className="QR-modal-body">
          <QRCode
            size={256}
            style={{ height: "75%", maxWidth: "75%", width: "auto" }}
            value={modal.key}
            viewBox={`0 0 256 256`}
          />
        </div>

        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
