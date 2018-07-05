//ładowanie tablicy z pliku
const loadArrayFromFile = (filename) => {
    const fs = require('fs');
    let array = [];
    let file = fs.readFileSync(`../${filename}`, 'utf8').split('\r\n');
    file.forEach((row) => {
        array.push(row.split(' ').map(Number))
    });
    return array;
};

//metryka euqlidesa
const euclidHeuristic = (point, destination) => {
    return Math.sqrt(Math.pow((point[0] - destination[0]), 2) + Math.pow((point[1] - destination[1]), 2))
};

//mechanizm odwiedzania pól
const visit = (parent, map) => {
    let canVisit=[{'parent': [parent[0], parent[1]]}];
    let candidate = [
        {'bottom': [parent[0], parent[1] + 1]},
        {'left': [parent[0] - 1, parent[1]]},
        {'top': [parent[0], parent[1] - 1]},
        {'right': [parent[0] + 1, parent[1]]}
    ];
    candidate.forEach((direction, index) => {
        let cords=direction[Object.keys(direction)]
        let value =map[cords[0]][cords[1]]
        if(value!==5){
            canVisit.push(cords)
        }
    })
    return canVisit;
};

//główny program wykonywalny
const main = (start, end) => {
    const map = loadArrayFromFile('pdf.txt')
    let closeList = [start];
    let openList = [];
    console.log(loadArrayFromFile('pdf.txt'));
    // console.log(euclidHeuristic(start[0], start[1], end[0], end[1]));
    // console.log(closeList);
    // console.log(visit(start))
    openList.push(visit(start, map))
    console.log(openList);
    //todo ostatnio robione - liczymy metrykę euklidesa dla wszystkich elementów w liście otwartej
    openList.forEach(item => {
        console.log(item)
        item.forEach(positions => {
            // if (Object.keys(positions)[0] !== 'parent') {
            //     // let position = positions[Object.keys(positions)]
            //     // console.log(position)
            //     // console.log(euclidHeuristic(position, end))
            // }
        })
    })

};


console.time('execution time');
main([1, 2], [5, 1]);
console.timeEnd('execution time');
