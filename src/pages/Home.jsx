import React, { useEffect, useState } from "react";
import "../styles/home.css";
import {
  Avatar,
  MenuItem,
  IconButton,
  Menu,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AccountCircleOutlined, MoreVert } from "@material-ui/icons";
import ProjectCard from "../components/ProjectCard";
import { getUser, setUser } from "../services/userService";
import api from "../services/api";

export default function Home() {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const options = ["Sair"];
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [newProjectName, setNewProjectName] = useState();
  const openMenu = Boolean(menuAnchorEl);
  const user = getUser();

  useEffect(() => {
    api.get(`/project/user/${user.iduser}`).then((p) => {
      console.log(p.data);
      setProjects(p.data);
    });
  }, [user.iduser]);

  function handleMenuOpen(event) {
    setMenuAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchorEl(null);
  }

  function handleOptionMenuClick() {
    setMenuAnchorEl(null);
    history.push("/");
    setUser({});
  }

  async function handleCreateNewProject() {
    const newProjObj = {
      iduser: user.iduser,
      name: newProjectName,
    };
    const { data } = await api.post('/project', newProjObj);
    const newProjArr = [...data];
    setProjects(newProjArr);
    setNewProjectName('');
  }

  return (
    <Container>
      <header>
        <h3>Projetos</h3>
        <div className="userInfo">
          <Avatar className="avatarIcon">
            <AccountCircleOutlined />
          </Avatar>

          <h3>{user.username}</h3>
          <div>
            <IconButton
              aria-label="more"
              className="menuButton"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="long-menu"
              keepMounted
              anchorEl={menuAnchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={handleOptionMenuClick}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </header>
      <hr />

      <div className="main">
        <div className="projects">
          {projects.map((proj) => {
            return <ProjectCard key={proj.idproject} project={proj} />;
          })}
        </div>

        <div className="createProject">
          <h4>Criar um projeto</h4>
          <TextField
            style={{
              marginLeft: 10,
              width: 375,
            }}
            id="newProject"
            label="Criar um projeto"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />{" "}
          <br />
          <Button
            style={{
              marginLeft: 10,
              width: 375,
              marginTop: 5,
            }}
            onClick={handleCreateNewProject}
            variant="contained"
            color="primary"
          >
            Criar
          </Button>
        </div>
      </div>
    </Container>
  );
}
