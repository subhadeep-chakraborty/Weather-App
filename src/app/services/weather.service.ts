import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }


  getWeatherData(location: any):Observable<any>{
    return this.http.get(environment.weatherApiBaseUrl, {
      headers: new HttpHeaders().set(environment.header1Key, environment.header1Value)
      .set(environment.header2Key, environment.header2Value),
      params: new HttpParams().set('aggregateHours',24)
      .set('location', location)
      .set('contentType', 'json')
      .set('unitGroup', 'metric')
      .set('shortColumnNames', false)
    })
  }

}
