import { Component  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Origin, Horoscope } from "circular-natal-horoscope-js";
import { Chart } from "astrochart-modified";


import angels from "../assets/angels.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public title:any = "";
  public sephiroth:any = "";
  public angel:any = "";
  public sephiroth_json:any = "";
  public horoscope_json:any = "";
  public element:any = "";
  public data:any = "";
  public lat:any = "";
  public long:any = "";
  keyword = 'name';

  constructor(
    private modalService: NgbModal,
    private httpClient: HttpClient
  ) {  }

  getInfo(date, time){

    let arr_date = date.split("-");
    let arr_time = time.split(":");
    this.info(
      Number(arr_date[2]),
      Number(arr_date[1]),
      Number(arr_date[0]),
      Number(arr_time[0]),
      Number(arr_time[1]),
      Number(this.lat),
      Number(this.long)
    );


  }


  info(day, month, year,hour, minutes, lat, lon) {

    let origin = new Origin({
      year: year,
      month: (month-1), // 0 = January, 11 = December!
      date: day,
      hour: hour,
      minute: minutes,
      latitude:lat,
      longitude: lon
    });

    // ['placidus', 'koch', 'whole-sign', 'equal-house', 'regiomontanus', 'topocentric']
    const horoscope = new Horoscope({
      origin: origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectPoints: ['bodies', 'points', 'angles'],
      aspectWithPoints: ['bodies', 'points', 'angles'],
      aspectTypes: ["major", "minor", "conjunction", "opposition", "quincunx"],
      customOrbs: {},
      language: 'en',
    });


    this.sephiroth = this.detail(horoscope);
    this.angel = {
      'keter':    {
        'angel': this.angel_sign(this.sephiroth.keter.sign, this.sephiroth.keter.graus)
      },
      'chockmah': {
        'angel': this.angel_sign(this.sephiroth.chockmah.sign, this.sephiroth.chockmah.graus)
      },
      'binah':    {
        'angel': this.angel_sign(this.sephiroth.binah.sign, this.sephiroth.binah.graus)
      },
      'chesed':   {
        'angel': this.angel_sign(this.sephiroth.chesed.sign, this.sephiroth.chesed.graus)
      },
      'geburah':  {
        'angel': this.angel_sign(this.sephiroth.geburah.sign, this.sephiroth.geburah.graus)
      },
      'tipheret': {
        'angel': this.angel_sign(this.sephiroth.tipheret.sign, this.sephiroth.tipheret.graus)
      },
      'netzach':  {
        'angel': this.angel_sign(this.sephiroth.netzach.sign, this.sephiroth.netzach.graus)
      },
      'hod':      {
        'angel': this.angel_sign(this.sephiroth.hod.sign, this.sephiroth.hod.graus)
      },
      'yesod':    {
        'angel': this.angel_sign(this.sephiroth.yesod.sign, this.sephiroth.yesod.graus)
      },
      'malkut':   {
        'angel': this.angel_sign(this.sephiroth.malkut.sign, this.sephiroth.malkut.graus)
      },

    };
    this.sephiroth_json = JSON.stringify(this.sephiroth);
    this.horoscope_json = horoscope;
    var settings = {COLORS_SIGNS:["#DD0A2D",  "#EE7F3A", "#FD9D24", "#FFB441", "#FFE41A", "#D1E11E", "#0C864B", "#026779", "#086EAE", "#441E69", "#7D2F61", "#BA1851"], MARGIN:80, SYMBOL_SCALE:1, POINTS_TEXT_SIZE:11
    };
    const chart = new Chart('paper', 700, 700, settings, {DEBUG:true});
    chart.radix(this.chart(horoscope)).aspects();

  }

  explode(string){
    let grau = string.split("°");
    return grau[0];
  }

  chart(horoscope){

    let data = {
      "planets": {
        "Moon": [horoscope['CelestialBodies']['moon']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Venus": [horoscope['CelestialBodies']['venus']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Jupiter": [horoscope['CelestialBodies']['jupiter']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "NNode": [horoscope['CelestialPoints']["northnode"]['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Lilith": [horoscope['CelestialPoints']["lilith"]['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Mars": [horoscope['CelestialBodies']['mars']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Saturn": [horoscope['CelestialBodies']['saturn']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Chiron": [horoscope['CelestialBodies']['chiron']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Uranus": [horoscope['CelestialBodies']['uranus']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Sun": [horoscope['CelestialBodies']['sun']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Mercury": [horoscope['CelestialBodies']['mercury']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Neptune": [horoscope['CelestialBodies']['neptune']['ChartPosition']['Ecliptic']['DecimalDegrees']],
        "Pluto": [horoscope['CelestialBodies']['pluto']['ChartPosition']['Ecliptic']['DecimalDegrees']]
      },
      "cusps": [
        horoscope['Houses']['0']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['1']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['2']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['3']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['4']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['5']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['6']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['7']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['8']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['9']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['10']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
        horoscope['Houses']['11']['ChartPosition']['StartPosition']['Ecliptic']['DecimalDegrees'],
      ]
    };
    return data;
  }

  detail(horoscope){

    let sephiroth = {
      'keter':    {
        'graus': this.explode(horoscope['CelestialBodies']['neptune']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['neptune']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign': horoscope['CelestialBodies']['neptune']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['neptune']['key'],
        'point':  horoscope['Aspects']['points']['neptune']
      },
      'chockmah': {
        'graus': this.explode(horoscope['CelestialBodies']['uranus']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['uranus']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['uranus']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['uranus']['key'],
        'point':  horoscope['Aspects']['points']['uranus']
      },
      'binah':    {
        'graus': this.explode(horoscope['CelestialBodies']['saturn']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['saturn']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['saturn']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['saturn']['key'],
        'point':  horoscope['Aspects']['points']['saturn']
      },
      'chesed':   {
        'graus': this.explode(horoscope['CelestialBodies']['jupiter']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['jupiter']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['jupiter']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['jupiter']['key'],
        'point':  horoscope['Aspects']['points']['jupiter']
      },
      'geburah':  {
        'graus': this.explode(horoscope['CelestialBodies']['mars']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['mars']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['mars']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['mars']['key'],
        'point':  horoscope['Aspects']['points']['mars']
      },
      'tipheret': {
        'graus': this.explode(horoscope['CelestialBodies']['sun']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['sun']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['sun']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['sun']['key'],
        'point':  horoscope['Aspects']['points']['sun']
      },
      'netzach':  {
        'graus': this.explode(horoscope['CelestialBodies']['venus']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['venus']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['venus']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['venus']['key'],
        'point':  horoscope['Aspects']['points']['venus']
      },
      'hod':      {
        'graus': this.explode(horoscope['CelestialBodies']['mercury']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['mercury']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['mercury']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['mercury']['key'],
        'point':  horoscope['Aspects']['points']['mercury']
      },
      'yesod':    {
        'graus': this.explode(horoscope['CelestialBodies']['moon']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['moon']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['moon']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['moon']['key'],
        'point':  horoscope['Aspects']['points']['moon']
      },
      'malkut':   {
        'graus': this.explode(horoscope['Ascendant']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['Ascendant']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['Ascendant']['Sign']['key'],
        'planet': horoscope['Ascendant']['key'],
        'point':  horoscope['Aspects']['points']['ascendant']
      },
    };
    return sephiroth;
  }

  angel_sign(sign, graus){
    let indice = 0;
    switch (sign) {
      case 'aries':
        indice = 0;
      break;
      case 'taurus':
        indice = 1;
      break;
      case 'gemini':
        indice = 2;
      break;
      case 'cancer':
        indice = 3;
      break;
      case 'leo':
        indice = 4;
      break;
      case 'virgo':
        indice = 5;
      break;
      case 'libra':
        indice = 6;
      break;
      case 'scorpio':
        indice = 7;
      break;
      case 'sagittarius':
        indice = 8;
      break;
      case 'capricorn':
        indice = 9;
      break;
      case 'aquarius':
        indice = 10;
      break;
      case 'pisces':
        indice = 11;
      break;
    }
    let test = Number(graus);
    if (test < 6) {
      return angels[indice][sign][0];
    } else if (test < 11) {
      return angels[indice][sign][1];
    } else if (test <  16) {
      return angels[indice][sign][2];
    } else if (test < 21) {
      return angels[indice][sign][3];
    } else if (test < 26) {
      return angels[indice][sign][4];
    } else if (test <= 30) {
      return angels[indice][sign][5];
    }
  }

  onChangeSearch (val: string, state) {
    let end = encodeURIComponent(state +" "+val);
    this.data =  [];

    this.getLatLong(end)
    .subscribe(data => {
      let format_data = [];
      let response = data['results'];
      for (let index = 0; index < response.length; index++) {
        let geocode = {
          id: index+1,
          name: response[index]['formatted'],
          geometry: response[index]['geometry']

        }
        format_data.push(geocode);
      }
      this.data =  format_data;
    });
    // let req = this.httpClient.get()

  }

  selectEvent (item) {
    this.lat = item.geometry.lat;
    this.long = item.geometry.lng;
  }

  getLatLong(end){
     return this.httpClient.get('https://api.opencagedata.com/geocode/v1/json?key=1bae3473c72846aa98a8fcc666fa5b65&q='+end);
  }

  openLg(content, info) {
    this.element = info;
    this.modalService.open(content, { size: 'lg' });
  }
}
