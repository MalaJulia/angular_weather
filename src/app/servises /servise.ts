import { environment } from '../../environment/environment';
import { IWeather } from './../interfaces/weather';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'




@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(protected httpClient: HttpClient) {
  }

  getAll(city : string) {


    console.log(city)
    console.log(environment.weatherApiKey,'weatherApiKey');
    const myWeather =  this.httpClient.get<IWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.weatherApiKey}`)
    console.log(myWeather, 'myWeather' )
    return myWeather
  }

} 