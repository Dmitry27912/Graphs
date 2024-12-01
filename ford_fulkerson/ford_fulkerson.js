const fs = require('fs');
const path = require('path');

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.capacity = Array.from({ length: vertices }, () => Array(vertices).fill(0));
  }

  addEdge(from, to, capacity) {
    this.capacity[from][to] = capacity;
  }

  bfs(source, sink, parent) {
    const visited = Array(this.vertices).fill(false);
    const queue = [source];
    visited[source] = true;

    while (queue.length > 0) {
      const node = queue.shift();

      for (let neighbor = 0; neighbor < this.vertices; neighbor++) {
        if (!visited[neighbor] && this.capacity[node][neighbor] > 0) {
          queue.push(neighbor);
          parent[neighbor] = node;
          visited[neighbor] = true;

          if (neighbor === sink) {
            return true;
          }
        }
      }
    }

    return false;
  }

  maxFlow(source, sink) {
    let maxFlow = 0;
    const parent = Array(this.vertices).fill(-1);

    while (this.bfs(source, sink, parent)) {
      let pathFlow = Infinity;
      let node = sink;

      while (node !== source) {
        const prev = parent[node];
        pathFlow = Math.min(pathFlow, this.capacity[prev][node]);
        node = prev;
      }

      maxFlow += pathFlow;
      node = sink;

      while (node !== source) {
        const prev = parent[node];
        this.capacity[prev][node] -= pathFlow;
        this.capacity[node][prev] += pathFlow;
        node = prev;
      }
    }

    return maxFlow;
  }
}

const main = () => {
  const inputPath = path.join(__dirname, 'input.txt'); // Путь к input.txt
  const input = fs.readFileSync(inputPath, 'utf-8').split('\n');

  const [vertices, edges] = input[0].split(' ').map(Number);
  const graph = new Graph(vertices);

  for (let i = 1; i <= edges; i++) {
    const [from, to, capacity] = input[i].split(' ').map(Number);
    graph.addEdge(from, to, capacity);
  }

  const [source, sink] = input[edges + 1].split(' ').map(Number);
  console.log('Максимальный поток:', graph.maxFlow(source, sink));
};

if (require.main === module) {
  main();
}

module.exports = Graph;
