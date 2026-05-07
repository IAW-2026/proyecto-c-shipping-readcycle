export async function getShipments() {
  //const response = await fetch("/api/shipments");

  // if (!response.ok) {
  //   throw new Error("Failed to fetch shipments");
  // }

  let toReturn;

  // toReturn = response.json();

  toReturn = [
    { name: "Envio 1", id: 19237813, destination: "Calle 1" },
    { name: "Envio 2", id: 92938421, destination: "Calle 2" },
    { name: "Envio 3", id: 64243223, destination: "Calle 3" },
    { name: "Envio 4", id: 51311111, destination: "Calle 4" },
    { name: "Envio 5", id: 87123781, destination: "Calle 5" },
  ];

  console.log(toReturn);

  return toReturn;
}
