import { EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ticketService from "../../services/ticket.service";
import ViewTicketComponent from "./view-ticket.component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TicketsTableComponents() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({
    id: "Cargando...",
    arrivalDate: "2023-01-25T21:53:33.299Z",
    trip: {
      id: "Cargando...",
      departureTime: "2023-01-25T21:53:33.299Z",
      createdAt: "Cargando...",
      originPoint: {
        name: "Cargando...",
      },
      destinationPoint: {
        name: "Cargando...",
      },
    },
    passenger: {
      name: "Cargando...",
      lastName: "Cargando...",
    },
    seat: {
      id: 155,
      seatNumber: "Cargando...",
    },
  });
  useEffect(() => {
    ticketService.getAllTicket().then((response) => {
      console.log(response.data);
      setTickets(response.data);
    });
  }, []);

  const [openTicket, setOpenTicket] = useState(false);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Tickets</h1>
          <p className="mt-2 text-sm text-gray-700">
            Este es un listado de todos los tickets
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      #Codigo
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Origen
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Destino
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Fecha y hora
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Hora de llegada
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Pasajero
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Asiento
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                    >
                      Ver
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                        {ticket.id}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {ticket.trip.originPoint.name}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {ticket.trip.destinationPoint.name}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {ticket.arrivalDate}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {ticket.trip.departureTime}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {ticket.passenger.name} {ticket.passenger.lastName}
                      </td>{" "}
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {ticket.seat.seatNumber}
                      </td>{" "}
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setOpenTicket(true);
                          }}
                          type="button"
                          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <EyeIcon className="h-5 w-5 mr-1" /> Ver
                          <span className="sr-only">
                            , {ticket.seat.seatNumber}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ViewTicketComponent
        open={openTicket}
        setOpen={setOpenTicket}
        ticket={selectedTicket}
      />
    </div>
  );
}
