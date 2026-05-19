export type Metrics = {
  dataset?: {
    total_size_mb: number;
    minimum_required_mb: number;
    target_download_mb: number;
    is_minimum_100mb: boolean;
    jumlah_file: number;
    dataset_source: string;
    dataset_link: string;
    supporting_source: string;
    supporting_link: string;
    catatan: string;
  };
  regression: {
    best_model: string;
    target?: string;
    mae: number;
    mse: number;
    rmse: number;
    r2_score: number;
  };
  classification: {
    best_model: string;
    target?: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
  };
  clustering: {
    model: string;
    n_clusters: number;
    silhouette_score: number;
  };
  deep_learning: {
    model: string;
    mae: number;
    mse: number;
    rmse: number;
    r2_score: number;
  };
};

export type MetricTableRow = Record<string, string | number | boolean | null>;
