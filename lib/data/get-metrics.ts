import type { Metrics } from "@/types/metrics";
import { getJsonData } from "./get-csv-data";

export async function getMetrics() {
  return getJsonData<Metrics>("metrics.json");
}
