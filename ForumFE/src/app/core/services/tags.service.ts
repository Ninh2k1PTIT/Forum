import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable()
export class TagsService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<any> {
    return this.apiService.get("/tags");
  }

  getByName(name): Observable<any> {
    return this.apiService.post("/tag-by-name", { name: name });
  }
}
