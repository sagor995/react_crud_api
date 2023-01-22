import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Userform = ({ selectedUser, handleAdd, btnText }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
  });

  const { name, email, age, gender, password } = user;

  useEffect(() => {
    setUser({
      name: selectedUser.name,
      email: selectedUser.email,
      age: selectedUser.age,
      gender: selectedUser.gender,
      password: selectedUser.password,
    });
  }, [selectedUser]);

  const handleChange = (e) => {
    const selectedName = e.target.name;
    const selectedValue = e.target.value;
    setUser((previousState) => {
      return { ...previousState, [selectedName]: selectedValue };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(user);
    // setUser({
    //   name: "",
    //   email: "",
    //   age: "",
    //   gender: "",
    //   password: "",
    // });
  };

  return (
    <Container fluid="lg">
      <Row>
        <Col>
          <div>
            <Form onSubmit={handleSubmit} action="" method="post">
              <Form.Group className="mb-3">
                {/* <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter Your Name..."
                /> */}
                <FloatingLabel label="Name" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    placeholder="Enter Your Name..."
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </FloatingLabel>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel label="Age" className="mb-3">
                  <Form.Control
                    type="number"
                    name="age"
                    id="age"
                    value={age}
                    onChange={handleChange}
                    placeholder="Enter Your Age..."
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAge">
                <Form.Label>Gender: </Form.Label>
                <div className="mb-3">
                  <Form.Check
                    inline
                    label="M"
                    name="gender"
                    type="radio"
                    value="M"
                    onChange={handleChange}
                    id="male"
                  />
                  <Form.Check
                    inline
                    label="F"
                    name="gender"
                    type="radio"
                    value="F"
                    onChange={handleChange}
                    id="female"
                  />
                </div>
              </Form.Group>

              {/* <Form.Group className="mb-3">
                <Form.Label>Gender: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      gender: e.target.value,
                    });
                  }}
                  name="gender"
                  id="gender"
                  value={gender}
                >
                  <option disabled value="DEFAULT">
                    ...
                  </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Form.Select>
              </Form.Group> */}

              <Form.Group className="mb-3">
                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password..."
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <Button variant="success" type="submit">
                  {btnText}
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Userform.defaultProps = {
  selectedUser: {
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    time: "",
  },
};

export default Userform;
