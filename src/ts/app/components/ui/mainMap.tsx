import * as React from 'react';
import {Link} from "react-router";

export interface Props {
	addresses?: any[],
}

export interface State {

}

export class MainMapComponent extends React.Component<Props, State> {
	private map;

	private getMap() {
		let ymaps = window['ymaps'];

		ymaps.ready(() => {
			this.map = new ymaps.Map('mainMap', {
				center: [55.76, 37.64],
				zoom: 8,
				controls: []
			}, {
				searchControlProvider: 'yandex#search'
			});

			this.map.controls.add('zoomControl', {
				position: {
					right: 10,
					top: 10
				}
			});

			if (this.props.addresses.length > 0 && this.map) {
				this.mapUpdate();
			}
		});
	}

	componentDidMount() {
		this.getMap();
	}

	private mapUpdate() {
		let ymaps = window['ymaps'];

		this.props.addresses.map((address) => {
			this.map.geoObjects.add(new ymaps.Placemark(address.Addresses.gps.split(','), {
				balloonContent: `Адрес:<br/> <b>${address.Addresses.address}</b> <br/><br/> Примечание:<br/> ${address.Addresses.description}`,
			}, {
				preset: 'islands#buildingsIconWithCaption'
			}));
		});
	}

	private clearAllObject(): void {
		if (this.map) {
			this.map.geoObjects.each((geoObject) => {
				this.map.geoObjects.remove(geoObject);
			});
		}
	}

	componentWillReceiveProps(props) {
		if (this.map) {
			this.clearAllObject();
		}

		if (props.addresses.length > 0 && this.map) {
			this.mapUpdate();
		}

	}

	render() {
		return (
			<div className="map" id="mainMap"/>
		);
	}
}