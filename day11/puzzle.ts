function parseInput(input: string) {
  return input
    .split("\n\n")
    .map((m) => m.split("\n").map((x) => x.trim()))
    .reduce<Monkey[]>((monkeys, data) => {
      monkeys[Number(data[0].replace(":", "").split(" ")[1])] = {
        items: data[1].split(":")[1].trim().split(",").map(Number),
        operation: data[2].split("=")[1].trim().split(" "),
        test: Number(data[3].split(" ").pop()),
        toTrue: Number(data[4].split(" ").pop()),
        toFalse: Number(data[5].split(" ").pop()),
        itemsInspected: 0,
      };
      return monkeys;
    }, [] as Monkey[]);
}

interface Monkey {
  items: number[];
  operation: string[];
  test: number;
  toTrue: number;
  toFalse: number;
  itemsInspected: number;
}

const getOpFunc = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  "*": (a: number, b: number) => a * b,
};

function jumpAround(
  monkeys: Monkey[],
  rounds: number,
  calculateWorryFunction: (currentWorry: number) => number
): Monkey[] {
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      const [first, operator, second] = monkey.operation;
      monkey.items.forEach((item) => {
        const a = first === "old" ? item : Number(first);
        const b = second === "old" ? item : Number(second);
        const worry = getOpFunc[operator](a, b);
        const newWorry = calculateWorryFunction(worry);
        const toMonkey =
          newWorry % monkey.test === 0 ? monkey.toTrue : monkey.toFalse;
        monkeys[toMonkey].items.push(newWorry);
        monkey.itemsInspected++;
      });
      monkey.items = [];
    });
  }
  return monkeys;
}

function getItemsInspected(monkeys: Monkey[]) {
  const itemsInspected = monkeys.map((m) => m.itemsInspected);
  const [first, second] = itemsInspected.sort((a, b) => b - a);
  return first * second;
}

function solvePartOne(input: string) {
  const initialState = parseInput(input);
  const monkeys = jumpAround(initialState, 20, (worry) =>
    Math.floor(worry / 3)
  );
  return getItemsInspected(monkeys);
}

function solvePartTwo(input: string) {
  const initialState = parseInput(input);
  const rounds = 10000;
  const modulusProduct = initialState.reduce(
    (prod, monkey) => prod * monkey.test,
    1
  );
  const monkeys = jumpAround(
    initialState,
    rounds,
    (worry) => worry % modulusProduct
  );
  return getItemsInspected(monkeys);
}

export { solvePartOne, solvePartTwo };
