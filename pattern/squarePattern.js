let n = 4;

// for (let i = 0; i < n; i++) {
//     let ch = 'A';
//     let row = "";
//     for (let j = 0; j < n; j++) {
//         row += String.fromCharCode(65 + j);
//     }
//     console.log(row);
// }
let ch = 'A';
let counter = 0;
for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
        row += String.fromCharCode(65 + counter);
        counter++;
    }
    console.log(row);
}