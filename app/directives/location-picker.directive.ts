import {Directive, Output, ElementRef, EventEmitter} from 'angular2/core';

@Directive({
    selector: '[location-picker]'
})

export class LocationPicker {

    private _el : ElementRef;

    constructor(el: ElementRef) {
        this._el = el;
    }

    @Output() onPlaceChanged: EventEmitter<any> = new EventEmitter();


    ngAfterViewInit() {
        let input = this._el.nativeElement.querySelector('input', { types: ['geocode']});
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', () => {
            this.onPlaceChanged.emit(autocomplete.getPlace());
        });
    }
}