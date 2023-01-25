import React from "react";
import { ShoppingCartIcon, TicketIcon } from "@heroicons/react/24/outline";
function countAvailableSeats(seats) {
    var countAvailable = seats.filter(function (element) {
        return element.isBooked === false;
    }).length;
    console.log(countAvailable);
    return countAvailable;
}
export default function TravelCardComponent({ trip, setSelected, setOpenTicketModal }) {
    return (
        <div key={trip.id} className="relative">
            <div className=" w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none h-28">
                <img
                    src={
                        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80"
                    }
                    alt={trip.id}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="-mt-1 text-xs border rounded-t-md bg-gray-200 border-gray-200 relative border-transparent rounded-md py-1  z-10  justify-between">
                <div>
                    <label className="ml-1">
                        Viaje el <strong>{new Date(trip.departureTime).toLocaleDateString(
                            "en-gb"
                        )} - {Intl.DateTimeFormat("en", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        }).format(new Date(trip.departureTime))}</strong>
                    </label>
                </div>
                <div className="mt-1 border rounded-md border-transparent bg-white p-3 z-10 justify-between">
                    <div>
                        <h3 className="text-md text-gray-700">
                            <div className="flex items-center">
                                <label>{trip.originPoint.name} - {trip.destinationPoint.name}</label>
                                <span className="inline-flex items-center ml-1 rounded-full bg-green-200 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                    <TicketIcon className="h-4 w-4" />
                                    {
                                        countAvailableSeats(trip.seats)
                                    }{" "}disponibles
                                </span>
                            </div>
                        </h3>
                        <div className="mt-1 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx={4} cy={4} r={3} />
                                </svg>
                                Solo ida
                            </span>
                            <span className="inline-flex ml-2 items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx={4} cy={4} r={3} />
                                </svg>
                                Económico
                            </span>
                        </div>
                        <div>
                            <label className="text-gray-500 text-sm">Precio final</label>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-md font-bold text-purple-700">S/.Free</p>
                                    <p className="font-bold text-purple-700">$ 300</p>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        setSelected(trip)
                                        setOpenTicketModal(true)
                                    }} className="group p-2 border border-gray-400 rounded-md bg-purple-700">
                                        <ShoppingCartIcon className="group-hover:animate-ping h-5 w-5 group text-white" />
                                    </button>
                                </div>
                            </div>
                            <label className="text-gray-500 text-sm">Tasas incluídas - Viaje directo</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}