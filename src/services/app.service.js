import http from "./http-common";

class AppService {
  createTripAndCreateSeats(data) {
    return http.post("/app", data);
  }
  createPassengerAndTicket(data) {
    return http.post("/app/app/ticket", data);
  }
}

export default new AppService();
