import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IWeather } from '../../interfaces/weather';
import { OnInit } from '@angular/core';



@Component({
  standalone: true,
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  weather: IWeather | null = null;

  ngOnInit(): void {
    const stored = localStorage.getItem('weather');
    this.weather = stored ? JSON.parse(stored) : null;
    console.log(this.weather, 'thisweather')
  }
}