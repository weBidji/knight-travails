const possibleMoves = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

function knightMoves(start, end) {
  if (!checkValidity(start) || !checkValidity(end)) {
    throw new Error("Please use valid board positions.");
  }

  if (start[0] === end[0] && start[1] === end[1]) {
    return `The knight is already at the destination ${end}.`;
  }

  const queue = [];
  queue.push(start);
  const visited = new Map();
  visited.set(start.toString(), { previous: null, steps: 0 });

  while (queue.length > 0 && !visited.has(end.toString())) {
    const current = queue.shift();

    possibleMoves.forEach((move) => {
      const newMove = [move[0] + current[0], move[1] + current[1]];
      if (checkValidity(newMove) && !visited.has(newMove.toString())) {
        queue.push(newMove);
        visited.set(newMove.toString(), {
          previous: current,
          steps: visited.get(current.toString()).steps + 1,
        });
      }
    });
  }

  let path = [];
  let destinationReached = visited.get(end.toString());
  if (destinationReached) {
    let current = destinationReached;
    path.push(end);
    while (current.previous !== null) {
      path.unshift(current.previous);
      current = visited.get(current.previous.toString());
    }
    return `The knight travelled from ${start} to ${end} in ${
      destinationReached.steps
    } steps.
    The path was: ${path.map((pos) => `(${pos[0]}, ${pos[1]})`).join(" -> ")}`;
  } else {
    return "The knight could not reach the destination.";
  }
}

function checkValidity(input) {
  return input.every((coordinate) => coordinate >= 0 && coordinate < 8);
}
