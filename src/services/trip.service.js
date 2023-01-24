import http from "./http-common";

class TripService {
  createTrip(data) {
    return http.post("/trips", data);
  }
  getAllTrips() {
    return http.get("/trips");
  }
  deleteTrip(id) {
    return http.delete(`/trips/${id}`);
  }
}

export default new TripService();
