import React from "react";

const GuideList = ({ guides }) => {
  return (
    <div>
      <div className="container" style={{ marginTop: "40px", height: "610px" }}>
        <ul className="collapsible z-depth-0 guides" style={{ border: "none" }}>
          {guides.length > 0 ? (
            guides.map((guide) => (
              <li key={guide.id}>
                <div className="collapsible-header grey lighten-4">
                  {guide.title}
                </div>
                <div className="collapsible-body white">{guide.content}</div>
              </li>
            ))
          ) : (
            <li>
              <h5>Login to view data</h5>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GuideList;
