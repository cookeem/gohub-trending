// 如果使用webpack，必须取消以下注释
import React from 'react';
import ReactDOM from 'react-dom';

// redux simplest demo
import { createStore } from 'redux';

// 引用material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
import {AppBar, Badge, Checkbox, DatePicker, FlatButton, IconButton, RaisedButton, TimePicker} from 'material-ui';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

// 引用react router
import {
	HashRouter as Router,
	Route,
	Link
} from 'react-router-dom';

// 引用外部包，如果以jsx结尾，必须使用文件全名
import {CustomButton, CounterButton} from './external.jsx';

/////////////////////////////////
// redux demo
/////////////////////////////////
//reducer
function counter(state = 0, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}
//store绑定到reducer
const store = createStore(counter);
//订阅store的变更事件
store.subscribe(() =>
	console.log("# store.state: ", store.getState())
);
//向store发送action改变state
const actionInc = { type: 'INCREMENT' };
const actionDec = { type: 'DECREMENT' };
console.log("# store.dispatch(actionInc)");
store.dispatch(actionInc);
console.log("# store.dispatch(actionDec)");
store.dispatch(actionDec);
console.log("# store.dispatch(actionInc)");
store.dispatch(actionInc);

/////////////////////////////////
// Material UI
/////////////////////////////////
injectTapEventPlugin();
const style = {
	margin: 12,
};


const MaterialUIDemo = () => (
	<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
		<div>
			<AppBar
				title="This is nav bar"
				iconClassNameRight="muidocs-icon-navigation-expand-more"
			/>
			<FlatButton label="Default" />
			<FlatButton label="Primary" primary={true} />
			<FlatButton label="Secondary" secondary={true} />
			<FlatButton label="Disabled" disabled={true} />
			<br />
			<br />
			<FlatButton label="Full width" fullWidth={true} />
			<br />
			<RaisedButton label="Default" style={style} />
			<RaisedButton label="Primary" primary={true} style={style} />
			<RaisedButton label="Secondary" secondary={true} style={style} />
			<RaisedButton label="Disabled" disabled={true} style={style} />
			<br />
			<br />
			<RaisedButton label="Full width" fullWidth={true} />
			<br />
			<br />
			<Badge
				badgeContent={4}
				primary={true}
			>
				<NotificationsIcon />
			</Badge>
			<Badge
				badgeContent={10}
				secondary={true}
				badgeStyle={{top: 12, right: 12}}
			>
				<IconButton tooltip="Notifications">
					<NotificationsIcon />
				</IconButton>
			</Badge>
			<br />
			<br />
			<Checkbox
				checkedIcon={<Visibility />}
				uncheckedIcon={<VisibilityOff />}
				label="Custom icon of different shapes"
			/>
			<DatePicker/>
			<TimePicker
				format="24hr"
				hintText="24hr Format"
			/>
		</div>
	</MuiThemeProvider>
);
ReactDOM.render(
	MaterialUIDemo(),
	document.getElementById('material-ui')
);

/////////////////////////////////
// React Router
/////////////////////////////////
const RouterExample = () => (
	<Router basename="/">
		<div>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About</Link></li>
				<li><Link to="/topics">Topics</Link></li>
			</ul>

			<hr/>

			<Route exact path="/" component={Home}/>
			<Route path="/about" component={About}/>
			<Route path="/topics" component={Topics}/>
		</div>
	</Router>
);

const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);

const About = () => (
	<div>
		<h2>About</h2>
	</div>
);

const Topics = ({ match }) => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>
					Rendering with React
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>
					Components
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>
					Props v. State
				</Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Topic}/>
		<Route exact path={match.url} render={() => (
			<h3>Please select a topic.</h3>
		)}/>
	</div>
);

const Topic = ({ match }) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
);

ReactDOM.render(
	RouterExample(),
	document.getElementById('app0')
);

/////////////////////////////////
// JSX 使用数组
/////////////////////////////////
const users = [
    {name:'Cloud', age: 28},
	{name:'Cid', age: 32},
	{name:'Aeris', age: 22},
];
// ReactDOM.render把VirtualDOM应用到DOM
ReactDOM.render(
    <div>
    {
      users.map((user, i) =>
          <div key={i}>{i}: Hello, {user.name} / {user.age} !</div>
      )
    }
    </div>,
    document.getElementById('app1')
);


