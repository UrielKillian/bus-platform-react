import {
  ClockIcon,
  CurrencyDollarIcon,
  HomeIcon,
  MapPinIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { useRef } from "react";
import Input1Componet from "../../shared/components/inputs/input-1.component";
import appService from "../../services/app.service";
import { redirect } from "react-router-dom";
export default function BuyOrdenComponent({
  start_point,
  end_point,
  arrive_time,
  selected,
  tripId,
}) {
  const name = useRef("");
  const lastName = useRef("");

  function createTicket() {
    console.log(lastName.current);
    appService
      .createPassengerAndTicket({
        tripId: tripId,
        seatId: selected.id,
        passengerName: name.current,
        passengerLastName: lastName.current,
        arrivedTime: "2023-01-25T21:53:33.299Z",
      })
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto md:pt-1 pt-10">
          <h1 className="text-xl font-semibold text-white">Factura</h1>
        </div>
      </div>
      <div className="-mx-4 mt-4 flex flex-col sm:-mx-6 md:mx-0">
        <div className="border border-pal3 rounded-md p-5 space-y-2 bg-pal3 text-white">
          <label>Detalle del viaje: </label>
          <span className="flex items-center">
            <HomeIcon className="w-6 h-6 p-0.5 mr-1 flex rounded-md bg-pal1 text-white" />{" "}
            {start_point}
          </span>
          <span className="flex items-center">
            <MapPinIcon className="w-6 h-6 p-0.5 mr-1  rounded-md bg-pal1 text-white" />{" "}
            {end_point}
          </span>
          <span className="flex items-center">
            <ClockIcon className="w-6 h-6 p-0.5 mr-1 rounded-md bg-pal1 text-white" />{" "}
            {arrive_time}
          </span>
        </div>
        {selected ? (
          <div>
            <div className="mt-5 border border-pal1 rounded-md p-5 space-y-2 bg-pal1 text-white">
              <label>Detalle del boleto: </label>
              <span className="flex items-center">
                <TicketIcon className="w-6 h-6 p-0.5 mr-1 rounded-md bg-yellow-700 text-white" />{" "}
                Asiento: {selected.seatNumber}
              </span>
              <span className="flex items-center">
                <CurrencyDollarIcon className="w-6 h-6 p-0.5 mr-1 rounded-md bg-red-700 text-white" />{" "}
                Precio: S/.Free
              </span>
              <div className="text-black">
                <Input1Componet
                  title={"Ingrese nombre"}
                  example={"Edinson"}
                  type={"text"}
                  value={name}
                  name="Name-ticket"
                />
              </div>
              <div className="text-black">
                <Input1Componet
                  title={"Ingrese apellido"}
                  example={"Cabrera"}
                  type={"text"}
                  value={lastName}
                  name="LastName-ticket"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  createTicket();
                  return redirect("/platform/tickets");
                }}
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <CurrencyDollarIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Comprar
              </button>
            </div>
          </div>
        ) : (
          <div className=" mt-5 border border-pal1 rounded-md p-5 space-y-2 bg-pal1 text-white">
            Por favor seleccione un ticket
          </div>
        )}
      </div>
    </div>
  );
}
