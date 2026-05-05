export default function Dashboard() {
  return (
    <div className="">
      <div className="">
        <div className="flex w-3/4 m-auto justify-between items-center text-lg bg-gray-500 mb-5">
          <div className="w-1/3 text-center">Envios Pendientes</div>
          <div className="w-1/3 text-center">Envios en Curso</div>
          <div className="w-1/3 text-center">Historial</div>
        </div>
      </div>
      <div className="w-3/5 m-auto">
        <div>Envio #111111</div>
        <div>Envio #222222</div>
        <div>Envio #333333</div>
        <div>Envio #444444</div>
        <div>Envio #555555</div>
        <div>Envio #666666</div>
        <div>Envio #777777</div>
      </div>
    </div>
  );
}