/////////////////////////////////
// JSX 使用列表
/////////////////////////////////
const arr = [
    <h3 key="1">Hello world!</h3>,
    <h3 key="2">React is awesome</h3>,
];
ReactDOM.render(
    <div>{arr}</div>,
    document.getElementById('app2')
);


/////////////////////////////////
// JSX 使用组件，function Xyz(props)方法就用于生成一个组件类，function必须大写开头
/////////////////////////////////
function Welcome(props) {
	return <h3>Hello, {props.name}</h3>;
}
const elementWelcome = <Welcome name="Sara" />;
ReactDOM.render(
	elementWelcome,
    document.getElementById('app3')
);


/////////////////////////////////
// JSX 组合多个组件
/////////////////////////////////
function App() {
	return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
	);
}

ReactDOM.render(
    <App />,
	document.getElementById('app4')
);

/////////////////////////////////
// JSX 最原始的方式创建element
/////////////////////////////////
const element = React.createElement(
	'h3',
	{className: 'red-color'},
	'Hello, world!'
);

// 等价于以下代码
// const element = (
//     <h1 className="greeting">
//         Hello, world!
//     </h1>
// );

ReactDOM.render(
    <div>{element}</div>,
    document.getElementById('app5')
);


/////////////////////////////////
// JSX 动态变更
/////////////////////////////////
function tick() {
	const element = (
        <div>
            <h3>Hello, world!</h3>
            <h3 className="green-color">It is {new Date().toLocaleTimeString()}</h3>
        </div>
	);
	ReactDOM.render(
		element,
		document.getElementById('app6')
	);
}

tick();
setInterval(tick, 1000);


/////////////////////////////////
// JSX 组件的嵌套
/////////////////////////////////
function formatDate(date) {
	return date.toLocaleDateString();
}

function Avatar(props) {
	return (
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name} />
	);
}

function UserInfo(props) {
	return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
				{props.user.name}
            </div>
        </div>
	);
}

function Comment(props) {
	return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
				{props.text}
            </div>
            <div className="Comment-date">
				{formatDate(props.date)}
            </div>
        </div>
	);
}

const comment = {
	date: new Date(),
	text: 'I hope you enjoy learning React!',
	author: {
		name: 'Hello Kitty',
		avatarUrl: 'http://placekitten.com/g/64/64'
	}
};

ReactDOM.render(
    <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />,
	document.getElementById('app7')
);


/////////////////////////////////
// JSX 状态state, ES6 class方式
/////////////////////////////////
class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
	}
	componentDidMount() {
		this.timerID = setInterval(() => this.tick(),1000);
		console.log(this);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tick() {
		this.setState({
			date: new Date()
		});
	}
	render() {
		return (
			<div>
				<h3>Hello, world!</h3>
				<h3 className="blue-color">It is {this.state.date.toLocaleTimeString()}</h3>
			</div>
		);
	}
}

ReactDOM.render(
	<Clock />,
	document.getElementById('app8')
);


/////////////////////////////////
// JSX 事件处理
/////////////////////////////////
function ActionLink() {
	function handleClick(e) {
		e.preventDefault();
		alert('The link was clicked.');
	}

	return (
		<a href="#" onClick={handleClick}>
			Click me
		</a>
	);
}

ReactDOM.render(
	<ActionLink />,
	document.getElementById('app9')
);


/////////////////////////////////
// JSX 事件处理, ES6 class方式
/////////////////////////////////
class LoggingButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};

		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
	};

	handleClick() {
		this.setState({
			isToggleOn: !this.state.isToggleOn
		});
		alert('isToggleOn:' + this.state.isToggleOn);
	};

	render() {
		return (
			<div>
				<button onClick={(e) => this.handleClick(e)}>
					Click me 1
				</button>
				<button onClick={this.handleClick}>
					Click me 2
				</button>
			</div>
		);
	}
}

ReactDOM.render(
	<LoggingButton/>,
	document.getElementById('app10')
);


/////////////////////////////////
// JSX 有条件的render
/////////////////////////////////
class LoginControl extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {isLoggedIn: false};
	}

	handleLoginClick() {
		this.setState({isLoggedIn: true});
	}

	handleLogoutClick() {
		this.setState({isLoggedIn: false});
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;

		let button = null;
		if (isLoggedIn) {
			button = <LogoutButton onClick={this.handleLogoutClick} />;
		} else {
			button = <LoginButton onClick={this.handleLoginClick} />;
		}

		return (
			<div>
				<Greeting isLoggedIn={isLoggedIn} />
				{button}
			</div>
		);
	}
}

