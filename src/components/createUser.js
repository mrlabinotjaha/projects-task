import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/actions/usersActions";

const initialForm = {
  name: "",
  email: "",
};

const CreateUser = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [user, setUser] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const onSaveUser = (e) => {
    e.preventDefault();

    if (!!users.find((userItem) => userItem.email === user.email)) {
      setErrors({ email: "This email is already in use" });
    } else {
      dispatch(addUser(user));
      setUser(initialForm);
      props.handleClose();
    }
  };

  const handleChanges = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setErrors({ ...errors, [field]: "" });
    setUser({ ...user, [field]: value });

    if (!value) {
      setErrors({ ...errors, [event.target.name]: "This field is required" });
    }
  };

  const onClose = () => {
    setUser(initialForm);
    setErrors(initialForm);
    props.handleClose();
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={props.open}
      onClose={onClose}
    >
      <form autoComplete="off" onSubmit={onSaveUser}>
        <DialogTitle id="customized-dialog-title">Create new user</DialogTitle>
        <DialogContent dividers>
          <TextField
            style={{ marginBottom: '20px'}}
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={user.name}
            error={!!errors.name}
            helperText={errors.name}
            required
            onChange={(e) => handleChanges(e)}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={user.email}
            error={!!errors.email}
            helperText={errors.email}
            required
            onChange={(e) => handleChanges(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button color={"secondary"} variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateUser;
