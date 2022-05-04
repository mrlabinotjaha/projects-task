import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "@material-ui/icons";
import CreateProject from "../../components/createProject";
import CreateUser from "../../components/createUser";
import { selectProject } from "../../redux/actions/projectsActions";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { users } = useSelector((state) => state.users);
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);


  useEffect(() => {
    const timeOutId = setTimeout(() => handleSearch(searchTerm), 500);
    return () => clearTimeout(timeOutId);
  }, [searchTerm]);

  useEffect(() => {
    setFilteredProjects(projects);
    setSearchTerm("");
  }, [projects]);

  const userName = (id) => {
    return users.find((usr) => usr.id === id).name;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editProject = (id) => {
    const project = projects.find((p) => p.id === id);
    dispatch(selectProject(project));
    setOpenCreateProject(true);
  };

  const createProject = () => {
    dispatch(selectProject({}));
    setOpenCreateProject(true);
  };

  const handleSearch = (searchInput) => {
    const newFilter = projects.filter((project) => {
      return (
        project.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        project.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredProjects(newFilter);
  };

  return (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item>
          <TextField
            id="search"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Button variant="outlined" onClick={() => setOpenCreateUser(true)}>Create user</Button>
        
        <Grid item >
          <Button variant="outlined" color={"primary"} onClick={() => createProject()}>
            Create project
          </Button>
        </Grid>
      </Grid>

      <Paper>
        <TableContainer style={{ marginTop: '40px'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: '600'}}>ID</TableCell>
                <TableCell style={{ fontWeight: '600'}}>Name</TableCell>
                <TableCell style={{ fontWeight: '600'}}>Description</TableCell>
                <TableCell style={{ fontWeight: '600'}}>Owner</TableCell>
                <TableCell style={{ fontWeight: '600'}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project) => (
                  <TableRow key={project.id}>
                    <TableCell component="th" scope="row">
                      {project.id}
                    </TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{userName(project.owner)}</TableCell>
                    <TableCell>
                      <Edit
                        style={{ cursor: "pointer" }}
                        onClick={() => editProject(project.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredProjects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <CreateProject
        open={openCreateProject}
        handleClose={() => setOpenCreateProject(false)}
      />

      <CreateUser
        open={openCreateUser}
        handleClose={() => setOpenCreateUser(false)}
      />
    </>
  );
};

export default ProjectList;
