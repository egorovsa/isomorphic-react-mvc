import * as React from 'react';
import {Link, browserHistory} from "react-router";

export interface Props {
	prices: any[]
}

export interface State {
	page: number,
}

export class PricesSliderComponent extends React.Component<Props, State> {

	state: State = {
		page: 0,
	};

	private getToday(): JSX.Element {
		let date = new Date();
		let day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
		let month = date.getMonth() > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);

		return (
			<span>{day}.{month}.{date.getFullYear()}</span>
		);
	}

	private getPrices() {
		let prices = [];

		for (let i = this.state.page * 4; i < (this.state.page * 4 + 4); i++) {
			if (this.props.prices[i]) {
				prices.push(
					<div className="block-container" key={i} onClick={() => {
						browserHistory.push('/pages/price');
					}}>
						<div className="block active">
							<div className="name">{this.props.prices[i].Price.name}</div>
							<div className="price">
								{this.props.prices[i].Price.price_opt}
								<span className="cur"> {this.props.prices[i].Unit.name}</span>
							</div>
						</div>
					</div>
				);
			}
		}

		return prices;
	}

	private getLeftButton() {
		if (this.state.page > 0) {
			return (<div className="left slide-button" onClick={this.leftHandler}>&nbsp;</div>);
		}
	}

	private getRightButton() {
		let maxPages = this.props.prices.length / 4 - 1;

		if (this.state.page < maxPages) {
			return (<div className="right slide-button" onClick={this.rightHandler}>&nbsp;</div>);
		}
	}

	private leftHandler = (e) => {
		e.preventDefault();

		this.setState({
			page: this.state.page - 1 < 0 ? 0 : this.state.page - 1
		} as State);
	};

	private rightHandler = (e) => {
		e.preventDefault();

		let maxPages = this.props.prices.length / 4 - 1;

		this.setState({
			page: this.state.page + 1 > maxPages ? maxPages : this.state.page + 1
		} as State);
	};

	public render() {
		return (
			<div className="main-price">
				<div className="price-header">
					{this.getLeftButton()}
					{this.getRightButton()}

					<div className="heading">
						Актуальные цены на лом металлов
						{this.getToday()}
					</div>
				</div>

				<div className="prices">
					{this.getPrices()}
				</div>
			</div>
		);
	}
}