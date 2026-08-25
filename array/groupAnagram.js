let strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
const map = new Map();
let result = [];
for (let i = 0; i < strs.length; i++) {
  let sorted = strs[i].split("").sort().join("");
  if (!map.has(sorted)) {
    map.set(sorted, []);
  }
  map.get(sorted).push(strs[i]);
}
for (let group of map.values()) {
  result.push(group);
}
console.log(result);
