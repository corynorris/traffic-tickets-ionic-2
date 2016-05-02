import {Injectable} from 'angular2/core';
import {Jsonp, URLSearchParams, Response} from 'angular2/http';
import {TICKETS} from "./mock-tickets";
import {HeatmapPoint} from "../heatmap-point";
import {Ticket} from "../ticket";
import LatLngBounds = google.maps.LatLngBounds;
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TicketService {

    private _ticketUrl = 'https://traffic-tickets.herokuapp.com/get-tickets-mobile';

    constructor (
        private jsonp: Jsonp
    ) {}

    getTicketsFromBounds(bounds: LatLngBounds) : Observable<google.maps.LatLng[]> {
        return this.getTicketsInRange(bounds.getSouthWest().lat(), bounds.getSouthWest().lng(), bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
    }

    getTicketsInRange(minLat:number,
                      minLng:number,
                      maxLat:number,
                      maxLng:number) : Observable<google.maps.LatLng[]> {

        let params = new URLSearchParams();
        params.set('callback','JSONP_CALLBACK');
        params.set('minLatitude', minLat.toString());
        params.set('maxLatitude', maxLat.toString());
        params.set('minLongitude', minLng.toString());
        params.set('maxLongitude', maxLng.toString());

        return this.jsonp
            .get(this._ticketUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body.map(function(heatmapPoint: HeatmapPoint) {
            return new google.maps.LatLng(heatmapPoint.latitude, heatmapPoint.longitude);
        })
    }

    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    addTicket(ticket: Ticket) : void {
        console.log("added ticket ", ticket.fee, ticket.date, ticket.lat, ticket.lng);
    }
}