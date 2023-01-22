import { useState, useEffect } from "react";
import "./App.css";

import Userform from "./Components/Userform";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

//const URL = "http://127.0.0.1:8000/api/crud/";
const URL = "https://sagor995.pythonanywhere.com/api/crud/";

function App() {
  const [users, setUsers] = useState();
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update Operation
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateUserId, setUpdateUserId] = useState("");

  //Delete Operation
  const [showDelete, setShowDelete] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setDeleteUserId(id);
    setShowDelete(true);
  };

  const getUsersData = () => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not get data... Try again later.");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        // console.log(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const handleEdit = (id) => {
    setUpdateUserId(id);
    setUpdateFlag(true);
    const filterUser = users.filter((user) => user.id === id);
    setSelectedUser({
      name: filterUser[0].name,
      email: filterUser[0].email,
      age: filterUser[0].age,
      gender: filterUser[0].gender,
      password: filterUser[0].password,
    });
  };

  const handleDelete = (id) => {
    //console.log(id);
    fetch(URL + `${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not delete.");
        }
        getUsersData();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const addUserData = (user) => {
    console.log(user);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 201) {
          getUsersData();
        } else {
          throw new Error("Could not add new user data.");
        }
      })
      .catch((err) => {
        // console.log(err);
        // console.log(err.message);
        setError(err.message);
      });
  };

  const editUserData = (user) => {
    // console.log(user);
    fetch(URL + `${updateUserId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not update user data.");
        }
        getUsersData();
        setUpdateFlag(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="App" style={{ backgroundColor: "#F9F9FA" }}>
      <h1 className="pt-3">User Management App:</h1>
      {loading && <Alert variant="info">loading...</Alert>}
      <hr />
      {error && <Alert variant="warning">{error}</Alert>}

      {updateFlag ? (
        <Userform
          btnText="Update"
          selectedUser={selectedUser}
          handleAdd={editUserData}
        />
      ) : (
        <Userform handleAdd={addUserData} btnText="Add" />
      )}

      <div style={{ backgroundColor: "#F2F3F2" }}>
        <Container>
          <Row>
            <Col>
              <section className="mb-3">
                {users &&
                  users.map((user, index) => {
                    const { id, name, email, age, gender, password, time } =
                      user;
                    return (
                      <Card
                        key={id}
                        border="dark"
                        style={{
                          width: "18rem",
                          margin: "1rem",
                          padding: ".1rem",
                        }}
                      >
                        <Card.Header>{index + 1}</Card.Header>
                        <Card.Body>
                          <Card.Title>{name}</Card.Title>
                          <Card.Text>{email}</Card.Text>
                          <Card.Text>Code: {password}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>Age: {age}</ListGroup.Item>
                          <ListGroup.Item>
                            {gender === "M" ? "Male" : "Female"}
                          </ListGroup.Item>
                        </ListGroup>

                        <ButtonGroup aria-label="Basic example">
                          <Button
                            variant="outline-warning"
                            onClick={() => {
                              handleEdit(id);
                            }}
                          >
                            Edit
                          </Button>
                          {/* Delete Operation starts */}
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              handleDeleteShow(id);
                            }}
                          >
                            Delete
                          </Button>

                          <Modal show={showDelete} onHide={handleDeleteClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are your sure, You wanna delete this?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="dark"
                                onClick={handleDeleteClose}
                              >
                                Close
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => {
                                  handleDelete(deleteUserId);
                                  handleDeleteClose();
                                }}
                              >
                                Confirm
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </ButtonGroup>
                        {/* Delete Operation ends */}
                        <Card.Footer className="text-muted">
                          Time: {time}
                        </Card.Footer>
                      </Card>
                    );
                  })}
              </section>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
