"use client";

import ShipmentTable from "../components/shipmentTable";
import { useShipments } from "../hooks/useShipments";

export default function DriverDashboardView() {
  const { shipments, loading, error } = useShipments({
    role: "DRIVER",
    carrierId: 111,
  });
  return (
    <ShipmentTable
      shipments={shipments}
      loading={loading}
      error={error}
      carrierAssign={false}
    />
  );
}
