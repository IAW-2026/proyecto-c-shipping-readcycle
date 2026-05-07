import ShipmentRow from "./shipmentRow";

export default function ShipmentTable({ shipments, loading, error }) {
  if (error) return <>Error...</>;
  if (loading) return <>Loading...</>;
  return (
    <div className="flex flex-col items-start w-full">
      {shipments.map((ship, index) => (
        <ShipmentRow key={index} ship={ship} />
      ))}
    </div>
  );
}
