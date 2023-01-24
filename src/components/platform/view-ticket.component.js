import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ViewTicketComponent({ open, setOpen, ticket }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex font-sans justify-center items-center">
                  <div className="w-full max-w-sm mx-4 shadow-lg rounded-lg">
                    <div className="py-4 px-6 flex justify-between items-end bg-white rounded-lg rounded-b-none">
                      <div>
                        <img
                          src="https://i.imgur.com/8TkMj23.jpg"
                          className="h-8"
                          alt=""
                        />
                      </div>
                      <div>
                        <span className="uppercase font-bold text-grey-darkest tracking-wide text-sm">
                          Boleto
                        </span>
                      </div>
                    </div>

                    <div className="flex bg-red justify-around items-center py-16 px-6 sm:px-12 bg-destination">
                      <div className="flex-1 text-5xl font-bold text-white tracking-wide text-shadow-lg">
                        ON
                      </div>
                      <div className="mx-8">
                        <img
                          className="h-12"
                          src="http://www.freeiconspng.com/uploads/description-white-plane-icon-2-27.png"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 text-right text-5xl font-bold text-white tracking-wide text-shadow-lg">
                        ROAD
                      </div>
                    </div>

                    <div className="flex bg-purple-400 px-6 sm:px-12 py-4">
                      <div className="w-2/5">
                        <span className="uppercase text-purple-lighter block tracking-wide mb-1 font-thin text-xs">
                          Fecha
                        </span>
                        <span className="uppercase text-white block tracking-wide text-sm">
                          {new Date(
                            ticket.trip.departureTime
                          ).toLocaleDateString("en-gb")}
                        </span>
                      </div>
                      <div className="w-1/5">
                        <span className="uppercase text-purple-lighter block tracking-wide mb-1 font-thin text-xs">
                          Asiento
                        </span>
                        <span className="uppercase text-white block tracking-wide text-sm">
                          {ticket.seat.seatNumber}
                        </span>
                      </div>
                      <div className="w-2/5">
                        <span className="uppercase text-purple-lighter block tracking-wide mb-1 font-thin text-xs">
                          Hora
                        </span>
                        <span className="uppercase text-white block tracking-wide text-sm">
                          {Intl.DateTimeFormat("en", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }).format(new Date(ticket.trip.departureTime))}
                        </span>
                      </div>
                    </div>

                    <div className="py-8 px-6 sm:px-12 bg-white bg-plane rounded-lg rounded-t-none">
                      <div className="flex">
                        <div className="w-3/5">
                          <div className="mb-3">
                            <h4 className="text-xs uppercase tracking-wide text-grey-darker">
                              Passenger
                            </h4>
                            <p className="font-semibold tracking-wide text-purple-400">
                              {ticket.passenger.name}{" "}
                              {ticket.passenger.lastname}
                            </p>
                          </div>
                          <div className="mb-3">
                            <h4 className="text-xs uppercase tracking-wide text-grey-darker">
                              Fecha
                            </h4>
                            <p className="font-semibold tracking-wide text-grey-darkest">
                              {new Date(ticket.arrivalDate).toLocaleDateString(
                                "en-gb"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="small-3 columns">
                          <div className="mb-3">
                            <h4 className="text-xs uppercase tracking-wide text-grey-darker">
                              Asiento
                            </h4>
                            <p className="font-semibold tracking-wide text-grey-darkest">
                              {ticket.seat.seatNumber}
                            </p>
                            <div className="">
                              <h4 className="text-xs uppercase tracking-wide text-grey-darker">
                                Hora de arrivo
                              </h4>
                              <p className="font-semibold tracking-wide text-grey-darkest">
                                {Intl.DateTimeFormat("en", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }).format(new Date(ticket.arrivalDate))}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
