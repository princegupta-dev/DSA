let n = 4;

for (let i = 0; i < n; i++) {
    let row = "";

    // 1️ spaces
    for (let j = 0; j < n - i - 1; j++) {
        row += " ";
    }

    // 2 increasing numbers
    for (let j = 1; j <= i + 1; j++) {
        row += j;
    }

    // 3️ decreasing numbers
    for (let j = i; j >= 1; j--) {
        row += j;
    }

    console.log(row);
}
