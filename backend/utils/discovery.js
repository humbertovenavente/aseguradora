import ServicioFarmacias from "../models/ServicioFarmacias.js";

let cache = { farmacias: null, ts: 0 };
const TTL = 30_000;

async function listFarmacias() {
  const now = Date.now();
  if (cache.ts + TTL > now && cache.farmacias) {
    return cache.farmacias;
  }
  const docs = await ServicioFarmacias.find({ activo: true });
  const urls = docs.map(s => s.baseUrl.replace(/\/+$/, ""));
  cache.farmacias = urls;
  cache.ts = now;
  return urls;
}

export function clearDiscoveryCache() {
  cache = { farmacias: null, ts: 0 };
}

export const getFarmaciaUrls = listFarmacias;
