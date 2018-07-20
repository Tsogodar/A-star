class Astar {
	constructor(filename) {
		const fs = require('fs')
		let array = []
		let file = fs.readFileSync(`../${filename}`, 'utf8').split('\r\n')
		file.forEach((row) => {
			array.push(row.split(' ').map(Number))
		})
		this.map = array
	}

	euclidHeuristic(point, destination) {
		return Math.sqrt((point[0] - destination[0]) ** 2 + (point[1] - destination[1]) ** 2)
	}

	visit(parent, map) {
		let canVisit = [{
			'parent': [parent[0], parent[1]]
		}]
		let candidate = [{
			'bottom': [parent[0], parent[1] + 1]
		},
		{
			'left': [parent[0] - 1, parent[1]]
		},
		{
			'top': [parent[0], parent[1] - 1]
		},
		{
			'right': [parent[0] + 1, parent[1]]
		}
		]
		candidate.forEach((direction) => {
			let cords = direction[Object.keys(direction)]
			if (cords[0] >= 0 || cords[1] >= 0) {
				let value = map[cords[0]][cords[1]]
				console.log(value)
				if (value !== 5) {
					canVisit.push(cords)
				}
			}
		})
		return canVisit
	}

}

console.time('execution time')
const trace = new Astar('pdf.txt')
console.log(trace.map)
trace.visit([1, 2], trace.map)
trace.euclidHeuristic([1, 2], [5, 1])
console.timeEnd('execution time')