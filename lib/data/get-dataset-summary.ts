import type { DatasetSizeSummary } from "@/types/dataset";
import { getJsonData } from "./get-csv-data";

export async function getDatasetSummary() {
  return getJsonData<DatasetSizeSummary>("dataset_size_summary.json");
}
