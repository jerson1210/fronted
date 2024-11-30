import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { conductor } from '../models/conductor';

@Injectable({
  providedIn: 'root'
})
export class HomeConductorService {

  private apiUrl ="http://localhost:8080/conductor"

  constructor(private http:HttpClient) { }

  listarConductors(): conductor | null {
    return null;
  }
}


