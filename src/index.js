console.clear();
/*
В функцию передается массив слов, а также искомое слово. Необходимо вернуть
правду, если такое слово можно составить из того паззла что передали внутрь
функции, ложь, если такое слово невозможно составить.
Правила состававления слова: 
1. Направления от букв должны быть влево, вправо, вниз, вверх. Переходить с 
одного конца слова в другой конец запрещено (например в слове 'RFIDTCL' нельзя 
с буквы "R" перейти на букву "L").
2. В слове все символы должны быть уникальны, то есть нельзя из паззла 
использовать одну и ту же букву на том же самом месте.
*/

function findNextWord(puzzleArr, word, coords) {
  if (word.length === 0) return true;
  const x = coords.x;
  const y = coords.y;
  const letter = puzzleArr[x][y];
  const startX = x - 1 > 0 ? x - 1 : x;
  const endX = x + 1 < puzzleArr.length ? x + 1 : x;
  const startY = y - 1 > 0 ? y - 1 : y;
  const endY = y + 1 < puzzleArr[x].length ? y + 1 : y;

  for (let i = startX; i <= endX; i++) {
    for (let j = startY; j <= endY; j++) {
      if (puzzleArr[i][j] === word[0]) {
        puzzleArr[x][y] = "";
        if (findNextWord(puzzleArr, word.substring(1), { x: i, y: j })) {
          return true;
        } else {
          puzzleArr[x][y] = letter;
        }
      }
    }
  }
}

function findWord(puzzle, word) {
  const puzzleArr = puzzle.map((el) => el.split(""));

  for (let x = 0; x < puzzleArr.length; x++) {
    for (let y = 0; y < puzzleArr[x].length; y++) {
      if (
        puzzleArr[x][y] === word[0] &&
        findNextWord(puzzleArr, word.substring(1), { x: x, y: y })
      ) {
        return true;
      }
    }
  }
  return false;
}

const puzzle = ["ANGULAR", "REDNCAE", "RFIDTCL", "AGNEGSA", "YTIRTSP"];

console.log(findWord(puzzle, "ANGULAR")); // true (первая строка)
console.log(findWord(puzzle, "REACT")); // true (начиная справа сверху)
console.log(findWord(puzzle, "ARRAY")); // true (первая колонка)
console.log(findWord(puzzle, "UNDEFINED")); // true
console.log(findWord(puzzle, "RED")); // true
console.log(findWord(puzzle, "STRING")); // true
console.log(findWord(puzzle, "CLASS")); // true
console.log(findWord(puzzle, "FUNCTION")); // false
console.log(findWord(puzzle, "NULL")); // false
