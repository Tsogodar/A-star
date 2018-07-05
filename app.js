//ładowanie tablicy z pliku
const loadArrayFromFile = (filename) => {
    const fs = require('fs');
    let array = [];
    let file = fs.readFileSync(`../${filename}`, 'utf8').split('\r\n');
    file.forEach((row) => {
        array.push(row.split(' ').map(Number));
    });
    return array;
};

//metryka euqlidesa
const euclidHeuristic = (point, destination) => {
    return Math.sqrt(Math.pow((point[0] - destination[0]), 2) + Math.pow((point[1] - destination[1]), 2));
};

//mechanizm odwiedzania pól
const visit = (parent, map) => {
    let canVisit = [{'parent': [parent[0], parent[1]]}];
    let candidate = [
        {'bottom': [parent[0], parent[1] + 1]},
        {'left': [parent[0] - 1, parent[1]]},
        {'top': [parent[0], parent[1] - 1]},
        {'right': [parent[0] + 1, parent[1]]}
    ];
    console.log(candidate)
    candidate.forEach((direction) => {
        let cords = direction[Object.keys(direction)];
        if ((cords[0] >= 0 || cords[1] >= 0) && (cords[0] >= 0 && cords[1] >= 0)) {
            let value = map[cords[0]][cords[1]];
            console.log(value)
            if (value !== 5) {
                canVisit.push(cords)
            }
        }
    });
    return canVisit;
};
//todo poprawić warunek w metodzie visit
const findPath = (openList, closeList, start, end, map, euclidesValues) => {
    let openListLength = openList.length
    openList.push(visit(start, map));
    openList[openListLength].forEach(position => {
        if (Object.keys(position)[0] !== 'parent') {
            euclidesValues.push([position, euclidHeuristic(position, end)]);
        }
    })
// console.log(euclidesValues);
    minimalCost = euclidesValues[0][1];
    euclidesValues.forEach(value => {
        if (value[1] > minimalCost) {
            minimalCost = value;
            closeList.push(value[0])
            start = value[0]
        }
    })
    // console.log(closeList)
    // console.log(openList)
    return findPath(openList, closeList, start, end, map, euclidesValues)
}

//główny program wykonywalny
const main = (start, end) => {
    let minimalCost = 0;
    let euclidesValues = [];
    const map = loadArrayFromFile('pdf.txt');
    let closeList = [];
    let openList = [];
    closeList.push(start)
    findPath(openList, closeList, start, end, map, euclidesValues)
    // openList.push(visit(start, map));
    // openList.forEach(item => {
    //     item.forEach(position => {
    //         if (Object.keys(position)[0] !== 'parent') {
    //             euclidesValues.push([position, euclidHeuristic(position, end)]);
    //         }
    //     })
    // });
    // // console.log(euclidesValues);
    // minimalCost =euclidesValues[0][1];
    //     euclidesValues.forEach(value => {
    //         if(value[1]>minimalCost){
    //             minimalCost=value;
    //             closeList.push(value[0])
    //         }
    //     })
    // console.log(closeList)

};


console.time('execution time');
main([1, 2], [5, 1]);
console.timeEnd('execution time');
