import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { event as d3Event } from 'd3-selection';
import { GeoDataServiceService } from './services/geo-data-service.service';
import { HelperService } from './services/helper.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'globe-demo';

  private countryData;
  public countryDetails: string | undefined;

  constructor(private readonly http: HttpClient, private geoDataService: GeoDataServiceService, 
    private helperService: HelperService) {
  }

  ngOnInit(): void {
    this.getCountriesScoreData();
  }

  private getCountriesScoreData() : void{
    this.geoDataService.getCountriesScoreData()
      .subscribe(data => { 
        this.countryData = data;
        this.getCountriesDetails();
      })
  }

  private getCountriesDetails() : void{
    this.geoDataService.getCountriesData()
      .subscribe(countriesDetails => this.loadGlobe(countriesDetails));
  }


  private loadGlobe(countriesDetails :any) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const sensitivity = 75;

    const projection = d3.geoOrthographic()
      .scale(400)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);


    const initialScale = projection.scale();
    let path = d3.geoPath().projection(projection);

    const svg = d3.select('#globe')
      .append('svg')
      .attr('width', width - 20)
      .attr('height', height - 20);

    const globe = svg.append('circle')
      .attr('fill', '#ADD8E6')
      .attr('stroke', '#000')
      .attr('stroke-width', '0.2')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', initialScale);

    svg.call(d3.drag().on('drag', () => {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([
        rotate[0] + d3Event.dx * k,
        rotate[1] - d3Event.dy * k
      ]);
      path = d3.geoPath().projection(projection);
      svg.selectAll('path').attr('d', path);
    }))
      .call(d3.zoom().on('zoom', () => {
        if (d3Event.transform.k > 0.3) {
          projection.scale(initialScale * d3Event.transform.k);
          path = d3.geoPath().projection(projection);
          svg.selectAll('path').attr('d', path);
          globe.attr('r', projection.scale());
        }
        else {
          d3Event.transform.k = 0.3;
        }
      }));

    const map = svg.append('g');


      map.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(countriesDetails.features)
        .enter().append('path')
        .attr('class', (d: any) => 'country_' + d.properties.ISO_A2)
        .attr('d', path)
        .attr('fill', (d: any) => this.helperService.getScoreColour(this.getCountryScore(d.properties.ISO_A2)))
        .style('stroke', 'black')
        .style('stroke-width', 0.3)
        .on('mouseleave', (d: any) => this.clearDetails())
        .on('mouseover', (d: any) => this.showDetails(d.properties.ISO_A2, d.properties.NAME));

  }

  private getCountryScore(countryCode: string): number | undefined {
    const country = this.countryData[countryCode];
    return country ? (country.entitled ? country.score:-1) : undefined;
  }

  private clearDetails() {
    this.countryDetails = undefined;
  }

  private showDetails(countryCode: string, countryName: string) {
    const country = this.countryData[countryCode];
    if (!country || !country.entitled) {
      this.countryDetails = `No data available for ${countryName}`;
      return;
    }

    //Just an extra validation in case entitled property is true and score is not available
    this.countryDetails = `${countryName}: ${country.score?country.score.toFixed(2):"Missing Data"}`; 
    //this.countryDetails = `${countryName}: ${country.score.toFixed(2)}`; //TODO add to notes
  }
}
