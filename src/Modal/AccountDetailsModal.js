import React from "react";

const AccountDetailsModal = ({ email, bio }) => {
  return (
    <div>
      <div id="modal-account" className="modal">
        <div className="modal-content center-align">
          <h4>Account details</h4>
          <br />
          {email && (
            <div>
              <div className="account-details">Logged In as {email} </div>
              <div className="account-details">Bio {bio} </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsModal;
