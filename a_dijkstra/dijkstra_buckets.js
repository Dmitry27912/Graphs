const fs = require('fs');
const path = require('path');

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjacencyList = Array.from({ length: vertices }, () => []);
  }

  addEdge(from, to, weight) {
    this.adjacencyList[from].push({ to, weight });
  }

  dijkstraWithBuckets(source, maxWeight) {
    const distances = Array(this.vertices).fill(Infinity);
    distances[source] = 0;
  
    const buckets = Array.from({ length: maxWeight + 1 }, () => []);
  
    buckets[0].push(source);
  
    while (true) {
      let bucketIndex = -1;
  
      for (let i = 0; i <= maxWeight; i++) {
        if (buckets[i].length > 0) {
          bucketIndex = i;
          break;
        }
      }
  
      if (bucketIndex === -1) break;
  
      const current = buckets[bucketIndex].shift();
  
      for (const { to, weight } of this.adjacencyList[current]) {
        const newDistance = distances[current] + weight;
  
        if (newDistance < distances[to]) {
          const oldBucketIndex = distances[to] % (maxWeight + 1);
          distances[to] = newDistance;
  
          // Удаление из старого черпака, если он существует
          if (buckets[oldBucketIndex]) {
            const bucket = buckets[oldBucketIndex];
            const indexInBucket = bucket.indexOf(to);
            if (indexInBucket !== -1) bucket.splice(indexInBucket, 1);
          }
  
          const newBucketIndex = newDistance % (maxWeight + 1);
          buckets[newBucketIndex].push(to);
        }
      }
    }
  
    return distances;
  }  
}

// Основная функция для чтения данных из файла
const main = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const input = fs.readFileSync(inputPath, 'utf-8').split('\n');

  const [vertices, edges] = input[0].split(' ').map(Number);
  const graph = new Graph(vertices);

  for (let i = 1; i <= edges; i++) {
    const [from, to, weight] = input[i].split(' ').map(Number);
    graph.addEdge(from, to, weight);
  }

  const maxWeight = 4; // Укажите максимальный вес ребра
  const distances = graph.dijkstraWithBuckets(0, maxWeight);
  console.log('Минимальные расстояния:', distances);
};

if (require.main === module) {
  main();
}

module.exports = Graph;
