"use client";

import ShipmentTable from "../components/shipmentTable";
import { useShipments } from "../hooks/useShipments";

export default function OperatorDashboardView() {
  const { shipments, loading, error } = useShipments({ role: "OPERATOR" });
  return (
    <ShipmentTable
      shipments={shipments}
      loading={loading}
      error={error}
      carrierAssign={true}
    />
  );
}
