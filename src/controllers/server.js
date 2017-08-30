import express from 'express';

import Mock from 'mockjs';

import http from 'http';

const app = express();

app.get('/api/treeDiagram.json', (req, res) => {
  const randomLength = Math.ceil(Math.random() * 100);
  const childNode = new Array(randomLength);

  for (let index = 0; index < childNode.length; index++) {
    childNode[index] = {
      icon: "losthost",
      text: Mock.mock('@cparagraph')
    };

    if (Math.random() < 0.5) {
      childNode[index].leafNode = null
    } else {
      childNode[index].leafNode = {
        icon: "actor",
        text: Mock.mock("@ctitle"),
      };
    }
  }

  const mock = {
    rootNode: {
      icon: "hacktool",
      text: Mock.mock("@ctitle"),
      childNode,
    }
  };

  res.json(mock);
});

const server = http.createServer(app);

server.listen(3000);
