const fs = require('fs');
const path = require('path');

class Edge {
  constructor(to, capacity) {
    this.to = to;
    this.capacity = capacity;
    this.flow = 0;
    this.reverseEdge = null; // Связь с обратным ребром
  }

  get remainingCapacity() {
    return this.capacity - this.flow;
  }

  pushFlow(flow) {
    this.flow += flow;
    this.reverseEdge.flow -= flow;
  }
}

class Dinic {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjacencyList = Array.from({ length: vertices }, () => []);
    this.level = new Array(vertices).fill(-1);
  }

  addEdge(from, to, capacity) {
    const forwardEdge = new Edge(to, capacity);
    const backwardEdge = new Edge(from, 0);

    forwardEdge.reverseEdge = backwardEdge;
    backwardEdge.reverseEdge = forwardEdge;

    this.adjacencyList[from].push(forwardEdge);
    this.adjacencyList[to].push(backwardEdge);
  }

  buildLevelGraph(source, sink) {
    this.level.fill(-1);
    this.level[source] = 0;

    const queue = [source];
    while (queue.length > 0) {
      const node = queue.shift();

      for (const edge of this.adjacencyList[node]) {
        if (this.level[edge.to] === -1 && edge.remainingCapacity > 0) {
          this.level[edge.to] = this.level[node] + 1;
          queue.push(edge.to);
        }
      }
    }

    return this.level[sink] !== -1;
  }

  sendFlow(node, flow, sink, pointer) {
    if (node === sink) return flow;

    for (; pointer[node] < this.adjacencyList[node].length; pointer[node]++) {
      const edge = this.adjacencyList[node][pointer[node]];

      if (this.level[edge.to] === this.level[node] + 1 && edge.remainingCapacity > 0) {
        const minFlow = Math.min(flow, edge.remainingCapacity);
        const sentFlow = this.sendFlow(edge.to, minFlow, sink, pointer);

        if (sentFlow > 0) {
          edge.pushFlow(sentFlow);
          return sentFlow;
        }
      }
    }

    return 0;
  }

  maxFlow(source, sink) {
    let maxFlow = 0;

    while (this.buildLevelGraph(source, sink)) {
      const pointer = new Array(this.vertices).fill(0);
      let flow;

      while ((flow = this.sendFlow(source, Infinity, sink, pointer)) > 0) {
        maxFlow += flow;
      }
    }

    return maxFlow;
  }
}

// Основная функция
const main = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const input = fs.readFileSync(inputPath, 'utf-8').split('\n');

  const [vertices, edges] = input[0].split(' ').map(Number);
  const dinic = new Dinic(vertices);

  for (let i = 1; i <= edges; i++) {
    const [from, to, capacity] = input[i].split(' ').map(Number);
    dinic.addEdge(from, to, capacity);
  }

  const [source, sink] = input[edges + 1].split(' ').map(Number);
  console.log('Максимальный поток:', dinic.maxFlow(source, sink));
};

if (require.main === module) {
  main();
}

module.exports = Dinic;
