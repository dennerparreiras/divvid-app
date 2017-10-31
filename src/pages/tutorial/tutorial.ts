import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",/*values.TUTORIAL_SLIDE1_TITLE*/
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: 'Bem vindo ao Divvid',
            description: 'O aplicativo perfeito para você dividir/ratear a conta com os amigos de forma simples e eficiente!\r\nA seguir você vai aprender como se faz!',
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: 'O Pedido',
            description: 'Primeiramente você deve criar o pedido.\r\nEle representa um pedido/comanda de uma compra de um produto ou serviço que você queira dividir com seus amigos.',
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: 'Os Amigos',
            description: 'Dentro de cada pedido você pode listar os amigos com quem quer dividir a conta.',
            image: 'assets/img/ica-slidebox-img-3.png',
          },
          {
            title: 'Os Itens',
            description: 'Ainda dentro do pedido você pode listar os itens consumidos ou da compra/serviço.',
            image: 'assets/img/ica-slidebox-img-4.png',
          },
          {
            title: 'Fechando a conta',
            description: 'Assim que você preencher o pedido com seus amigos e os itens, você pode ratear a conta proporcionalmente para cada amigo do grupo de acordo com seu consumo.',
            image: 'assets/img/ica-slidebox-img-5.png',
          }
        ];
      });
  }

  startApp() {
    this.navCtrl.setRoot('TabsPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
