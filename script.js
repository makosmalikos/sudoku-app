
let isDailyChallenge = false;
let playerName = "";
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
const board = document.getElementById("board");

let selectedCell = null;
let history = [];
let mistakes = 0;
const easyPuzzle = [
0,6,0,8,0,9,1,0,0,
0,0,7,0,2,1,5,0,6,
9,2,0,0,0,0,0,4,0,

8,7,0,3,0,2,0,0,4,
0,1,0,0,8,0,0,2,0,
2,0,0,5,0,7,0,1,3,

0,5,0,0,0,0,0,8,9,
1,0,6,2,9,0,4,0,0,
0,0,8,7,0,6,0,3,0
];
const mediumPuzzle = [
3,0,9,0,2,8,0,0,0,
0,0,0,0,0,0,0,0,7,
0,0,4,9,5,0,1,3,0,

0,8,0,0,3,0,2,0,0,
2,0,0,0,0,0,0,0,3,
0,0,6,0,9,0,0,4,0,

0,9,3,0,6,7,8,0,0,
5,0,0,0,0,0,0,0,0,
0,0,0,3,1,0,7,0,6
];
const hardPuzzle = [
0,3,0,0,0,0,9,4,0,
0,0,8,7,0,0,0,0,2,
9,0,0,0,0,4,0,1,8,

7,0,0,0,3,6,0,0,0,
0,0,5,0,0,0,2,0,0,
0,0,0,2,5,0,0,0,3,

8,9,0,6,0,0,0,0,1,
1,0,0,0,0,9,7,0,0,
0,5,2,0,0,0,0,6,0
];
const expertPuzzle = [
0,0,5,0,0,0,0,6,2,
0,6,3,0,0,9,0,0,0,
0,0,0,0,0,0,0,0,4,

0,0,0,0,0,6,7,0,3,
0,0,6,7,0,5,0,0,0,
1,0,0,8,0,0,0,0,0,

8,0,1,2,0,0,6,0,0,
0,0,0,0,0,0,5,3,0,
0,4,0,0,0,0,8,0,0
];
const masterPuzzle = [
0,0,9,5,8,6,0,0,0,
0,0,0,0,2,0,0,0,0,
4,0,0,0,0,0,6,8,3,

9,0,0,6,5,0,0,3,2,
0,6,0,7,0,0,0,9,8,
0,3,0,2,0,0,7,0,4,

0,0,3,0,0,0,0,0,0,
6,2,0,0,1,5,0,4,0,
0,0,0,4,0,0,0,5,0
];
const easySolution = [
5,6,4,8,3,9,1,7,2,
3,8,7,4,2,1,5,9,6,
9,2,1,6,7,5,3,4,8,

8,7,5,3,1,2,9,6,4,
6,1,3,9,8,4,7,2,5,
2,4,9,5,6,7,8,1,3,

7,5,2,1,4,3,6,8,9,
1,3,6,2,9,8,4,5,7,
4,9,8,7,5,6,2,3,1
];
const mediumSolution = [
3,1,9,7,2,8,4,6,5,
6,5,2,1,4,3,9,8,7,
8,7,4,9,5,6,1,3,2,

9,8,5,6,3,4,2,7,1,
2,4,1,8,7,5,6,9,3,
7,3,6,2,9,1,5,4,8,

1,9,3,5,6,7,8,2,4,
5,6,7,4,8,2,3,1,9,
4,2,8,3,1,9,7,5,6
];
const hardSolution = [
2,3,1,8,6,5,9,4,7,
5,4,8,7,9,1,6,3,2,
9,7,6,3,2,4,5,1,8,

7,2,4,9,3,6,1,8,5,
3,8,5,4,1,7,2,9,6,
6,1,9,2,5,8,4,7,3,

8,9,7,6,4,2,3,5,1,
1,6,3,5,8,9,7,2,4,
4,5,2,1,7,3,8,6,9
];
const expertSolution = [
4,1,5,3,7,8,9,6,2,
7,6,3,4,2,9,1,8,5,
9,2,8,5,6,1,3,7,4,

2,8,4,1,9,6,7,5,3,
3,9,6,7,4,5,2,1,8,
1,5,7,8,3,2,4,9,6,

8,3,1,2,5,7,6,4,9,
6,7,2,9,8,4,5,3,1,
5,4,9,6,1,3,8,2,7
];
const masterSolution = [
3,1,9,5,8,6,4,2,7,
7,8,6,3,2,4,9,1,5,
4,5,2,1,7,9,6,8,3,

9,7,4,6,5,8,1,3,2,
2,6,1,7,4,3,5,9,8,
8,3,5,2,9,1,7,6,4,

5,4,3,9,6,2,8,7,1,
6,2,7,8,1,5,3,4,9,
1,9,8,4,3,7,2,5,6
];
let currentSolution = easySolution;
for (let i = 0; i < 81; i++) {
    const cell = document.createElement("input");

    cell.type = "text";
    cell.maxLength = 1;
    cell.readOnly = true;
if (easyPuzzle[i] !== 0) {
    cell.value = easyPuzzle[i];
    cell.disabled = true;
    cell.style.backgroundColor = "#f0f0f0";
}
    const row = Math.floor(i / 9);
    const col = i % 9;

    if (col === 2 || col === 5) {
        cell.classList.add("right-border");
    }

    if (row === 2 || row === 5) {
        cell.classList.add("bottom-border");
    }

    cell.addEventListener("click", () => {

        document
            .querySelectorAll(".selected")
            .forEach(c => c.classList.remove("selected"));

        cell.classList.add("selected");
        selectedCell = cell;
    });

    board.appendChild(cell);
}

// Кнопки цифр


