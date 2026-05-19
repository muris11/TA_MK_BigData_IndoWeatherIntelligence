import type { DashboardSummary } from "@/types/dataset";
import { getJsonData } from "./get-csv-data";

export async function getDashboardSummary() {
  return getJsonData<DashboardSummary>("dashboard_summary.json");
}
