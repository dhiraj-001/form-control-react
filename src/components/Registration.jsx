import React, { useState } from "react";
import "./registration.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "./Table";
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
} from "react-bootstrap";

export default function SignUp() {
  let [formData, setFormData] = useState({
    uname: "",
    uphone: "",
    uemail: "",
    index: "",
  });

  let [userData, setUserData] = useState([]);

  let getValue = (event) => {
    let oldData = { ...formData };
    let inputName = event.target.name;
    let inputVal = event.target.value;
    oldData[inputName] = inputVal;
    setFormData(oldData);
  };

  let handleSubmit = (event) => {
    let currentUserData = {
      uname: formData.uname,
      uphone: formData.uphone,
      uemail: formData.uemail,
      index: userData.length,
    };
    if (formData.index === "") {
      let checkfilter = userData.filter(
        (v) => v.uphone == formData.uphone || v.uemail == formData.uemail
      );
      if (checkfilter.length == 1) {
        toast.error("Email or Phone already exist");
      } else {
        let oldUserData = [...userData, currentUserData];
        setUserData(oldUserData);
        setFormData({
          uname: "",
          uphone: "",
          uemail: "",
          index: "",
        });
      }
    } else {
      let editIndex = formData.index;
      let editRowData = userData;

      let checkfilter2 = editRowData.filter(
        (v, i) =>
          (v.uphone == formData.uphone || v.uemail == formData.uemail) &&
          i != editIndex
      );
      if (checkfilter2.length == 0) {
        editRowData[editIndex]['uname'] = formData.uname;
        editRowData[editIndex]['uphone'] = formData.uphone;
        editRowData[editIndex]['uemail'] = formData.uemail;
        setUserData(editRowData);
        setFormData({
          uname: "",
          uphone: "",
          uemail: "",
          index: "",
        });
      } else {
        toast.error("Email or Phone already exist");
      }
    }
    event.preventDefault();
  };

  return (
    <>
      <Container>
        <ToastContainer />
        <Row className="vh-100 vw-80 d-flex justify-content-center align-items-center">
          <Col md={10} lg={8} xs={12}>
            <div className="border-3 border-primary border bg-dark"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold text-uppercase mb-2">
                    React Form Control
                  </h2>
                  {userData.length}
                  <p className="mb-5">Please enter your details to add here</p>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formFullName"
                      >
                        <Form.Label className="text-center">
                          Your full name
                        </Form.Label>
                        <Form.Control
                          onChange={getValue}
                          name="uname"
                          value={formData.uname}
                          type="text"
                          placeholder="Enter name"
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formPhoneNumber"
                      >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          onChange={getValue}
                          name="uphone"
                          value={formData.uphone}
                          type="number"
                          placeholder="Enter phone number"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formUsername"
                      >
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            onChange={getValue}
                            name="uemail"
                            value={formData.uemail}
                            type="email"
                            placeholder="Enter username"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Row>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        {formData.index == "" ? "Set" : "update"}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Table
        userData={userData}
        setUserData={setUserData}
        setFormData={setFormData}
      />
    </>
  );
}
