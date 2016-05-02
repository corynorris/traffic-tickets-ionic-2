import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MapPage} from './pages/map/map';
import {AddTicketsPage} from './pages/add-tickets/add-tickets';
import {OptionsPage} from './pages/options/options';
import {AboutPage} from './pages/about/about';
import {JSONP_PROVIDERS, HTTP_PROVIDERS}  from 'angular2/http';

// TODO: Add Ticket on server
// TODO: Validate addTicket form data

@App({
  templateUrl: 'build/app.html',
    providers: [JSONP_PROVIDERS, HTTP_PROVIDERS],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  rootPage: any = MapPage;
  pages: Array<{title: string, component: any}>;
  showRating: boolean;

  constructor(private app: IonicApp, private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Map', component: MapPage },
      { title: 'Add Tickets', component: AddTicketsPage },
      { title: 'Options', component: OptionsPage },
      { title: 'About', component: AboutPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString("#36D7B7");
      

      if (this.platform.is('ios') ||
            this.platform.is('android')) {
        this.showRating = true;
      } else {
        this.showRating = false;
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

  rate(){
    if (this.platform.is('ios')) {
      window.open('itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id511364723?ls=1&mt=8', '_system'); // or itms://
    } else if (this.platform.is('android')) {
      window.open('market://details?id=<package_name>', '_system');
    }
  }

  tweet() {
    window.open('https://twitter.com/intent/tweet?text=Find%20safe%20places%20to%20park%20by%20heat%20mapping%20traffic%20tickets!%20%23parker-app', '_system');
  }
}
