import * as React from 'react';
import {Link} from "react-router";

export interface Props {
	active: boolean,
	coords?: string,
	header?: string,
	close: () => void,
}

export interface State {

}

export class SideMapComponent extends React.Component<Props, State> {
	private map;

	private getMap() {
		let ymaps = window['ymaps'];

		ymaps.ready(() => {
			this.map = new ymaps.Map('map', {
				center: [55.76, 37.64],
				zoom: 12,
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
		});
	}

	componentDidMount() {
		this.getMap();
	}

	private setYourLocation() {
		let ymaps = window['ymaps'];

		navigator.geolocation.getCurrentPosition((position) => {
			alert(position.coords.latitude);

			let geocode = ymaps.geocode([position.coords.latitude, position.coords.longitude]);

			if (geocode) {
				geocode.then((res) => {

					let position = res.geoObjects.get(0).geometry.getCoordinates();

					let placemark = new ymaps.Placemark(position, {
						iconCaption: "Возможно вы здесь"
					}, {
						preset: 'islands#greenDotIconWithCaption'
					});

					this.map.geoObjects.add(placemark);
				});
			}
		});
	}

	private mapUpdate(coords: string) {
		let ymaps = window['ymaps'];
		let zoom = 10;
		let geocode;

		if (coords) {
			geocode = ymaps.geocode(coords.split(','));
		}

		if (geocode && coords) {
			geocode.then((res) => {
					let position = res.geoObjects.get(0).geometry.getCoordinates();
					let placemark = new ymaps.Placemark(position, {
						iconCaption: this.props.header
					}, {
						preset: 'islands#blueDotIconWithCaption'
					});

					this.map.geoObjects.add(placemark);
					this.map.setCenter(position, zoom);
				}
			);
		}
	}

	private clearAllObject(): void {
		if (this.map) {
			this.map.geoObjects.each((geoObject) => {
				this.map.geoObjects.remove(geoObject);
			});
		}
	}

	componentWillReceiveProps(props) {
		if (props.active) {
			if (this.map) {
				setTimeout(() => {
					this.map.container.fitToViewport();
				}, 800);
			}

			if (props.coords && this.map) {
				this.clearAllObject();
				this.mapUpdate(props.coords);
				this.setYourLocation();
			}
		} else {
			this.clearAllObject();
		}
	}

	render() {
		return (
			<div className={this.props.active ? "sidemap active" : "sidemap"}>
				<a href="javascript:void(0)" onClick={this.props.close} className="closebtn">&times;</a>
				<h2>{this.props.header}</h2>
				<div id="map" className="map"></div>
			</div>
		);
	}
}