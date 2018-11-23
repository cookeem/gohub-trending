// 如果使用webpack，必须取消以下注释
import React from 'react';

export function CustomButton(props) {
	return (
		<button>
			{props.text}
		</button>
	);
}

export class CounterButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
		};
		this.addOne = this.addOne.bind(this);
	}

	addOne() {
		this.setState({
			counter: this.state.counter + 1
		});
	}

	render() {
		return (
			<div>
				<button
					onClick={ this.addOne }>
					Increment
				</button>
				{ this.state.counter }
			</div>
		)
	}
}
