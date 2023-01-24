import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, MapIcon, TruckIcon } from "@heroicons/react/24/outline";
import Select1Component from "../../shared/components/selects/select-1.component";
import tripService from "../../services/trip.service";
import appService from "../../services/app.service";
export default function CreteModalTripComponent({
  departments,
  selectedOut,
  selectedIn,
  setSelectedOut,
  setSelectedIn,
  open,
  setOpen,
  updateTable,
}) {
  const cancelButtonRef = useRef(null);
  const selectDate = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-admin2">
                    <MapIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Creando un nuevo viaje
                    </Dialog.Title>
                    <div className="mt-2 space-y-3">
                      <div className="text-left">
                        <Select1Component
                          title={"Seleccione punto de inicio:"}
                          items={departments}
                          selected={selectedOut}
                          setSelected={setSelectedOut}
                          className="text-black"
                        />
                      </div>
                      <div className="text-left">
                        <Select1Component
                          title={"Seleccione punto de destino:"}
                          items={departments}
                          selected={selectedIn}
                          setSelected={setSelectedIn}
                        />
                      </div>
                      <div className=" text-left">
                        <label>Seleccione fecha de salida:</label>
                        <input
                          className="p-2 rounded-md  block w-full border-gray-300"
                          type="datetime-local"
                          id="start"
                          onChange={(e) => {
                            selectDate.current = e.target.value;
                          }}
                          name="trip-start"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-admin2 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-admin2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={() =>
                      appService
                        .createTripAndCreateSeats({
                          originPoint: selectedOut.id,
                          destinationPoint: selectedIn.id,
                          departureTime: selectDate.current,
                        })
                        .then((res) => {
                          console.log(res);
                          updateTable();
                          setOpen(false);
                        })
                    }
                  >
                    Crear
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
