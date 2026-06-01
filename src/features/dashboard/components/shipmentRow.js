export default function ShipmentRow({ ship, carrierAssign }) {
  return (
    <div className="flex justify-between w-2/3 m-auto">
      <div>
        {ship.name} - {ship.id}
      </div>
      {carrierAssign && (
        <button className="cursor-pointer">Asignar Transportista</button>
      )}
    </div>
  );
}
