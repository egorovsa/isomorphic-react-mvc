import * as React from 'react';
import {CommonStore} from "../../stores/common";

export interface Props {
	addresses: any[],
	metros: any[]
}

export interface State {
	availableMetros: any[],
	selectedMetro: number,
	define: boolean

}

export class AddressesBlockComponent extends React.Component<Props, State> {
	state: State = {
		availableMetros: [],
		selectedMetro: null,
		define: false
	};

	private findGeo() {
		navigator.geolocation.getCurrentPosition((position) => {

			let ymaps = window['ymaps'];

			ymaps.ready(() => {
				ymaps.geocode([position.coords.latitude, position.coords.longitude], {kind: 'metro'}).then(function (res) {
					let metros = [];
					let findedId: number = null;

					for (let i = 0; i < 5; i++) {
						if (res.geoObjects.get(i)) {
							let nearest = res.geoObjects.get(i);
							metros.push(nearest.properties.getAll());
						}
					}

					this.state.availableMetros.map((metroItem) => {
						metros.map((findedMetro) => {
							if (findedMetro.name.indexOf(metroItem.Metro.name) >= 0 && !findedId) {
								findedId = metroItem.Metro.id;
							}
						});
					});

					this.setState({
						selectedMetro: findedId
					} as State);

				});
			});
		});
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.metros.length > 0 && nextProps.addresses.length > 0 && !this.state.define) {
			let availableMetros = nextProps.metros.filter((metro) => {
				for (let item in nextProps.addresses) {
					if (nextProps.addresses[item].Addresses.metro_id === metro.Metro.id) {
						return metro;
					}
				}
			});

			this.setState({
				availableMetros: availableMetros,
				selectedMetro: availableMetros[0].Metro.id,
				define: true
			}  as State, () => {
				this.findGeo();
			});
		}
	}

	private changeMetrosHandler = (e) => {
		this.setState({
			selectedMetro: e.target.value
		}  as State);
	};

	private getAddresses() {
		return this.props.addresses.map((address, i) => {
			if (address.Addresses.metro_id === this.state.selectedMetro) {
				return (
					<div key={i}>
						<div className="address">
							<div className="item" onClick={() => {
								CommonStore.store.setState({
									sideMap: true,
									mapCords: address.Addresses.gps,
									mapHeader: address.Addresses.address
								} as CommonStore.State);
							}}>{address.Addresses.address}</div>
						</div>
						{/*<div className="phones">*/}
						{/*<div className="item">8 (903) 514 30 42</div>*/}
						{/*</div>*/}
					</div>
				)
			}
		});
	}

	render() {
		let defValue: string = this.state.selectedMetro ? this.state.selectedMetro.toString() : '';

		return (
			<div className="addresses">
				<span className="title">Мы верно определили Вашу станцию?</span>

				<div className="metro-selector">
					<select
						onChange={this.changeMetrosHandler}
						value={defValue}
					>
						{this.state.availableMetros.map((metro, i) => {
							return (
								<option
									value={metro.Metro.id}
									key={i}>
									{metro.Metro.name}
								</option>
							)
						})}
					</select>
				</div>

				<div className="addresses-phones">
					{this.getAddresses()}
				</div>
			</div>
		);
	}
}