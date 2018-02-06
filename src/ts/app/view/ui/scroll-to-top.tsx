import * as React from 'react';

export interface Props {
	currentScroll: number
}

export interface State {
}

export class UIScrollToTop extends React.Component<Props, State> {

	static defaultProps = {};

	state: State = {};

	componentDidMount() {

	}

	private animationIndex;

	private animate = (duration = 500) => {
		let dateStart = performance.now();
		let curScroll = this.props.currentScroll;

		this.animationIndex = setInterval(() => {
			let percent = Math.ceil((performance.now() - dateStart) / (duration / 100));
			percent = percent > 100 ? 100 : percent;
			window.scrollTo(0, curScroll - curScroll * Math.pow((percent / 100), 4));

			if (performance.now() - dateStart >= duration) {
				clearInterval(this.animationIndex);
			}
		});
	};

	render() {
		return (
			<div
				className={"scroll-to-top " + (this.props.currentScroll > 200 && 'active')}
				onClick={() => {
					this.animate(500);
				}}
			>
				<i className="icon-one icon-arrow-up"/>
			</div>
		);
	}
}