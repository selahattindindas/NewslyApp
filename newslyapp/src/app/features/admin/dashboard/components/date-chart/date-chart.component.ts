import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import { isPlatformBrowser } from '@angular/common';
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
@Component({
  selector: 'app-date-chart',
  standalone: true,
  imports: [],
  templateUrl: './date-chart.component.html',
  styleUrl: './date-chart.component.scss'
})
export class DateChartComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.charts();
    }
  }

  charts() {
    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Dark.new(root)
    ]);
    root._logo!.dispose();

    root.dateFormatter.setAll({
      dateFormat: "yyyy",
      dateFields: ["valueX"]
    });

    let data = [
      { "date": "2024-10-05", "value": 79 },
      { "date": "2024-10-06", "value": 56 },
      { "date": "2024-10-07", "value": 62 },
      { "date": "2024-10-08", "value": 78 },
      { "date": "2024-10-09", "value": 60 },
      { "date": "2024-10-10", "value": 54 },
      { "date": "2024-10-11", "value": 45 },
      { "date": "2024-10-12", "value": 49 },
      { "date": "2024-10-13", "value": 70 },
      { "date": "2024-10-14", "value": 55 },
      { "date": "2024-10-15", "value": 71 },
      { "date": "2024-10-16", "value": 73 },
      { "date": "2024-10-17", "value": 79 }
    ];

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      focusable: true,
      panX: false,
      panY: false,
      pinchZoomX: true,
      paddingLeft: 0
    }));

    let easing = am5.ease.linear;

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.1,
      groupData: false,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 70
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.2,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    let series = chart.series.push(am5xy.LineSeries.new(root, {
      minBulletDistance: 10,
      connect: false,
      xAxis: xAxis,
      yAxis: yAxis,
      fill: am5.color(0x8584f6),
      stroke: am5.color(0x8584f6),
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}",
      })
    }));
    
    series.fills.template.setAll({
      fillOpacity: 0.6,
      visible: true
    });

    series.strokes.template.setAll({
      strokeWidth: 3
    });

    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd",
      dateFields: ["date"]
    });

    series.data.setAll(data);

    series.bullets.push(function () {
      let circle = am5.Circle.new(root, {
        radius: 4,
        fill:am5.color(0x8584f6),
        stroke: series.get("fill"),
        strokeWidth: 2
      })

      return am5.Bullet.new(root, {
        sprite: circle
      })
    });

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      xAxis: xAxis,
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    chart.appear(1000, 100);
  }
}