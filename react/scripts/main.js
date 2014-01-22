/** @jsx React.DOM */

var TipCalculatorInput = React.createClass({
  render: function () {
    return (
      <form>
        <label htmlFor="bill">Bill $</label>
        <input id="bill" ref="bill" type="number" defaultValue={this.props.bill}/>
        <br />
        <label htmlFor="tax">Tax $</label>
        <input id="tax" ref="tax" type="number" defaultValue={this.props.tax}/>
        <br />
        <label htmlFor="tip">Tip %</label>
        <input id="tip" ref="tip_pct" type="number" defaultValue={this.props.tip_pct}/>
        <br />
        <label htmlFor="people">People #</label>
        <input id="people" ref="people" type="number" defaultValue={this.props.people}/>
      </form>
    );
  }
});

var TipCalculatorOutput = React.createClass({
  render: function () {
    var tip = this.props.tip.toFixed(2),
        cost = this.props.cost.toFixed(2),
        cpp = this.props.cost_per_person.toFixed(2);
    return (
      <div>
        <p>Tip: ${tip}</p>
        <p>{"Total: $" + cost + (this.props.people > 1 ? ' (per person: $' + cpp + ')' : '')}</p>
      </div>
    );
  }
});

var TipCalculator = React.createClass({
  getInitialState: function () {
    return {bill: 42,
            tax: 0,
            tip_pct: 15,
            people: 1};
  },
  handleChange: function () {
    this.setState({
      bill: parseFloat(this.refs.input.refs.bill.getDOMNode().value),
      tax: parseFloat(this.refs.input.refs.tax.getDOMNode().value),
      tip_pct: parseFloat(this.refs.input.refs.tip_pct.getDOMNode().value),
      people: parseInt(this.refs.input.refs.people.getDOMNode().value)
    });
  },
  render: function () {
    var tip = this.state.bill * this.state.tip_pct / 100;
    var cost = tip + this.state.bill + this.state.tax;
    var cost_per_person = cost / this.state.people;
    return (
      <div onChange={this.handleChange}>
        <TipCalculatorInput ref="input" bill={this.state.bill} tax={this.state.tax} tip_pct={this.state.tip_pct} people={this.state.people}/>
        <TipCalculatorOutput tip={tip} cost={cost} cost_per_person={cost_per_person} people={this.state.people}/>
      </div>
    );
  }
});

React.renderComponent(
  <TipCalculator />,
  document.getElementById('container')
);
