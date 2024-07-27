import { readFile } from "fs/promises";
import path from "path";

interface Rect {
  Width: number;
  Height: number;
  X: number;
  Y: number;
  ts: number;
}

interface Point {
  X: number;
  Y: number;
  ts: number;
}

export let rectData: Rect[] = [];
export let pointData: Point[] = [];

export const loadJsonFiles = async () => {
  const rectFilePath = path.join(__dirname, "./data", "Rect.json");
  const pointFilePath = path.join(__dirname, "./data", "Point.json");

  try {
    rectData = await readJsonFile<Rect[]>(rectFilePath);
    pointData = await readJsonFile<Point[]>(pointFilePath);
  } catch (error) {
    console.error("Error reading files:", error);
    process.exit(1);
  }
};

const readJsonFile = async <T>(filePath: string): Promise<T> => {
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
};
