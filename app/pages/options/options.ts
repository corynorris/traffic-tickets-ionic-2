import {Page, NavController, Toast} from 'ionic-angular';
import {Options, SCHEMES} from "../../options";
import {KeysPipe} from "../../pipes/enum-keys.pipe";


@Page({
    pipes: [KeysPipe],
    templateUrl: 'build/pages/options/options.html'
})

export class OptionsPage  {

    public options : Options;
    public schemes = SCHEMES;
    
    constructor(
        private _nav: NavController
    ) {
        this.options = new Options();
    }

    saveOptions() {
        this.options.saveOptions();
        let toast = Toast.create({
            message: 'Settings Saved',
            duration: 2000
        });
        this._nav.present(toast);

    }

}
