import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../css/ReportPopup.css";
import Button from "@mui/material/Button";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReportPopup(): JSX.Element {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState({ issue: "", name: "" });
  const [reportSubmitPending, setReportSubmitPending] =
    useState<boolean>(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitPending(true);

    // EmailJS parameters
    const serviceID = "service_trtsr6r";
    const templateID = "template_36c2tsk";
    const publicKey = "Zbgg247UHBfHgQ1tk";

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(() => {
        console.log("Email sent successfully!");
        setPopupVisible(false); // Close the popup
      })
      .catch((error: string | null) => {
        console.error("Failed to send email:", error);
        setReportSubmitPending(false);
      });
  };

  return (
    <div>
      {/* Button to open the popup */}
      <Button id="report-btn" variant="contained" type="button" onClick={togglePopup} className="text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300">
        <FontAwesomeIcon icon={faFlag} className="mr-2" /> Report
      </Button>

      {/* Conditional Popup */}
      {popupVisible && (
        <div id="RP-1" className="popup">
          <div id="RP-2" className="popup-content">
            <button className="close-button" onClick={togglePopup}>
              ✖
            </button>
            <h2 className="popup-title">Report an Issue</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="issue">Describe the Issue:</label>
                <textarea
                  id="issue"
                  name="issue"
                  rows={4}
                  value={formData.issue}
                  onChange={handleChange}
                  required
                  className="textarea"
                ></textarea>
              </div>
              <Button
              id="report-popup-button"
                variant="contained"
                type="submit"
                disabled={reportSubmitPending}
                className="text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300"
              >
                {reportSubmitPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportPopup;