import { Component, enableProdMode, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { Chart } from "astrochart-modified";
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import * as CryptoJS from 'crypto-js';

import { DataService } from '../services/data.service';
import { GeocodeService } from '../services/geocode.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public title = 'Kabbalah Hermética';
  public arc = 60;
  public angel: any = '';
  public carta: any = '';
  public sefira: any = {};
  public caractere_hebraico: any = '';
  public horoscope_info: any = '';
  public dom: any = '';
  public mobile: any = false;
  public cards_mijor: any = [];

  public element:any = "";
  public data:any = "";
  public lat:any = "";
  public long:any = "";
  keyword = 'name';
  public infos: any = { "sephiroth": "", "carta": "", "angel": "", "caractere_hebraico": ""};

  constructor(
    @Inject(DOCUMENT) document: any,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataapi: DataService,
    private geocode: GeocodeService
    ) {
    this.dom = document;

    this.activatedRoute.queryParams.subscribe(params => {
        let major_arcana = (params['major_arcana'] != '') ? params['major_arcana'] : null ;
        let minor_arcana = (params['minor_arcana'] != '') ? params['minor_arcana'] : null ;
        let angel_name = (params['angel_name'] != '') ? params['angel_name'] : null ;
        let astrology_chart = (params['astrology_chart'] != '') ? params['astrology_chart'] : null ;

        if (major_arcana) {

          this.dataapi['getJsonTarot']().then(result =>{
            this.carta = result;
            this.infos.carta = this.getMajor_arcana(major_arcana);
          });
        }

        if (minor_arcana) {

          this.dataapi.getJsonTarot().then(result =>{
            this.carta = result;
            this.infos.carta = this.getMinor_arcana(minor_arcana, false);
          });

        }

        if (angel_name) {

          this.dataapi.getJsonAngel().subscribe(result =>{
            this.angel = result;
            this.infos.angel =  this.AngelInfo(this.angel, angel_name);

          });
        }

        if (astrology_chart) {

          this.dataapi.getJsonAngel().subscribe(result =>{
            this.angel = result;
            this.dataapi.getJsonTarot().then(result2 =>{
              this.carta = result2;
              this.structureInfo(decodeURI(astrology_chart.replace(/ /g, "+")));
            });

          });
        }
    });

  }

  ngOnInit() {

    this.dataapi.getJsonAngel().subscribe(result =>{
      this.angel = result;

    });
    this.dataapi.getJsonSephiroth().subscribe(result =>{
      this.sefira = result;

    });
    this.dataapi.getJsonCaractere_hebraico().subscribe(result =>{
      this.caractere_hebraico = result;

    });
    this.dataapi.getJsonTarot().then(result =>{
      this.carta = result;

    }).catch((e) => console.error(e));

  }

  getInfo(){

    let arr_date = this.dom.getElementById('date').value.split("-");
    let arr_time = this.dom.getElementById('time').value.split(":");

    let t = arr_date.map((i: any) => {
      let algo: Array<any> = [];
      for (let index = 0; index < i.length; index++) {
        algo.push(i[index]);

      }
      return algo;
    });
    let data_user: any = {
      year: Number(arr_date[0]),
      month: (Number(arr_date[1])-1), // 0 = January, 11 = December!
      date: Number(arr_date[2]),
      hour: Number(arr_time[0]),
      minute: Number(arr_time[1]),
      latitude:Number(this.lat),
      longitude: Number(this.long),
      algo: [...t[2],...t[1],...t[0]]
    };


    let text_user = JSON.stringify(data_user);
    console.log(text_user);
    let ciphertext = CryptoJS.AES.encrypt(text_user, "kabbalah hermetica").toString();
    console.log(ciphertext);
    let decrypttext: any = CryptoJS.AES.decrypt(ciphertext, "kabbalah hermetica");
    let decrypted = CryptoJS.enc.Utf8.stringify(decrypttext)
    console.log(JSON.parse(decrypted));
    this.router.navigate([`/suas_infos/`, {id: ciphertext}])
  }

  search(name: string){

  }

  structureInfo(ciphertext){

    // let text_user = JSON.stringify(data_user);
    // console.log(text_user);
    // let ciphertext = CryptoJS.AES.encrypt(text_user, "kabbalah hermetica").toString();

    console.log(ciphertext);
    var bytes  = CryptoJS.AES.decrypt(ciphertext, "kabbalah hermetica");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData);

    this.factoryInfo(decryptedData);

  }

  factoryInfo(data_user) {
    this.infos.carta = "";
    this.infos.caractere_hebraico = "";
    this.dom.getElementById('paper').innerHTML ="";


    let origin = new Origin(data_user);


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

    this.horoscope_info = this.detail(horoscope);


    var settings = {COLORS_SIGNS:["#DD0A2D",  "#EE7F3A", "#FD9D24", "#FFB441", "#FFE41A", "#D1E11E", "#0C864B", "#026779", "#086EAE", "#441E69", "#7D2F61", "#BA1851"], MARGIN:80, SYMBOL_SCALE:1, POINTS_TEXT_SIZE:11
    };
    const chart = new Chart('paper', 700, 700, settings, {DEBUG:true});

    chart.radix(this.chart(horoscope)).aspects();

    this.sefira[0].kether.angel = this.angel_sign(this.horoscope_info.keter.sign,this.horoscope_info.keter.graus );
    this.sefira[0].chokmah.angel = this.angel_sign(this.horoscope_info.chokmah.sign,this.horoscope_info.chokmah.graus );
    this.sefira[0].binah.angel = this.angel_sign(this.horoscope_info.binah.sign,this.horoscope_info.binah.graus );
    this.sefira[0].daath.angel = this.angel_sign(this.horoscope_info.daath.sign,this.horoscope_info.daath.graus );
    this.sefira[0].chesed.angel = this.angel_sign(this.horoscope_info.chesed.sign,this.horoscope_info.chesed.graus );
    this.sefira[0].geburah.angel = this.angel_sign(this.horoscope_info.geburah.sign,this.horoscope_info.geburah.graus );
    this.sefira[0].tipheret.angel = this.angel_sign(this.horoscope_info.tipheret.sign,this.horoscope_info.tipheret.graus );
    this.sefira[0].netzach.angel = this.angel_sign(this.horoscope_info.netzach.sign,this.horoscope_info.netzach.graus );
    this.sefira[0].hod.angel = this.angel_sign(this.horoscope_info.hod.sign,this.horoscope_info.hod.graus );
    this.sefira[0].yesod.angel = this.angel_sign(this.horoscope_info.yesod.sign,this.horoscope_info.yesod.graus );
    this.sefira[0].malkuth.angel = this.angel_sign(this.horoscope_info.malkuth.sign,this.horoscope_info.malkuth.graus );

    this.searchInfo('tipheret');
  }

  searchInfo(name : any){
    this.infos.carta = "";
    this.infos.sephiroth = "";
    this.infos.caractere_hebraico = "";
    this.cards_mijor = [];
    if (name != 'daath') {
      this.sefira[0][name].minor_arcana = this.sefira[0][name].minor_arcana.map((card: any) => this.getMinor_arcana(card, true));

    }

    this.infos.sephiroth = this.sefira[0][name];

  }

  searchPassage(name : any){

    this.infos.carta = "";
    this.infos.sephiroth = "";
    this.infos.caractere_hebraico = "";

    this.infos.carta = this.getMajor_arcana(name);

  }

  teste(value: any){
    this.dataapi.getJsonTarot().then((result: any) => {
      // console.log(Object.keys(result[0]));


      let test: any = Object.values(result)
      .filter((key: any) =>{

        return Object.values(key);

      });
      let teste3 = Object.values(test[0]).concat(Object.values(test[1]));

      let test2 = teste3.filter((key2: any) => {
        return key2.name.includes('co');
      });

      console.log(test2);

    })
    .catch((e) => console.error(e));
  }

  getMajor_arcana(name: string){
    let card = this.carta.major_arcana[name];
    console.log(card);
    card.caractere_hebraico = this.caractere_hebraico[card['caractere_hebraico_link']];

    return card;
  }

  getMinor_arcana(name: string, array: boolean){
    if (typeof name === 'string') {
      let card = this.carta.minor_arcana[name];
      card.caractere_hebraico = this.caractere_hebraico[card['caractere_hebraico_link']];

      console.log(card);

      if(array === true){
        let id = card['id'];
        this.cards_mijor.push({[id]: false});

      }

      return card;

    }else{

      return name;
    }
  }

  getCaractere_hebraico(name: string){
    this.infos.caractere_hebraico = this.caractere_hebraico[name];

  }

  angel_sign(sign: any, graus: any) {

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
    if (test < 5) {
      return this.angel[indice][sign][0];
    } else if (test < 10) {
      return this.angel[indice][sign][1];
    } else if (test < 15) {
      return this.angel[indice][sign][2];
    } else if (test < 20) {
      return this.angel[indice][sign][3];
    } else if (test < 25) {
      return this.angel[indice][sign][4];
    } else if (test <= 30) {
      return this.angel[indice][sign][5];
    }
  }

  AngelInfo(angel: any, name: string){

    for (let index = 0; index < angel.length; index++) {
      const element = angel[index];
      for (let index2 = 0; index2 < Object.keys(element).length; index2++) {
        let key = Object.keys(element)[index2];

        let response = element[key].filter((info) => {
          return info.angel === name.toUpperCase();
        })
        if (Object.keys(response).length > 0) {
          return response[0];

        }
      }

    }
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
      'chokmah': {
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
      'daath':    {
        'graus': this.explode(horoscope['CelestialBodies']['pluto']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['CelestialBodies']['pluto']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['CelestialBodies']['pluto']['Sign']['key'],
        'planet': horoscope['CelestialBodies']['pluto']['key'],
        'point':  horoscope['Aspects']['points']['pluto']
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
      'malkuth':   {
        'graus': this.explode(horoscope['Ascendant']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30']),
        'position': horoscope['Ascendant']['ChartPosition']['Ecliptic']['ArcDegreesFormatted30'],
        'sign':horoscope['Ascendant']['Sign']['key'],
        'planet': horoscope['Ascendant']['key'],
        'point':  horoscope['Aspects']['points']['ascendant']
      },
    };
    return sephiroth;
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

  explode(string: string){
    let grau = string.split("°");
    return grau[0];
  }

  onChangeSearch (val: string, state) {
    let end = encodeURIComponent(state +" "+val);
    this.data =  [];

    this.geocode.getLatLong(end)
    .subscribe(data => {
      let format_data: Array<any> = [];
      let response: Array<any> = data['results'];
      for (let index = 1; index < response.length; index++) {
        let geocode: any = {
          id: index,
          name: response[index]['formatted'],
          geometry: response[index]['geometry']

        }
        format_data.push(geocode);
      }
      this.data =  format_data;
    });

  }

  selectEvent (item: any) {
    this.lat = item.geometry.lat;
    this.long = item.geometry.lng;
  }


  getTarot(){

    this.dataapi.getJsonTarot().then(result =>{
      console.log(result);

      this.carta = result;

    }).catch((e) => console.error(e));
  }
}
