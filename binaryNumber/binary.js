function decToBin(dec) {
    let ans = 0, pow = 1;
    while (dec > 0) {
        let rem = dec % 2;
        dec = Math.floor(dec / 2);
        ans += rem * pow;
        pow *= 10;
    }
    return ans;
}

function binToDec(bin) {
    let ans = 0, pow = 1;
    while (bin > 0) {
        let rem = bin % 10;
        bin = Math.floor(bin / 10);
        ans += rem * pow;
        pow *= 2;
    }
    return ans;
}
// console.log(decToBin(50));
// console.log(binToDec(110010));
console.log(6 & 10)