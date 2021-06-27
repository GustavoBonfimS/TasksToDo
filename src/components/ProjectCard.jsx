import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import "../styles/projectCard.css";
import api from "../services/api";

export default function ProjectCard({ project }) {
  const [tasks, setTasks] = useState(project.tasks);
  const [newTaskName, setNewTaskName] = useState("");

  async function handleToggle(item) {
    const index = tasks.indexOf(item);
    const newCHeckedTaks = [...tasks];
    newCHeckedTaks[index].finished = !tasks[index].finished;
    setTasks(newCHeckedTaks);
    await api.put(`/task/finished/${item.idtask}`, {
      finished: item.finished,
    });
  }

  async function handleTaskDelete(item) {
    console.log(item);
    const index = tasks.indexOf(item);
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    await api.delete(`/task/${item.idtask}`);
  }

  async function handleProjectDelete() {
    await api.delete(`/project/${project.idproject}`);
    window.location.reload();
  }

  async function handleAddTask() {
    if (!newTaskName) {
      alert('Por favor, digite algo');
      return;
    }
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    // sql server date format
    today = yyyy + "-" + mm + "-" + dd;
    const newTask = {
      idproject: project.idproject,
      description: newTaskName,
      finished: false,
      created_at: today,
    };
    const { data } = await api.post("/task", newTask);
    const newTasksArr = [...tasks];
    setNewTaskName('');
    newTasksArr.push(data);
    setTasks(newTasksArr);
    // window.location.reload();
  }

  // async function handleTaskSave() {
  //   // const p = {
  //   //   name: project.name,
  //   //   tasks: [...tasks],
  //   //   iduser: project.iduser,
  //   // };
  //   // const { data } = await api.put('/project', p);
  // }

  return (
    <Card className="cardRoot">
      <CardContent>
        <div className="cardHeader">
          <h3>{project.name}</h3>
          <IconButton aria-label="delete" onClick={handleProjectDelete}>
            <Delete />
          </IconButton>
        </div>
        <hr />

        <div className="toDo">
          <p>A Fazer</p>
        </div>

        <List>
          {tasks
            .filter((item) => !item.finished || item.finished === false)
            .map((item, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem
                  key={index}
                  role={undefined}
                  dense
                  button
                  onClick={() => handleToggle(item, index)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.finished}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={item.description} />
                  <ListItemSecondaryAction>
                    {item.finished && (
                      <IconButton
                        edge="end"
                        aria-label="delete-task"
                        onClick={() => handleTaskDelete(item)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>

        <div className="done">
          <p>Terminado</p>
        </div>

        <List>
          {tasks
            .filter((item) => item.finished)
            .map((item, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem key={index} role={undefined} dense button>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.finished}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={item.description} />
                  <ListItemSecondaryAction>
                    {item.finished && (
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={() => handleTaskDelete(item)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </CardContent>
      <h4 className="addH4">Adicionar Tarefa</h4>
      <CardActions>
        <TextField
          id="newTask"
          label="Descrição da tarefa"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <Button style={{
          marginLeft: 30
        }} variant="contained" color="primary" onClick={handleAddTask}>
          Adicionar
        </Button>
      </CardActions>
      {/* <Button className="btnSave" variant="contained" onClick={handleTaskSave}>
        Salvar
      </Button> */}
    </Card>
  );
}
