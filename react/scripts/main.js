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
        <p>{"Total: $" + cost + (cost != cpp ? ' (per person: $' + cpp + ')' : '')}</p>
      </div>
    );
  }
});

var TipCalculator = React.createClass({
  calculate: function (bill, tax, tip_pct, people) {
    var tip = bill * tip_pct / 100;
    var cost = tip + bill + tax;
    var cost_per_person = cost / people;
    return {
      bill: bill,
      tax: tax,
      tip_pct: tip_pct,
      people: people,
      tip: tip,
      cost: cost,
      cost_per_person: cost_per_person
    }
  },
  getInitialState: function () {
    return this.calculate(42, 0, 15, 1);
  },
  handleChange: function () {
    var bill = parseFloat(this.refs.input.refs.bill.getDOMNode().value);
    var tax = parseFloat(this.refs.input.refs.tax.getDOMNode().value);
    var tip_pct = parseFloat(this.refs.input.refs.tip_pct.getDOMNode().value);
    var people = parseFloat(this.refs.input.refs.people.getDOMNode().value);
    this.setState(this.calculate(bill, tax, tip_pct, people));
  },
  render: function () {
    return (
      <div onChange={this.handleChange}>
        <TipCalculatorInput ref="input" bill={this.state.bill} tax={this.state.tax} tip_pct={this.state.tip_pct} people={this.state.people}/>
        <TipCalculatorOutput tip={this.state.tip} cost={this.state.cost} cost_per_person={this.state.cost_per_person}/>
      </div>
    );
  }
})

React.renderComponent(
  <TipCalculator />,
  document.getElementById('container')
);