document.getElementById("eraseBtn").onclick = function () {

    if (selectedCell) {

        history.push({
            cell: selectedCell,
            value: selectedCell.value
        });

        selectedCell.value = "";
        selectedCell.classList.remove("wrong");
    }
};
// Кнопки цифр

const numberButtons =
    document.querySelectorAll(".numbers button");

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (selectedCell) {

            history.push({
                cell: selectedCell,
                value: selectedCell.value
            });

            const cells =
                document.querySelectorAll(".board input");

            const index =
                Array.from(cells).indexOf(selectedCell);

selectedCell.value =
    button.textContent;

if (
    Number(button.textContent) !==
    currentSolution[index]
) {

    mistakes++;

    document.getElementById("mistakes")
        .textContent =
        `Mistakes ${mistakes}/50`;

    selectedCell.style.setProperty(
        "background-color",
        "#ff0000",
        "important"
    );

    selectedCell.style.setProperty(
        "color",
        "white",
        "important"
    );

} else {

    selectedCell.style.backgroundColor = "";
    selectedCell.style.color = "";
}
if (mistakes >= 50) {

    alert("Game Over!");

    location.reload();
}

let completed = true;

document.querySelectorAll(".board input")
.forEach((cell, i) => {

    if (
        cell.value === "" ||
        Number(cell.value) !== currentSolution[i]
    ) {
        completed = false;
    }

});




if (completed) {
    if (!playerName) {
    playerName = prompt("Enter your name for the Daily Challenge:");
}

leaderboard.push({
    name: playerName,
    time: seconds
});

leaderboard.sort((a, b) => a.time - b.time);

localStorage.setItem(
    "leaderboard",
    JSON.stringify(leaderboard)
);

let top3 = leaderboard
    .slice(0, 3)
    .map((p, i) =>
        `${i + 1}. ${p.name} - ${p.time}s`
    )
    .join("\n");

    if (difficultySelect.value === "easy") {
        document.getElementById("piece1").style.display = "block";
    }

    if (difficultySelect.value === "medium") {
        document.getElementById("piece2").style.display = "block";
    }

    if (difficultySelect.value === "hard") {
        document.getElementById("piece3").style.display = "block";
    }

    if (difficultySelect.value === "expert") {
        document.getElementById("piece4").style.display = "block";
    }

    if (difficultySelect.value === "master") {
        document.getElementById("piece5").style.display = "block";
    }

alert(
"🎉 Congratulations! You unlocked a new piece of the artwork!\n\n🏆 Daily Challenge Leaderboard:\n\n" +
top3
);

}



}

    });

});

document.getElementById("undoBtn").onclick = function () {
    const lastMove = history.pop();

    if (lastMove) {
        lastMove.cell.value = lastMove.value;
    }
};
let hints = 3;

document.getElementById("hintBtn").onclick = function () {

    if (hints <= 0) {
        alert("No hints left!");
        return;
    }

    if (!selectedCell) {
        alert("Select a cell first!");
        return;
    }

    const cells = document.querySelectorAll(".board input");

    const index = Array.from(cells).indexOf(selectedCell);

    selectedCell.value = currentSolution[index];

    selectedCell.style.backgroundColor = "#90EE90";

    hints--;

    alert(`Hints left: ${hints}`);
};

// DARK MODE

document.getElementById("themeBtn").onclick = function () {
    document.body.classList.toggle("dark");
};

const difficultySelect =
document.getElementById("difficulty");

difficultySelect.addEventListener("change", () => {

    const levelText =
    difficultySelect.options[
    difficultySelect.selectedIndex
    ].text;

    document.getElementById("levelLabel")
    .textContent =
    "Current Level: " + levelText;

});

document.getElementById("newGame").onclick = function () {

    const level =
    document.getElementById("difficulty").value;

    let puzzle;
    let solution;

    if (level === "easy") {
        puzzle = easyPuzzle;
        solution = easySolution;
    }

    if (level === "medium") {
        puzzle = mediumPuzzle;
        solution = mediumSolution;
}
     if (level === "hard") {
    puzzle = hardPuzzle;
    solution = hardSolution;
}
     if (level === "expert") {
    puzzle = expertPuzzle;
    solution = expertSolution;
}
if (level === "master") {
    puzzle = masterPuzzle;
    solution = masterSolution;
}
   
    currentSolution = solution;

    const cells =
    document.querySelectorAll(".board input");

    cells.forEach((cell, i) => {

        cell.disabled = false;
        cell.value = "";
        cell.style.backgroundColor = "";
        cell.style.color = "";

        if (puzzle[i] !== 0) {

            cell.value = puzzle[i];
            cell.disabled = true;
            cell.style.backgroundColor =
            "#f0f0f0";
        }

    });

};
// TIMER

let seconds = 0;

setInterval(() => {

    seconds++;

    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;

    document.getElementById("timer").textContent =
        `⏰ ${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

}, 1000);


document.getElementById("cameraInput")
.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    document.getElementById("uploadPage")
    .style.display = "none";

    document.getElementById("gamePage")
    .style.display = "block";

});
document.getElementById("cameraInput")
.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        localStorage.setItem(
            "sudokuPhoto",
            e.target.result
        );

        window.location.href =
        "photo.html";

    };

    reader.readAsDataURL(file);

});
document.getElementById("hintBtn").onclick = function () {

    if (!selectedCell) {
        alert("Select a cell first!");
        return;
    }

    const cells =
        document.querySelectorAll(".board input");

    const index =
        Array.from(cells).indexOf(selectedCell);

    selectedCell.value =
        currentSolution[index];

    selectedCell.style.backgroundColor =
        "#90EE90";
};