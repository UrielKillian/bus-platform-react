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
  findByPoints(start, end) {
    return http.get(`/trips/start/${start}/end/${end}`);
  }
}

export default new TripService();
