import fs from "node:fs/promises";
import path from "node:path";
import Papa from "papaparse";

const dataDir = path.join(process.cwd(), "public", "data");

export async function getCsvRows<T extends Record<string, unknown>>(fileName: string) {
  const filePath = path.join(dataDir, fileName);
  const csv = await fs.readFile(filePath, "utf8");
  const parsed = Papa.parse<T>(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    throw new Error(`Gagal membaca ${fileName}: ${parsed.errors[0]?.message}`);
  }

  return parsed.data;
}

export async function getJsonData<T>(fileName: string) {
  const filePath = path.join(dataDir, fileName);
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}
