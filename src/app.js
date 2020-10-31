const express = require("express");
const { uuid, isUuid } = require('uuidv4');
const cors = require("cors");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }
  repositories.push(repository);
  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repIndex = repositories.findIndex(rep => {
    return rep.id == id;
  });

  if (repIndex == -1) response.sendStatus(400);


  repositories[repIndex] = { ...repositories[repIndex], ...{ url, title, techs } };

  response.json(repositories[repIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repIndex = repositories.findIndex(rep => {
    return rep.id == id;
  });
  if (repIndex == -1) response.sendStatus(400);

  repositories.splice(repIndex, 1);

  response.sendStatus(204)
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repIndex = repositories.findIndex(rep => {
    return rep.id == id;
  });
  if (repIndex == -1) response.sendStatus(400);

  repositories[repIndex].likes++;

  response.json(repositories[repIndex]);

});

module.exports = app;
