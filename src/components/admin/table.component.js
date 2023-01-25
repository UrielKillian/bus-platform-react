import {
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import departmentsService from "../../services/departments.service";
import tripService from "../../services/trip.service";
import Select1Component from "../../shared/components/selects/select-1.component";
import CreateModalTripComponent from "./create-modal-trip.component";
import ViewPassengersComponent from "./view-passenger.component";

export default function AdminTableComponent() {
  // States
  const [departments, setDepartments] = useState([]);
  const [trips, setTrips] = useState([]);
  const [selectedFilterOut, setSelecteFilterOut] = useState({
    name: "Elija un departamento",
  });
  const [selectedFilterIn, setSelectedFilterIn] = useState({
    name: "Elija un departamento",
  });
  const [selectedOut, setSelectedOut] = useState({
    name: "Elija un departamento",
  });
  const [selectedIn, setSelectedIn] = useState({
    name: "Elija un departamento",
  });
  // Create Trip Modal States
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openViewPassengersModal, setOpenViewPassengersModal] = useState(false);
  const [selectPassengers, setSelectPassengers] = useState([
    {
      id: 154,
      seatNumber: 10,
      isBooked: true,
      passenger: {
        id: 5,
        name: "asd",
        lastName: "cxz",
      },
    },
  ]);
  function initView() {
    tripService.getAllTrips().then((response) => {
      console.log(response.data);
      setTrips(response.data);
    });
  }
  function countAvailableSeats(seats) {
    var countAvailable = seats.filter(function (element) {
      return element.isBooked === false;
    }).length;
    console.log(countAvailable);
    return countAvailable;
  }
  useEffect(() => {
    departmentsService.getAllDepartments().then((response) => {
      console.log(response.data);
      setDepartments(response.data);
    });
    initView();
  }, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Viajes</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listados de todos los viajes creados
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => {
              setOpenCreateModal(true);
            }}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-admin4 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-admin4 focus:ring-offset-2 sm:w-auto"
          >
            Crear viaje
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="  grid grid-cols-1 mb-10  bg-admin3 p-4 rounded-md">
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
                initView();
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
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Origen
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Destino
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Asientos
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {trips.map((trip, tripIdx) => (
                    <tr
                      key={trip.id}
                      className={tripIdx % 2 === 0 ? undefined : "bg-gray-50"}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {trip.originPoint.name}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {trip.destinationPoint.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(trip.departureTime).toLocaleDateString(
                          "en-gb"
                        )}
                        {" | "}
                        {Intl.DateTimeFormat("en", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }).format(new Date(trip.departureTime))}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {15 - countAvailableSeats(trip.seats)} Asientos Ocupados
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-3">
                        <button
                          onClick={() => {
                            tripService.deleteTrip(trip.id).then(() => {
                              initView();
                            });
                          }}
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectPassengers(trip.seats);
                            setOpenViewPassengersModal(true);
                          }}
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
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
      <CreateModalTripComponent
        departments={departments}
        selectedIn={selectedIn}
        setSelectedIn={setSelectedIn}
        selectedOut={selectedOut}
        setSelectedOut={setSelectedOut}
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        updateTable={initView}
      />
      <ViewPassengersComponent
        open={openViewPassengersModal}
        setOpen={setOpenViewPassengersModal}
        passengers={selectPassengers}
      />
    </div>
  );
}
