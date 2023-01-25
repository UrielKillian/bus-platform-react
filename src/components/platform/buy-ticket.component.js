import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon, TicketIcon } from "@heroicons/react/24/outline";
import BuyOrdenComponent from "./buy-orden.component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function BuyTicketComponent({
  open,
  setOpen,
  selectedTrip,
  init,
}) {
  const [selected, setSelected] = useState(null);
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
              <Dialog.Panel className="relative transform overflow-hidden bg-pal1 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-700 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8  sm:w-[50rem] sm:p-6">
                <div className="p-5 border border-transparent  rounded-md">
                  <div className="grid md:grid-cols-4 grid-cols-1 ">
                    <div className="border p-2 border-gray-900 md:col-span-1 bg-pal1 items-center text-center rounded-md">
                      <div className="border border-pal3 rounded-md text-white bg-pal3">
                        Conductor
                      </div>
                      <div className="grid grid-cols-2 mb-10">
                        {selectedTrip.seats.map((seat) => (
                          <div key={seat.id}>
                            {!seat.isBooked ? (
                              <button
                                onClick={() => {
                                  if (!selected) {
                                    setSelected(seat);
                                  }
                                  if (selected?.id === seat.id) {
                                    setSelected(null);
                                  }
                                }}
                                className={classNames(
                                  selected?.id === seat.id
                                    ? "px-2 py-1.5 border mt-5 border-green-500 bg-green-500 rounded-md"
                                    : "px-2 py-1.5 border mt-5 border-indigo-500 bg-pal2 rounded-md"
                                )}
                              >
                                <TicketIcon className="h-6 w-6 text-white" />
                              </button>
                            ) : (
                              <div>
                                <button className="px-2 py-1.5 cursor-not-allowed border mt-5 border-red-800 bg-red-800 rounded-md">
                                  <LockClosedIcon className="h-6 w-6 text-white" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className=" md:col-span-3">
                      <BuyOrdenComponent
                        start_point={selectedTrip.originPoint.name}
                        end_point={selectedTrip.destinationPoint.name}
                        arrive_time={selectedTrip.departureTime}
                        selected={selected}
                        setSelected={setSelected}
                        tripId={selectedTrip.id}
                        setOpen={setOpen}
                        init={init}
                      />
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
