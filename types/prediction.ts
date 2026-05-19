export type WeatherPredictionInput = {
  tahun: number;
  bulan: number;
  hari: number;
  jam: number;
  dayofweek: number;
  is_weekend: number;
  provinsi_encoded: number;
  kota_encoded: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  dew_point_2m: number;
  apparent_temperature: number;
  surface_pressure: number;
  cloud_cover: number;
  wind_speed_10m: number;
  wind_speed_100m: number;
  soil_temperature_0_to_7cm: number;
  soil_moisture_0_to_7cm: number;
  shortwave_radiation: number;
  direct_radiation: number;
  diffuse_radiation: number;
  et0_fao_evapotranspiration: number;
  precipitation_lag_1: number;
  precipitation_lag_24: number;
  precipitation_rolling_24h: number;
  temperature_rolling_24h: number;
};

export type RainfallPredictionResult = {
  status: string;
  prediction: number;
  unit: string;
  category: "Aman" | "Waspada" | "Tinggi";
  interpretation: string;
  recommendation?: string;
  model_used?: string;
  timestamp?: string;
  fallback?: boolean;
};

export type RiskPredictionResult = {
  status: string;
  risk_category: "Aman" | "Waspada" | "Tinggi";
  confidence: number;
  recommendation: string;
  explanation?: string;
  model_used?: string;
  timestamp?: string;
  fallback?: boolean;
};
