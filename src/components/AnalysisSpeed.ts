import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Activity as ActivityDto } from '@/dto/Activity';
import { ChartColors } from '@/chart/ChartColors';

import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Tooltip,

  ChartEvent,
  ActiveElement,
  ChartDataset,
} from 'chart.js';

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Tooltip
);

import 'chartjs-adapter-luxon';

@Component({
    components: {
    },
})
export default class AnalysisSpeed extends Vue {

    @Prop()
    activity: ActivityDto;

    @Prop()
    highlightIndex: number;

    private chart: Chart;

    @Watch('activity')
    onActivityChanged(): void {
        this.redraw();
    }

    @Watch('highlightIndex')
    onHighlightIndexChanged(): void {
        if (this.highlightIndex === null) {
            // eslint-disable-next-line
            (this.chart as any).tooltip.setActiveElements([]);
            this.chart.setActiveElements([]);
        } else {
            const elements = [
                {
                    datasetIndex: 0,
                    index: this.highlightIndex,
                },
            ];
            // eslint-disable-next-line
            (this.chart as any).tooltip.setActiveElements(elements);
            this.chart.setActiveElements(elements);
        }
        this.chart.update();
    }

    mounted(): void {
        this.redraw();
    }

    private redraw(): void {
        if (!this.activity) {
            return;
        }

        this.drawChart(this.activity);
    }

    private drawChart(activity: ActivityDto): void {
        if (!this.chart) {
            this.chart = this.createChart();
        }

        // labels
        this.chart.data.labels.length = activity.route.points.length;
        activity.route.points.forEach((point, index) => {
            this.chart.data.labels[index] = point.time;
        })

        // speed
        this.chart.data.datasets[0].data.length = activity.route.points.length;
        activity.route.points.forEach((point, index) => {
            this.chart.data.datasets[0].data[index] = this.metersPerSecondToKilometersPerHour(point.speed);
        });

        this.chart.update();
    }

    private createChart(): Chart {
        return new Chart(
            'chart-speed',
            {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        this.createDataset('Speed', ChartColors.Secondary),
                    ],
                },
                options: {
                    animation: false,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            ticks: {
                                minRotation: 0,
                                maxRotation: 0,
                                autoSkipPadding: 50,
                            },
                            grid: {
                                display: false,
                            },
                            time: {
                                tooltipFormat: 'yyyy-LL-dd HH:mm:ss ZZZZ',
                                displayFormats: {
                                    minute: 'HH:mm',
                                },
                            },
                        },
                        y: {
                            ticks: {
                                mirror: true,
                                z: 1,
                                callback: (value: string | number): string => {
                                    return `${value} km/h`;
                                },
                            },
                            grid: {
                                borderDash: [5],
                            },
                        },
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    layout: {
                        padding: {
                            left: 10,
                            right: 30,
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (item): string => {
                                    const value = Math.round(item.raw as number);
                                    return `${value} km/h`;
                                },
                            },
                        },
                    },
                    onHover: (_: ChartEvent, elements: ActiveElement[]): void => {
                        if (elements.length > 0) {
                            this.emitIndex(elements[0].index);
                        }
                    },
                },
                plugins: [
                    {
                        id: 'myEventCatcher',
                        beforeEvent: (_: Chart, args: { event: ChartEvent }): void => {
                            if (args.event.type === 'mouseout') {
                                this.emitIndex(null);
                            }
                        }
                    },
                ],
            },
        );
    }

    private emitIndex(index: number): void {
        this.$emit('index', index);
    }

    private createDataset(label: string, color: string): ChartDataset {
        return {
            label: label,
            data: [],
            backgroundColor: color,
            borderColor: color,
            pointRadius: 0,
            fill: true,
            showLine: false, 
        };
    }

    private metersPerSecondToKilometersPerHour(n: number): number {
        return n / 1000 * 3600;
    }
}
