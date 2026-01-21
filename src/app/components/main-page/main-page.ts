import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';
import { WeatherService } from './../../servises /servise';
import { IWeather } from './../../interfaces/weather';
import { cities } from './../../constants/cityes';
import { NavigationExtras, Router } from "@angular/router";

interface City {
  q: string;
  name: string;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css']
})
export class MainPage {
  weatherService = inject(WeatherService);
  router = inject(Router)

  myControl = new FormControl<City | string>('');
  weather: Observable<IWeather> | null = null;
  tempMax:  number | null = null;
  tempMin:  number | null = null;
  // forDetails : any


  cities = cities;

  filteredCities: Observable<City[]> = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : value?.name.toLowerCase() ?? '';
      return this.cities
        .filter(city => city.name.toLowerCase().includes(filterValue))
        .slice(0, 5);
    })
  );


  displayCity(city?: City): string {
    return city ? city.name : '';
  }

  test(city: City): void {
    const query = city.q;
    this.weather = this.weatherService.getAll(query).pipe(
      map(res => {
       this.tempMax = Math.ceil(res.main.temp_max)
       this.tempMin = Math.floor(res.main.temp_min)
       localStorage.setItem('weather', JSON.stringify(res));
        console.log(res, 'weather result');
        return res;
      })
    );
  }
  goToWeatherDetail(forDetails:any) {
    if (!forDetails) return; // якщо погоди ще немає — нічого не робимо

    const navigationExtras: NavigationExtras = {
      state: { weather: forDetails }
    };

    this.router.navigate(['/details'], navigationExtras);
  }
}


//   filter(): void {
//    this.filterValue = this.input.nativeElement.value.toLowerCase()
//    this.cities.filter(o => o.name.toLowerCase().includes(this.filterValue))
//    console.log(this.filterValue)
//   }
 
//   test(query: string): void {
//   this.weather = this.weatherService.getAll(query).pipe(map((rec)=> {
//   console.log(rec, 'rec')
//   return rec
// }))
//   }
 
  // weather: Observable<IWeather> = this.weatherService.getAll(''); 
  
// }
