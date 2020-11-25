import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Point as PointDto, Route } from '@/dto/Route';
import Map from 'ol/Map';
import { Fill, Stroke, Style } from 'ol/style';
import Point from 'ol/geom/Point';
import CircleStyle from 'ol/style/Circle';
import Text from 'ol/style/Text';
import LineString from 'ol/geom/LineString';
import View from 'ol/View';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import { Color } from '@/models/Color';
import Attribution from 'ol/control/Attribution';
import { Icon } from '@/models/Icon';
import 'ol/ol.css';

@Component
export default class RouteMap extends Vue {

    @Prop()
    lock: boolean;

    @Prop()
    route: Route;

    private routeSource: VectorSource = new VectorSource({});
    private map: Map;

    private readonly padding = 40;
    private readonly lineWidth = 3;
    private readonly outlineWidth = 1;

    @Watch('route', {immediate: true})
    onRouteChanged(): void {
        this.routeSource.clear();

        if (this.route) {
            this.recreateMap();
            this.setPoints(this.route.points);
        }
    }

    mounted(): void {
        this.recreateMap();
    }

    private recreateMap(): void {
        if (this.map) {
            this.map.setTarget(null);
        }

        this.map = new Map({
            target: this.route.uuid,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        attributions: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        url: 'https://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
                    }),
                }),
                new VectorLayer({
                    source: this.routeSource,
                    style: [
                        new Style({
                            stroke: new Stroke({
                                color: '#fff',
                                width: this.lineWidth + this.outlineWidth,
                            }),
                        }),
                        new Style({
                            stroke: new Stroke({
                                color: Color.Primary,
                                width: this.lineWidth,
                            }),
                        }),
                    ],
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 0,
                maxZoom: 18,
            }),
            controls: [
                new Attribution(),
            ],
            interactions: this.lock ? [] : undefined,
        });

        this.fitMapToRoute();
    }

    private setPoints(points: PointDto[]): void {
        const coords = points.map(
            point => [point.position.longitude, point.position.latitude],
        );

        const feature = new Feature({
            geometry: new LineString(coords).transform('EPSG:4326', 'EPSG:3857'),
        });
        this.routeSource.addFeature(feature);

        const startFeature = new Feature({
            geometry: new Point(coords[0]).transform('EPSG:4326', 'EPSG:3857'),
        });
        startFeature.setStyle(this.pointStyle(Icon.MapMarker));
        this.routeSource.addFeature(startFeature);

        const endFeature = new Feature({
            geometry: new Point(coords[coords.length - 1]).transform('EPSG:4326', 'EPSG:3857'),
        });
        endFeature.setStyle(this.pointStyle(Icon.CheckeredFlag));
        this.routeSource.addFeature(endFeature);

        this.fitMapToRoute();
    }

    private fitMapToRoute(): void {
        const features = this.routeSource.getFeatures();

        if (this.map && features && features.length > 0) {
            this.map.getView().fit(features[0].getGeometry(), {
                padding: [
                    this.padding,
                    this.padding,
                    this.padding,
                    this.padding,
                ],
            });
        }
    }

    private pointStyle(icon: string): Style[] {
        return [
            new Style({
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({color: '#fff'}),
                    stroke: new Stroke({color: '#ff0000', width: 1}),
                }),
                text: new Text({
                    text: icon,
                    font: '900 15px "Font Awesome 5 Free"',
                    fill: new Fill({
                        color: Color.Secondary,
                    }),
                    stroke: new Stroke({color: '#fff', width: 1}),
                    textAlign: 'center',
                    textBaseline: 'bottom',
                    offsetY: 10,
                }),
            }),
        ];
    }

}
