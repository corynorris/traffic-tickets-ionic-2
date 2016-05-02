import {Page} from 'ionic-angular';
import {TicketService} from "../../services/ticket.service";
import LatLng = google.maps.LatLng;
import LatLngBounds = google.maps.LatLngBounds;
import {Options} from "../../options";
import Map = google.maps.Map;
import HeatmapLayer = google.maps.visualization.HeatmapLayer;


@Page({
    templateUrl: 'build/pages/map/map.html',
    providers: [TicketService]

})

export class MapPage {

    private _map: Map;
    private _heatmap: HeatmapLayer;
    private _ticketService: any;

    constructor(_ticketService: TicketService) {
        this._ticketService = _ticketService;
    }

    // load a new map
    onPageLoaded() {
        this.initializeMap();
        this.registerListeners();

    }

    // refresh map if it's been cached
    onPageDidEnter() {
        let options = new Options();
        this._heatmap.set('gradient', options.getHeatmap());
        google.maps.event.trigger(this._map, "resize");
    }

    initializeMap() {
        console.log('initialize map');
        let startingLatLng = new google.maps.LatLng(43.7000, -79.4000);

        this._map = new google.maps.Map(document.getElementById("map"), {
            center: startingLatLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        });

        this._heatmap = new google.maps.visualization.HeatmapLayer({
            map: this._map,
            data: []
        });

        this._ticketService.getTicketsInRange(43.69052069047582, -79.40772476196287, 43.709477811055464, -79.39227523803709)
            .subscribe(
                data => this._heatmap.setData(data),
                error => console.log(error)
            );
        // this._heatmap.setData(
        //     this._ticketService.getTicketsInRange(43.709477811055464, -79.39227523803709, 43.69052069047582, -79.40772476196287));
    }

    updateHeatmap() {
        this._ticketService.getTicketsFromBounds(this._map.getBounds())
            .subscribe(
                data => this._heatmap.setData(data),
                error => console.log(error)
            );
    }

    registerListeners() {
        google.maps.event.addListener(this._map, 'idle', this.updateHeatmap.bind(this));
    }



}
