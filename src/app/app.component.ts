import { Component, enableProdMode, Inject  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import angels from "../assets/angels.json";
import sephiroth from "../assets/sephiroth.json";
import tarot from "../assets/tarot.json";

enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'mapa-sephirotico';
  public arc = 60;
  public angel: any = '';
  public carta: any = '';
  public sefira: any = '';
  public dom: any = '';
  public cards_mijor: any = [];
  public infos: any = { "sephiroth": "", "carta": "", "angel": ""};

  constructor(@Inject(DOCUMENT) document: any, private activatedRoute: ActivatedRoute) {
    this.carta = tarot;
    this.sefira = sephiroth;
    this.angel = angels;
    this.dom = document;

    this.activatedRoute.queryParams.subscribe(params => {
        let major_arcana = params['major_arcana'];
        let minor_arcana = params['minor_arcana'];
        let angel_name = params['angel_name'];

        if (major_arcana) {
          this.infos.carta = this.getMajor_arcana(major_arcana);
        }

        if (minor_arcana) {
          this.infos.carta = this.getMinor_arcana(minor_arcana, false);
          console.log(this.infos.carta);

        }

        if (angel_name) {
          this.infos.angel =  this.AngelInfo(this.angel, angel_name);
        }
    });

  }

  getInfo() {
    this.infos.carta = "";

    this.sefira[0].kether.angel = this.angel_sign(
      this.dom.getElementById('select_neptune').value,
      this.dom.getElementById('graus_neptune').value
    );
    this.sefira[0].chokmah.angel = this.angel_sign(
      this.dom.getElementById('select_uranus').value,
      this.dom.getElementById('graus_uranus').value
    );
    this.sefira[0].binah.angel = this.angel_sign(
      this.dom.getElementById('select_saturn').value,
      this.dom.getElementById('graus_saturn').value
    );
    this.sefira[0].daath.angel = this.angel_sign(
      this.dom.getElementById('select_pluto').value,
      this.dom.getElementById('graus_pluto').value
    );
    this.sefira[0].chesed.angel = this.angel_sign(
      this.dom.getElementById('select_jupiter').value,
      this.dom.getElementById('graus_jupiter').value
    );
    this.sefira[0].geburah.angel = this.angel_sign(
      this.dom.getElementById('select_mars').value,
      this.dom.getElementById('graus_mars').value
    );
    this.sefira[0].tipheret.angel = this.angel_sign(
      this.dom.getElementById('select_sol').value,
      this.dom.getElementById('graus_sol').value
    );
    this.sefira[0].netzach.angel = this.angel_sign(
      this.dom.getElementById('select_venus').value,
      this.dom.getElementById('graus_venus').value
    );
    this.sefira[0].hod.angel = this.angel_sign(
      this.dom.getElementById('select_mercury').value,
      this.dom.getElementById('graus_mercury').value
    );
    this.sefira[0].yesod.angel = this.angel_sign(
      this.dom.getElementById('select_luna').value,
      this.dom.getElementById('graus_luna').value
    );
    this.sefira[0].malkuth.angel = this.angel_sign(
      this.dom.getElementById('select_ascendant').value,
      this.dom.getElementById('graus_ascendant').value
    );

    this.searchInfo('tipheret');

  }

  searchInfo(name : any){
    this.infos.carta = "";
    this.infos.sephiroth = "";
    this.cards_mijor = [];
    if (name != 'daath') {
      this.sefira[0][name].minor_arcana = this.sefira[0][name].minor_arcana.map((card: any) => this.getMinor_arcana(card, true));

    }

    this.infos.sephiroth = this.sefira[0][name];

  }

  searchCaminho(name : any){

    this.infos.carta = "";
    this.infos.sephiroth = "";

    this.infos.carta = this.getMajor_arcana(name);
  }

  getMajor_arcana(name: string){

    let card = this.carta[0].major_arcana[name];
    return card;
  }

  getMinor_arcana(name: string, array: boolean){
    if (typeof name === 'string') {
      let card = this.carta[0].minor_arcana[name];

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
    if (test < 6) {
      return this.angel[indice][sign][0];
    } else if (test < 11) {
      return this.angel[indice][sign][1];
    } else if (test < 16) {
      return this.angel[indice][sign][2];
    } else if (test < 21) {
      return this.angel[indice][sign][3];
    } else if (test < 26) {
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
        if(element[key][index2].angel = name){
          return element[key][index2];
        }
      }

    }
  }

  getValue(name: string) {
    return (<HTMLInputElement>document.getElementById(name));
  }

}
