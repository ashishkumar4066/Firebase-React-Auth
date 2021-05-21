import React from "react";

import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const GuideList = ({ guides }) => {
  return (
    <div>
      <div className="container" style={{ marginTop: "40px", height: "610px" }}>
        {guides.map((guide) => (
          <Accordion key={guide.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{guide.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{guide.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default GuideList;
