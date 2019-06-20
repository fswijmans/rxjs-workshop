import {
    LitElement,
    html,
    css
} from 'lit-element';
import {
    tickedCurrencies$
} from './../rx/my-stream.ts'

class MyCurrencyChart extends LitElement {

    static get properties() {
        return {
            lastEvent: Array,
            data: Array,
            series: Array
        }
    }

    constructor() {
        super();
        this.initProperties();
    }

    pad(d, s = 2, c = '0') {
        return ("" + d).padStart(s, c)
    }

    formatDate(d) {
        let date = new Date(parseInt(d));
        return `${date.getFullYear()}-${this.pad(date.getMonth())}-${this.pad(date.getDay())} ${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}`
    }

    connectedCallback() {
        super.connectedCallback();

        tickedCurrencies$.subscribe((x) => {
            let chart = this.shadowRoot.getElementById('chart');
            let pie = this.shadowRoot.getElementById('pie');


            /**
             * Update the line chart
             */
            x.forEach((it) => {
                let {
                    iso,
                    value,
                    date,
                    name
                } = it;
                let index = this.series.indexOf(iso);

                if (index > -1) {
                    chart.pushData(date, value, index + 1, true, false);
                } else {
                    chart.addSeries(name, [
                        [date, value]
                    ])
                    this.series.push(iso);
                }
            });

            /**
             * Update pie
             */
            pie.data = x.map(p => {
                return {
                    name: p.name,
                    y: p.value
                }
            });


            this.lastEvent = x;
        });
    }

    static get styles() {
        return css `
        :host {
          display: block;
        }
        .half {
            width: 45%;
        }
        .row {
            width: 100%;
            display:flex;
            align-items:center;
        }
        td {
            padding: 4px;
        }
        table tr:nth-child(1) {
            font-weight: bold;
            border-bottom: 2px solid black;
            background-color: #eee
        }
        table tr:nth-child(2n) {
            background-color: #fafafa;
        }
        `;
    }

    render() {
        return html `
          <p>Latest updates of various currencies:</p>
          <highcharts-chart id="chart" title='Currencies' x-zoom x-label="Time" y-label="Price" color=></highcharts-chart>
          <div class="row">
            <highcharts-chart color-by-point type="pie" class="half" id="pie" title='Pie' x-zoom x-label="Currencies" y-label="Price"></highcharts-chart>
            <div class='half'>
                <h2>Current</h2>
                <table>
                    <tr>
                        <td>Iso</td>
                        <td>Value</td>
                        <td>Date</td>
                        <td>Name</td>
                        <td>Continent</td>
                    </tr>
                    ${ this.lastEvent.map((d,i) => { return html `
                        <tr>
                            <td>${d.iso}</td>
                            <td>${d.value}</td>
                            <td>${this.formatDate(d.date)}</td>
                            <td>${d.name}</td>
                            <td>${d.continent}</td>
                        </tr>
                    ` })}
                </table>
            </div>
          </div>
          <p><small>Powered by <a href="https://www.webcomponents.org/element/avdaredevil/highcharts-chart">Highcharts-charts</a></small></p>
          `;
    }

    initProperties() {
        this.lastEvent = [];
        this.series = [];
    }
}

customElements.define('my-currency-chart', MyCurrencyChart)
