import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) { }

  getLatLong(fulladdress: string): Observable<any>{
    return this.http.get(environment.geocodeApiBaseUrl, {
      headers: new HttpHeaders().set(environment.header3Key, environment.header3Value)
      .set(environment.header4Key, environment.header4Value),
      params: new HttpParams().set('address', fulladdress)
    })
  }
}