function UserGreeting(props) {
	return <h3 className="blue-color">Welcome back!</h3>;
}

function GuestGreeting(props) {
	return <h3 className="red-color">Please sign up.</h3>;
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />;
	}
	return <GuestGreeting />;
}

function LoginButton(props) {
	return (
		<button onClick={props.onClick}>
			Login
		</button>
	);
}

function LogoutButton(props) {
	return (
		<button onClick={props.onClick}>
			Logout
		</button>
	);
}

ReactDOM.render(
	<LoginControl />,
	document.getElementById('app11')
);


/////////////////////////////////
// JSX 有条件的render，同一行提供判断条件
/////////////////////////////////
function Mailbox(props) {
	const unreadMessages = props.unreadMessages;
	return (
		<div>
			<h3>Hello!</h3>
			{unreadMessages.length > 0 ? (
				<div>
					You have {unreadMessages.length} unread messages.
				</div>
			) : (
				<div>
					You haven't unread messages.
				</div>
			)
			}
			<h3>Hello!</h3>
			{unreadMessages.length > 0 &&
				<div>
					You have {unreadMessages.length} unread messages.
				</div>
			}
		</div>
	);
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
	<Mailbox unreadMessages={messages} />,
	document.getElementById('app12')
);


/////////////////////////////////
// JSX return null隐藏元素
/////////////////////////////////
function WarningBanner(props) {
	if (!props.warn) {
		return null;
	}

	return (
		<div className="warning">
			Warning!
		</div>
	);
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showWarning: true};
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState(prevState => ({
			showWarning: !prevState.showWarning
		}));
	}

	render() {
		return (
			<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning ? 'Hide' : 'Show'}
				</button>
			</div>
		);
	}
}

ReactDOM.render(
	<Page />,
	document.getElementById('app13')
);


/////////////////////////////////
// JSX 列表操作
/////////////////////////////////
function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number, i) =>
		<li key={i}>
			{number}
		</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('app14')
);


/////////////////////////////////
// JSX 表单绑定 受控组件
/////////////////////////////////
class MultiForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valueInput: '',
			valueText: '',
			valueSelect: 'mango',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		this.setState({valueInput: event.target.value.toUpperCase()});
	}

	handleTextChange(event) {
		this.setState({valueText: event.target.value});
	}

	handleSelectChange(event) {
		this.setState({valueSelect: event.target.value});
	}

	handleSubmit(event) {
		alert('valueInput: ' + this.state.valueInput + ', valueText:' + this.state.valueText + ', valueSelect:' + this.state.valueSelect);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					valueInput:
					<input type="text" value={this.state.valueInput} onChange={this.handleInputChange} />
				</label>
				<label>
					valueText:
					<textarea onChange={this.handleTextChange}>
					</textarea>
				</label>
				<label>
					valueSelect:
					<select value={this.state.valueSelect} onChange={this.handleSelectChange}>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
				<div>
					valueInput: {this.state.valueInput}
				</div>
				<div>
					valueText: {this.state.valueText}
				</div>
				<div>
					valueSelect: {this.state.valueSelect}
				</div>
			</form>
		);
	}
}

ReactDOM.render(
	<MultiForm/>,
	document.getElementById('app15')
);


