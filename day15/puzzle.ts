const parseInput = (input: string) => {
  return input
    .split("\n")
    .map((line) =>
      line
        .replace(/[^|[0-9||,-:]+/g, "")
        .split(":")
        .map((d) => d.split(",").map(Number))
    )
    .reduce((reports: Report[], sensorBeacon: number[][]) => {
      const [sensor, beacon] = sensorBeacon;
      const sensorLocation = { x: sensor[0], y: sensor[1] };
      const beaconLocation = { x: beacon[0], y: beacon[1] };
      const report = {
        sensorLocation,
        beaconLocation,
        distance: manhattanDistance(sensorLocation, beaconLocation),
      };
      reports.push(report);
      return reports;
    }, []);
};

interface Report {
  sensorLocation: Location;
  beaconLocation: Location;
  distance: number;
}

interface Location {
  x: number;
  y: number;
}

type Range = number[];

const removeFaraway = (report: Report, givenRow: number) =>
  Math.abs(report.sensorLocation.y - givenRow) < report.distance;

const manhattanDistance = (p1: Location, p2: Location) =>
  Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const getStartEnd = (report: Report, givenRow: number) => {
  const width = report.distance - Math.abs(report.sensorLocation.y - givenRow);
  const xCoordStart = report.sensorLocation.x - width;
  const xCoordEnd = report.sensorLocation.x + width;
  return [xCoordStart, xCoordEnd];
};

const solvePartOne = (input: string, givenRow = 2000000) => {
  const reports = parseInput(input);
  const line = reports
    .filter((report) => removeFaraway(report, givenRow))
    .reduce(
      (values: { max: number; min: number }, report: Report) => {
        const [xCoordStart, xCoordEnd] = getStartEnd(report, givenRow);
        values.min = xCoordStart < values.min ? xCoordStart : values.min;
        values.max = xCoordEnd > values.max ? xCoordEnd : values.max;
        return values;
      },
      { min: 0, max: 0 }
    );
  const beaconsOnGivenRow = new Set(
    reports
      .filter((report) => report.beaconLocation.y === givenRow)
      .map((report) => report.beaconLocation.x)
  );
  return line.max + 1 - line.min - beaconsOnGivenRow.size;
};

function solvePartTwo(input: string, maxRow = 4000000) {
  let givenRow = 0;
  let result = 0;
  const multiplier = 4000000;
  const reports = parseInput(input);
  while (!result) {
    const noneBeacons = reports
      .filter((report) => removeFaraway(report, givenRow))
      .reduce((values: Range[], report: Report) => {
        values.push(getStartEnd(report, givenRow));
        return values;
      }, [])
      .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    let max = noneBeacons[0][1];
    for (let i = 0; i < noneBeacons.length; i++) {
      if (i < noneBeacons.length - 1) {
        const [start, end] = noneBeacons[i + 1];
        if (start <= max + 1 && end > max) {
          max = end;
        }
        if (start - max > 1) {
          result = (max + 1) * multiplier + givenRow;
          break;
        }
      }
    }
    givenRow++;
  }
  return result;
}

export { solvePartOne, solvePartTwo };
