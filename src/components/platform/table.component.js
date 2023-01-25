import Select1Component from "../../shared/components/selects/select-1.component";
import { useEffect, useState } from "react";
import tripService from "../../services/trip.service";
import departmentsService from "../../services/departments.service";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import BuyTicketComponent from "./buy-ticket.component";
import TravelCardComponent from "../../shared/components/cards/travel-card.component.tsx";

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
        <div className="md:flex mb-10  bg-pal1 p-4 rounded-md">
          <div className="grid md:grid-cols-2 w-full grid-cols-1 md:space-x-3">
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
          <div className="justify-end flex mt-3 ml-3 space-x-2">
            <button
              onClick={() => {
                tripService
                  .findByPoints(selectedFilterOut.name, selectedFilterIn.name)
                  .then((response) => {
                    console.log(response.data);
                    setTrips(response.data);
                  });
              }}
              className="text-black px-2 py-1.5 mt-3 border border-gray-300 bg-white rounded-md"
            >
              Buscar
            </button>
            <button
              onClick={() => {
                init();
              }}
              className="text-black px-2 py-1.5 mt-3 border border-gray-300 bg-white rounded-md"
            >
              <ArrowPathIcon className="h-5 w-5 text-red-700" />
            </button>
          </div>
        </div>
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="bg-white">
                <div className="mx-auto max-w-2xl py-3 px-4 sm:px-6 lg:max-w-7xl">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Los mejores viajes:
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {trips.map((trip) => (
                      <TravelCardComponent
                        trip={trip}
                        setSelected={setSelectTrip}
                        setOpenTicketModal={setOpenTicketModal}
                      />
                    ))}
                  </div>
                </div>
              </div>
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
