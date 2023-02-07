import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GeocodingService } from './services/geocoding-service/geocoding.service';
import { WeatherService } from './services/weather.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  lat: any;
  lng: any;
  weatherAPIData: any;
  searchForm: any;
  currTemp: any;
  currLocation: any;
  currTime: any;
  feelsLike: any;
  windSpd: any;
  currHumidity: any;
  locationCoordinates: any;

  constructor(private geoService: GeocodingService,
    private weatherService: WeatherService){
     
    }

   ngOnInit() {
     this.searchForm = new FormGroup({
      searchTxt : new FormControl('')
     });
     this.currLocation= 'Kolkata'
     this.currTemp = 10;
     this.currTime = new Date("2023-02-07T11:05:00-05:00").toLocaleTimeString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).replace(/ /g, ' ').replace(' at',',');
    this.feelsLike= 8;
    this.windSpd=11;
    this.currHumidity =9;
     
  
  }

  getWeather(locationCoordinates: any){
    new Promise((resolve, reject)=> {
        this.weatherService.getWeatherData(locationCoordinates).subscribe((response) => {

          if(response?.locations[locationCoordinates]?.currentConditions?.temp){
            this.weatherAPIData = response.locations[locationCoordinates].currentConditions;
            
            resolve(this.setUIData(this.weatherAPIData));
          }else{
            if(response.error){
              reject(alert("Weather API error with message"+ response.error));
            }
          }
      
    })
  })
  }

  getLocationInfo(searchTxt: string){
      new Promise((resolve,reject)=> {
      this.geoService.getLatLong(searchTxt).subscribe((response) => {
       
        if(response?.results?.length){
          if(response.results[0].sublocality){
            this.currLocation = response.results[0].sublocality +','+ response.results[0]?.country;
          }else if(response.results[0].locality){
              this.currLocation = response.results[0].locality +','+ response.results[0]?.country;
            }else if(response.results[0].region){
              this.currLocation = response.results[0].region +','+ response.results[0]?.country;
            }
            else{
              this.currLocation = response.results[0]?.country;
            }
            
            
          this.lat= response.results[0]?.location?.lat;
          this.lng= response.results[0]?.location?.lng;
          this.locationCoordinates = this.lat+','+this.lng;
          resolve(this.getWeather(this.locationCoordinates));
        }else{
          if(response?.error){
            reject(alert(response?.error))
          }
        }
      });
    });
  }

  setUIData(weatherData: any){
    this.currTemp = weatherData.temp;
    this.currTime= new Date(weatherData.datetime).toLocaleTimeString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).replace(/ /g, ' ').replace(' at',',') || 'no-data';
    this.feelsLike = weatherData.heatindex || weatherData.windchill || 'no-data';
    this.windSpd = weatherData.wspd || 'no-data';
    this.currHumidity = weatherData.humidity || 'no-data';


  }

   searchEvent(){
    const loc= this.searchForm.get('searchTxt').value;
    if(loc !== ''){
      this.getLocationInfo(loc);
    }
  }


}

