import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('time-event')
export class TimeEvent extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  @property({type: Array})
  data = []

  option: EChartsOption = {};

  @property({type: Array})
  markers = []

  @property({type: Array})
  vert_markers = [];

  updated(){

    var chartDom = this.renderRoot.querySelector("#main");
    const htmlElement = chartDom as HTMLElement;
    var myChart = echarts.init(htmlElement);

    var seriesMap: echarts.SeriesOption[] = this.data.map(arr=>{
      return {
        data: arr,
        type: 'scatter'
      };
    });

    var marklinot = this.markers.map(arr=>{
      return {
        name: arr[0],
        yAxis: arr[1],
        label: {
          formatter: arr[0]
        }
      }

    });

    seriesMap.push({
      type: 'line',
      data:[],
      markLine: {
        data: marklinot,
        silent: true,
      }

    });

    var vert_markerst = this.vert_markers.map(arr=>{
      return {
        name: arr[0],
        xAxis: arr[1],
        label: {
          formatter: arr[0]
        }
      }

    });

    seriesMap.push({
      type: 'line',
      data:[],
      markLine: {
        data: vert_markerst,
        silent: true,
      }
    });

    this.option = {
      tooltip: {
        trigger: 'axis'
      },
      dataZoom: [
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter'
        },
        {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty'
        },
        {
          type: 'inside'
        }
    ],
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value'
      },
      series: seriesMap
    };


    this.option && myChart.setOption(this.option);
  }

  render() {
    return html`
      <div id="main" class="graph"></div>
    `
  }

 
  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      height:400px;
      width: 400px;
    }

    .graph{
      width: 100%;
      height: 100%;
    }

  `
}

declare global {
  interface HTMLElementTagNameMap {
    'time-event': TimeEvent
  }
}
