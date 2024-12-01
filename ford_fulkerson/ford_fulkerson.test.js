const fs = require('fs');
const path = require('path');
const Graph = require('./ford_fulkerson');

test('Максимальный поток в пустом графе', () => {
  const graph = new Graph(2);
  expect(graph.maxFlow(0, 1)).toBe(0);
});

test('Максимальный поток для графа с одним ребром', () => {
  const graph = new Graph(2);
  graph.addEdge(0, 1, 10);
  expect(graph.maxFlow(0, 1)).toBe(10);
});

test('Сложный граф', () => {
  const graph = new Graph(6);
  const edges = [
    [0, 1, 16],
    [0, 2, 13],
    [1, 2, 10],
    [1, 3, 12],
    [2, 4, 14],
    [4, 3, 7],
    [3, 5, 20],
    [4, 5, 4],
  ];
  edges.forEach(([from, to, capacity]) => graph.addEdge(from, to, capacity));
  expect(graph.maxFlow(0, 5)).toBe(23);
});

test('Сложный граф из файла', () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const input = fs.readFileSync(inputPath, 'utf-8').split('\n');

  const [vertices, edges] = input[0].split(' ').map(Number);
  const graph = new Graph(vertices);

  for (let i = 1; i <= edges; i++) {
    const [from, to, capacity] = input[i].split(' ').map(Number);
    graph.addEdge(from, to, capacity);
  }

  const [source, sink] = input[edges + 1].split(' ').map(Number);
  expect(graph.maxFlow(source, sink)).toBe(23);
});
