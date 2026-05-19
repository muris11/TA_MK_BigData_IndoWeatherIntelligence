from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field


ROOT_DIR = Path(__file__).resolve().parents[1]
MODEL_PATH = ROOT_DIR / "model" / "model_bundle.pkl"
METADATA_PATH = ROOT_DIR / "model" / "model_metadata.json"
RECOMMENDATION_PATH = ROOT_DIR / "public" / "data" / "recommendation_summary.csv"

app = FastAPI(title="IndoWeather Intelligence API")

_bundle: dict[str, Any] | None = None
_load_error: str | None = None


def load_bundle() -> dict[str, Any] | None:
    global _bundle, _load_error
    if _bundle is not None or _load_error is not None:
        return _bundle
    try:
        _bundle = joblib.load(MODEL_PATH)
    except Exception as exc:  # pragma: no cover - runtime safety for Vercel cold starts
        _load_error = str(exc)
        _bundle = None
    return _bundle


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def rainfall_category(value: float) -> str:
    if value < 2:
        return "Aman"
    if value < 8:
        return "Waspada"
    return "Tinggi"


def risk_recommendation(category: str) -> str:
    rules = {
        "Aman": "Kondisi cuaca relatif aman. Monitoring rutin tetap dilakukan.",
        "Waspada": "Curah hujan mulai meningkat. Perlu pemantauan wilayah rawan genangan.",
        "Tinggi": "Curah hujan tinggi. Prioritaskan mitigasi banjir dan informasi peringatan dini.",
    }
    bundle = load_bundle()
    if bundle:
        return bundle.get("recommendation_rules", {}).get(category, rules[category])
    return rules[category]


def fallback_rainfall(payload: dict[str, float]) -> float:
    score = (
        payload.get("precipitation_rolling_24h", 0) * 0.45
        + (payload.get("relative_humidity_2m", 0) / 100) * 2.2
        + max(0, (payload.get("cloud_cover", 0) - 40) / 40) * 1.8
        + max(0, (payload.get("temperature_2m", 0) - 24) / 12) * 0.8
    )
    return round(max(0, score), 3)


class WeatherInput(BaseModel):
    tahun: int = Field(ge=1900, le=2100)
    bulan: int = Field(ge=1, le=12)
    hari: int = Field(default=1, ge=1, le=31)
    jam: int = Field(ge=0, le=23)
    dayofweek: int = Field(default=0, ge=0, le=6)
    is_weekend: int = Field(default=0, ge=0, le=1)
    provinsi_encoded: int = Field(default=0, ge=0)
    kota_encoded: int = Field(default=0, ge=0)
    temperature_2m: float
    relative_humidity_2m: float = Field(ge=0, le=100)
    dew_point_2m: float
    apparent_temperature: float = 0
    surface_pressure: float = Field(gt=800, lt=1200)
    cloud_cover: float = Field(ge=0, le=100)
    wind_speed_10m: float = Field(ge=0)
    wind_speed_100m: float = Field(default=0, ge=0)
    soil_temperature_0_to_7cm: float = 0
    soil_moisture_0_to_7cm: float = Field(default=0, ge=0)
    shortwave_radiation: float = Field(default=0, ge=0)
    direct_radiation: float = Field(default=0, ge=0)
    diffuse_radiation: float = Field(default=0, ge=0)
    et0_fao_evapotranspiration: float = Field(default=0, ge=0)
    precipitation_lag_1: float = Field(default=0, ge=0)
    precipitation_lag_24: float = Field(default=0, ge=0)
    precipitation_rolling_24h: float = Field(default=0, ge=0)
    temperature_rolling_24h: float = 0


class ClusterInput(BaseModel):
    temperature_2m_mean: float
    relative_humidity_2m_mean: float = Field(ge=0, le=100)
    precipitation_mean: float = Field(ge=0)
    precipitation_sum: float = Field(ge=0)
    rain_sum: float = Field(ge=0)
    wind_speed_10m_mean: float = Field(ge=0)
    surface_pressure_mean: float
    cloud_cover_mean: float = Field(ge=0, le=100)
    soil_moisture_0_to_7cm_mean: float = Field(ge=0)


@app.get("/")
def root() -> dict[str, Any]:
    return {"status": "ok", "service": "IndoWeather Intelligence API"}


@app.get("/api/health")
def health() -> dict[str, Any]:
    bundle = load_bundle()
    models = list(bundle.get("models", {}).keys()) if bundle else []
    return {
        "status": "ok",
        "model_loaded": bundle is not None,
        "available_models": models,
        "load_error": _load_error,
    }


@app.get("/api/metadata")
def metadata() -> dict[str, Any]:
    bundle = load_bundle()
    if bundle:
        return bundle.get("project_info", {})
    return {
        "title": "Penerapan Big Data Analytics pada Data Cuaca Historis Indonesia",
        "target_deployment": "Next.js + Vercel Python Function",
        "model_loaded": False,
        "load_error": _load_error,
    }


