const Modal = ({
  showModal,
  closeModal,
  handleFeedbackSubmission,
  feedback,
  setFeedback,
}) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal">
            <div className="modal-box">
              <div className="modal-header">
                <h3 className="modal-title">Provide Feedback</h3>
                <button
                  onClick={closeModal}
                  className="modal-close"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter feedback here..."
                  className="form-control mb-4"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  onClick={handleFeedbackSubmission}
                  className="btn btn-primary mr-2"
                >
                  Submit
                </button>
                <button onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
