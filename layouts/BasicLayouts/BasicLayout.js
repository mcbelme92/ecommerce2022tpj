import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../../Components/Header/Header";
import classNames from "classnames";
import Image from "next/image";

export default function BasicLayout(props) {
  const { children, className } = props;

  return (
    <Container
      fluid
      className={classNames("basic-layout", {
        [className]: className,
      })}
    >
      <Header />

      <Container className="content">{children}</Container>
    </Container>
  );
}
