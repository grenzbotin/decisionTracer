import React from "react";
import Container from "@material-ui/core/Container";

const Footer: React.FC = () => {
  return (
    <footer style={{ marginTop: "calc(5% + 30px)", bottom: 0 }}>
      <Container maxWidth="xl">Footer</Container>
    </footer>
  );
};

export default Footer;
