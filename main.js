const Jimp = require('jimp')

// Sierpinski Triangle
let array = [[1,0],
             [1,1]]

//Sierpinski Carpet
// let array = [
//   [1,1,1],
//   [1,0,1],
//   [1,1,1],
// ]

// let array = [[1,1,1,0,0,0,0],
//              [1,1,1,0,0,0,0],
//              [1,1,1,0,1,0,0],
//              [0,0,0,1,1,1,0],
//              [0,0,1,1,1,1,1],
//              [0,0,0,1,1,1,0],
//              [0,0,0,0,1,0,0]]

let iterations = 13
function ifs(array,iterations){
    let answer = []
    for(let i=0; i<array.length**iterations; i++){
      let line = []
      for(let j=0; j<array[0].length**iterations; j++){
        for(let k=iterations-1; k>=0; k--){
          if(array[Math.floor((i%array.length**(k+1))/array.length**k)][Math.floor(j%array[0].length**(k+1)/array[0].length**k)]){
            if(k==0)
              line.push(0x000000FF)
            else
              continue
          }
          else{
            line.push(0xFFFFFFFF)
            break
          }
        }
      }
      answer.push(line)
    }
    return answer
}

// console.log(ifs(array, iterations))

// fs.writeFile("/tmp/test", ifs(array, iterations), function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// }); 

let matrix = ifs(array, iterations)

let image = new Jimp(matrix[0].length, matrix.length, function (err, image) {
  if (err) throw err;
  matrix.forEach((row, y) => {
    row.forEach((color, x) => {
      image.setPixelColor(color, x, y);
    });
  });

  image.write('Big Triangle.png', (err) => {
    if (err) throw err;
  });
});