@app.get("/api/metrics")
def metrics() -> dict[str, Any]:
    bundle = load_bundle()
    if bundle:
        return bundle.get("metrics", {})
    return {"status": "error", "message": "Model bundle belum berhasil dimuat.", "load_error": _load_error}


@app.get("/api/recommendation")
def recommendation() -> dict[str, Any]:
    if RECOMMENDATION_PATH.exists():
        rows = pd.read_csv(RECOMMENDATION_PATH).head(50).to_dict(orient="records")
        return {"status": "success", "data": rows}
    return {"status": "error", "data": [], "message": "recommendation_summary.csv tidak ditemukan"}


@app.post("/api/predict-rainfall")
def predict_rainfall(input_data: WeatherInput) -> dict[str, Any]:
    payload = input_data.model_dump()
    bundle = load_bundle()
    fallback = bundle is None

    if bundle:
        columns = bundle["preprocessing"]["feature_columns_regression"]
        model = bundle["models"]["regression_model"]
        frame = pd.DataFrame([{column: payload.get(column, 0) for column in columns}], columns=columns)
        prediction = float(model.predict(frame)[0])
    else:
        prediction = fallback_rainfall(payload)

    prediction = round(max(0, prediction), 3)
    category = rainfall_category(prediction)
    return {
        "status": "success",
        "prediction": prediction,
        "unit": "mm",
        "category": category,
        "interpretation": (
            "Curah hujan rendah dan kondisi relatif stabil."
            if category == "Aman"
            else "Curah hujan diprediksi sedang dan perlu pemantauan."
            if category == "Waspada"
            else "Curah hujan tinggi. Mitigasi banjir dan peringatan dini perlu diprioritaskan."
        ),
        "recommendation": risk_recommendation(category),
        "model_used": "fallback-rule" if fallback else bundle["metrics"]["regression"]["best_model"],
        "timestamp": now_iso(),
        "fallback": fallback,
    }


@app.post("/api/predict-risk")
def predict_risk(input_data: WeatherInput) -> dict[str, Any]:
    payload = input_data.model_dump()
    bundle = load_bundle()
    fallback = bundle is None

    if bundle:
        columns = bundle["preprocessing"]["feature_columns_classification"]
        model = bundle["models"]["classification_model"]
        frame = pd.DataFrame([{column: payload.get(column, 0) for column in columns}], columns=columns)
        category = str(model.predict(frame)[0])
        if hasattr(model, "predict_proba"):
            confidence = float(max(model.predict_proba(frame)[0]))
        else:
            confidence = 0.8
    else:
        prediction = fallback_rainfall(payload)
        category = rainfall_category(prediction)
        confidence = min(0.98, 0.68 + prediction * 0.03)

    return {
        "status": "success",
        "risk_category": category,
        "confidence": round(confidence, 3),
        "recommendation": risk_recommendation(category),
        "explanation": (
            "Kondisi relatif aman. Monitoring rutin tetap diperlukan."
            if category == "Aman"
            else "Curah hujan mulai meningkat dan perlu perhatian operasional."
            if category == "Waspada"
            else "Potensi curah hujan tinggi. Mitigasi banjir dan peringatan dini perlu diprioritaskan."
        ),
        "model_used": "fallback-rule" if fallback else bundle["metrics"]["classification"]["best_model"],
        "timestamp": now_iso(),
        "fallback": fallback,
    }


@app.post("/api/predict-cluster")
def predict_cluster(input_data: ClusterInput) -> dict[str, Any]:
    payload = input_data.model_dump()
    bundle = load_bundle()
    fallback = bundle is None

    if bundle:
        columns = bundle["preprocessing"]["feature_columns_clustering"]
        scaler = bundle["preprocessing"]["scaler_cluster"]
        model = bundle["models"]["clustering_model"]
        frame = pd.DataFrame([{column: payload.get(column, 0) for column in columns}], columns=columns)
        cluster = int(model.predict(scaler.transform(frame))[0])
    else:
        cluster = 0 if payload["precipitation_mean"] > 6 else 3 if payload["relative_humidity_2m_mean"] < 80 else 1

    interpretation = {
        0: "Wilayah basah dengan curah hujan tinggi.",
        1: "Wilayah lembap sedang dengan kondisi relatif stabil.",
        2: "Wilayah sejuk basah dengan karakter dataran tinggi.",
        3: "Wilayah panas dan berangin dengan curah hujan lebih rendah.",
    }.get(cluster, "Cluster wilayah iklim dari model K-Means.")

    return {
        "status": "success",
        "cluster": cluster,
        "interpretation": interpretation,
        "timestamp": now_iso(),
        "fallback": fallback,
    }
