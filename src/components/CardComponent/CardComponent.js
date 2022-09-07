import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

const CardComponent = (props) => {
  
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{props.header}</CardTitle>
          <CardText>{props.body}</CardText>
          <Button>{props.impact}</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardComponent;
