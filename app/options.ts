export enum SCHEMES {
    Warm,
    Cool
}

export class Options {

    public showAds: boolean;
    public colorScheme: SCHEMES;
    private _heatmaps = [
        null,
        ['rgba(0, 255, 255, 0)',
        'rgba(54, 215, 183, 1)',
        'rgba(54, 180, 170, 1)',
        'rgba(54, 140, 160, 1)',
        'rgba(54, 100, 150, 1)',
        'rgba(51, 94, 130, 1)']
    ];



    constructor() {
        if (localStorage.getItem('options')) {
            let data = JSON.parse(localStorage.getItem('options'));
            this.init(data.showAds, data.colorScheme);
        } else {
            this.init(true, SCHEMES.Warm);
        }
    }
    private init(showAds: boolean, colorScheme: SCHEMES) {
        this.showAds = showAds;
        this.colorScheme = colorScheme;
    }

    saveOptions() {
        localStorage.setItem('options', JSON.stringify(this));
    }

    public getHeatmap() {
        return this. _heatmaps[this.colorScheme];
    }
}
