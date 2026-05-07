"use client";

import { useEffect, useState } from "react";
import { getShipments } from "../services/shipment.service";

export function useShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    shipments,
    loading,
    error,
  };
}
