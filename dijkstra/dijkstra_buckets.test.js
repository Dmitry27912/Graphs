const Graph = require('./dijkstra_buckets');

test('Алгоритм Дейкстры с черпаками: пустой граф', () => {
  const graph = new Graph(2);
  const maxWeight = 1;
  const distances = graph.dijkstraWithBuckets(0, maxWeight);
  expect(distances).toEqual([0, Infinity]);
});

test('Алгоритм Дейкстры с черпаками: один путь', () => {
  const graph = new Graph(2);
  graph.addEdge(0, 1, 3);

  const maxWeight = 3;
  const distances = graph.dijkstraWithBuckets(0, maxWeight);
  expect(distances).toEqual([0, 3]);
});

test('Алгоритм Дейкстры с черпаками: сложный граф', () => {
  const graph = new Graph(6);
  graph.addEdge(0, 1, 1);
  graph.addEdge(0, 2, 4);
  graph.addEdge(1, 2, 4);
  graph.addEdge(1, 3, 2);
  graph.addEdge(2, 3, 3);
  graph.addEdge(3, 4, 2);
  graph.addEdge(4, 5, 1);

  const maxWeight = 4;
  const distances = graph.dijkstraWithBuckets(0, maxWeight);
  expect(distances).toEqual([0, 1, 4, 3, 5, 6]);
});

test('Алгоритм Дейкстры с черпаками: сложный граф из файла', () => {
  const graph = new Graph(6);
  graph.addEdge(0, 1, 1);
  graph.addEdge(0, 2, 4);
  graph.addEdge(1, 2, 4);
  graph.addEdge(1, 3, 2);
  graph.addEdge(2, 3, 3);
  graph.addEdge(3, 4, 2);
  graph.addEdge(4, 5, 1);

  const maxWeight = 4;
  const distances = graph.dijkstraWithBuckets(0, maxWeight);
  expect(distances).toEqual([0, 1, 4, 3, 5, 6]);
});
