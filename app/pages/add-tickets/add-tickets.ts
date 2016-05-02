import {Page, NavController, Toast} from 'ionic-angular';
import {LocationPicker} from "../../directives/location-picker.directive";
import {TicketService} from "../../services/ticket.service";
import {Ticket} from "../../ticket";

@Page({
    templateUrl: 'build/pages/add-tickets/add-tickets.html',
    providers: [TicketService],
    directives: [LocationPicker]
})

export class AddTicketsPage {

    private _submitted: boolean;
    public model: Ticket;

    constructor(
        private _ticketService: TicketService,
        private _nav: NavController
    ) {
        this.model = new  Ticket();
        this._submitted = false;
    }

    setLatLng(event){
        let location = event.geometry.location;
        this.model.lat = location.lat();
        this.model.lng = location.lng();
    }

    addTicket() {
        this._ticketService.addTicket(this.model);
        let toast = Toast.create({
            message: 'Ticket Added',
            duration: 2000
        });
        this._nav.present(toast);
        this.model = new Ticket();
    }

}