/////////////////////////////////
// JSX 多表单绑定 单个处理函数
/////////////////////////////////
class Reservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2,
			userName: "cookeem",
			fruit: "mango",
			sex: "male",
			car: ["audi", "opel"],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		if (target.tagName === 'SELECT' && target.multiple) {
			let options = target.options;
			let value = [];
			for (let i = 0, l = options.length; i < l; i++) {
				if (options[i].selected) {
					value.push(options[i].value);
				}
			}
			const name = target.name;
			this.setState({
				[name]: value
			});
		} else {
			const value = target.type === 'checkbox' ? target.checked : target.value;
			const name = target.name;
			this.setState({
				[name]: value
			});
		}
	}

	render() {
		return (
			<form>
				<label>
					Is going:
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					Number of guests:
					<input
						name="numberOfGuests"
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					User name:
					<input
						name="userName"
						type="text"
						value={this.state.userName}
						onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					fruit:
					<select name="fruit" value={this.state.fruit} onChange={this.handleInputChange}>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<br />
				<label>
					sex:
					<input type="radio" name="sex" value="male" checked={this.state.sex === "male"} onChange={this.handleInputChange}/>Male
					<input type="radio" name="sex" value="female" checked={this.state.sex === "female"} onChange={this.handleInputChange}/>Female
				</label>
				<br />
				<label>
					car:
					<select name="car" multiple="multiple" size="3" value={this.state.car} onChange={this.handleInputChange}>
						<option value ="volvo" checked={this.state.car.indexOf("volvo") > -1}>Volvo</option>
						<option value ="saab" checked={this.state.car.indexOf("saab") > -1}>Saab</option>
						<option value="opel" checked={this.state.car.indexOf("opel") > -1}>Opel</option>
						<option value="audi" checked={this.state.car.indexOf("audi") > -1}>Audi</option>
					</select>
				</label>
				<div>
					isGoing: {this.state.isGoing.toString()}
				</div>
				<div>
					numberOfGuests: {this.state.numberOfGuests}
				</div>
				<div>
					userName: {this.state.userName}
				</div>
				<div>
					fruit: {this.state.fruit}
				</div>
				<div>
					sex: {this.state.sex}
				</div>
				<div>
					car: {this.state.car.toString()}
				</div>
			</form>
		);
	}
}

ReactDOM.render(
	<Reservation />,
	document.getElementById('app16')
);

/////////////////////////////////
// JSX 表单绑定 非受控组件 不推荐
/////////////////////////////////
class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.input.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input type="text" ref={(input) => this.input = input} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
ReactDOM.render(
	<NameForm/>,
	document.getElementById('app17')
);


/////////////////////////////////
// JSX state提升，父对象获取子对象state
/////////////////////////////////
const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		//当TemperatureInput中的数值改变的时候，将会调用Calculator的handleXXXChange方法
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		console.log("this.props.test:", this.props.test);
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature}
				       onChange={this.handleChange} />
			</fieldset>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = {temperature: '', scale: 'c', test: 'this is test message'};
	}

	handleCelsiusChange(temperature) {
		this.setState({scale: 'c', temperature});
	}

	handleFahrenheitChange(temperature) {
		this.setState({scale: 'f', temperature});
	}

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<div>
				<TemperatureInput
					scale="c"
					temperature={celsius}
					test="test1"
					onTemperatureChange={this.handleCelsiusChange} />
				<TemperatureInput
					scale="f"
					temperature={fahrenheit}
					test="test2"
					onTemperatureChange={this.handleFahrenheitChange} />
				<BoilingVerdict
					celsius={parseFloat(celsius)} />
			</div>
		);
	}
}

ReactDOM.render(
	<Calculator />,
	document.getElementById('app18')
);



/////////////////////////////////
// JSX 继承，组合
/////////////////////////////////
function Contacts() {
	return <div>Contacts</div>;
}

function Chat() {
	return <div>Chat</div>;
}

function SplitPane(props) {
	let leftStyle = {
		float: "left",
		width: "30%",
		backgroundColor: "#FF0000",
	};
	let rightStyle = {
		float: "right",
		width: "70%",
		backgroundColor: "#00FF00",
	};
	return (
		<div>
			<div style={leftStyle}>
				{props.left}
			</div>
			<div style={rightStyle}>
				{props.right}
			</div>
		</div>
	);
}

function MixApp() {
	return (
		<SplitPane
			left={
				<Contacts />
			}
			right={
				<Chat />
			} />
	);
}

ReactDOM.render(
	<MixApp />,
	document.getElementById('app19')
);


/////////////////////////////////
// JSX 继承，组合 children
/////////////////////////////////
function FancyBorder(props) {
	return (
		<div className={'FancyBorder FancyBorder-' + props.color}>
			{props.children}
		</div>
	);
}

function Dialog(props) {
	return (
		<FancyBorder color="blue">
			<FancyBorder color="red">
				<h1 className="Dialog-title">
					{props.title}
				</h1>
				<p className="Dialog-message">
					{props.message}
				</p>
				<div>
					<CustomButton text="这个是在button.jsx中定义的按钮"/>
				</div>
				<div>
					<CounterButton/>
				</div>
			</FancyBorder>
		</FancyBorder>
	);
}

function WelcomeDialog() {
	return (
		<Dialog
			title="Welcome"
			message="Thank you for visiting our spacecraft!" />
	);
}

ReactDOM.render(
	<WelcomeDialog />,
	document.getElementById('app20')
);
