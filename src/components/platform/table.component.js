import Select1Component from "../../shared/components/selects/select-1.component";
import { useEffect, useState } from "react";
import tripService from "../../services/trip.service";
import departmentsService from "../../services/departments.service";
import { ArrowPathIcon, TicketIcon } from "@heroicons/react/24/outline";
import BuyTicketComponent from "./buy-ticket.component";
export default function TablePlatformComponent() {
  const [departments, setDepartments] = useState([]);
  const [trips, setTrips] = useState([]);
  const [selectedFilterOut, setSelecteFilterOut] = useState({
    name: "Elija un departamento",
  });
  const [selectedFilterIn, setSelectedFilterIn] = useState({
    name: "Elija un departamento",
  });
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [selectTrip, setSelectTrip] = useState({
    id: 0,
    departureTime: "Cargando",
    createdAt: "argando",
    originPoint: {
      id: 0,
      name: "Cargando",
    },
    destinationPoint: {
      id: 0,
      name: "Cargando",
    },
    seats: [],
  });
  function init() {
    tripService.getAllTrips().then((response) => {
      console.log(response.data);
      setTrips(response.data);
    });
  }
  function countAvailableSeats(seats) {
    var countAvailable = seats.filter(function (element) {
      return element.isBooked == false;
    }).length;
    console.log(countAvailable);
    return countAvailable;
  }
  useEffect(() => {
    departmentsService.getAllDepartments().then((response) => {
      console.log(response.data);
      setDepartments(response.data);
    });
    init();
  }, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Viajes disponibles
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los viajes
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="  grid grid-cols-1 mb-10  bg-gray-600 p-4 rounded-md">
          <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-3">
            <Select1Component
              title={"Punto de partida"}
              items={departments}
              selected={selectedFilterOut}
              setSelected={setSelecteFilterOut}
              className={"block text-sm font-medium text-white"}
            />
            <Select1Component
              title={"Punto de llegada"}
              items={departments}
              selected={selectedFilterIn}
              setSelected={setSelectedFilterIn}
              className={"block text-sm font-medium text-white"}
            />
          </div>
          <div className="justify-end flex mt-3 space-x-2">
            <button
              onClick={() => {
                tripService
                  .findByPoints(selectedFilterOut.name, selectedFilterIn.name)
                  .then((response) => {
                    console.log(response.data);
                    setTrips(response.data);
                  });
              }}
              className="text-black px-2 py-1.5 border border-gray-300 bg-white rounded-md"
            >
              Buscar
            </button>
            <button
              onClick={() => {
                init();
              }}
              className="text-black px-2 py-1.5 border border-gray-300 bg-white rounded-md"
            >
              <ArrowPathIcon className="h-5 w-5 text-red-700" />
            </button>
          </div>
        </div>
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
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                    >
                      Asientos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {trips.map((trip, tripIdx) => (
                    <tr key={trip.id} className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                        {trip.originPoint.name}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {trip.destinationPoint.name}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {new Date(trip.departureTime).toLocaleDateString(
                          "en-gb"
                        )}
                        {" - "}
                        {Intl.DateTimeFormat("en", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }).format(new Date(trip.departureTime))}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 text-sm text-gray-500 items-center flex space-x-4">
                        <label>
                          {countAvailableSeats(trip.seats)} Asientos disponibles
                        </label>
                        <button
                          onClick={() => {
                            setOpenTicketModal(true);
                            setSelectTrip(trip);
                          }}
                          className="rounded-md px-2 py-1.5 border border-indigo-600 bg-indigo-600"
                        >
                          <TicketIcon className="h-5 w-5 text-white" />
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
      <BuyTicketComponent
        open={openTicketModal}
        setOpen={setOpenTicketModal}
        selectedTrip={selectTrip}
        init={init}
      />
    </div>
  );
}
