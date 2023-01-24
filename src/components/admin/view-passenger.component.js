import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ViewPassengersComponent({ open, setOpen, passengers }) {
  useEffect(() => {
    console.log(passengers);
  });
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-[70rem] sm:p-6">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Asientos
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">
                        Mostrano todos los usuarios del viaje
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
                                  Asiento Nro
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Nombre
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Apellido
                                </th>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                                >
                                  Ocupado
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {passengers.map((item) => (
                                <tr
                                  key={item.id}
                                  className="divide-x divide-gray-200"
                                >
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                    {item.id}
                                  </td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                    {item.passenger
                                      ? item.passenger.name
                                      : "No hay pasajero"}
                                  </td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                    {item.passenger
                                      ? item.passenger.lastName
                                      : "No hay pasajero"}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                                    {item.isBooked ? "Si" : "No"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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
