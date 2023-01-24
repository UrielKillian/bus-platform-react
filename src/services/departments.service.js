import http from "./http-common";

class DepartmentService {
  getAllDepartments() {
    return http.get("/departments");
  }
}

export default new DepartmentService();
