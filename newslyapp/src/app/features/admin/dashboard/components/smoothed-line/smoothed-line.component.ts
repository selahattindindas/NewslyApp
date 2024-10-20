import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import { isPlatformBrowser } from '@angular/common';
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";

@Component({
  selector: 'app-smoothed-line',
  standalone: true,
  imports: [],
  templateUrl: './smoothed-line.component.html',
  styleUrl: './smoothed-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmoothedLineComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.charts();
    }
  }

  charts() {
    let root = am5.Root.new("linechart");

    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Dark.new(root)
    ]);
    root._logo!.dispose();

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      pinchZoomX: false,
      paddingLeft: 0
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    let today = new Date();
    let oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    let values = [15, 20, 17, 22, 19, 21, 18];

    function generateFixedData() {
      let data = [];
      let currentDate = new Date(oneWeekAgo);

      for (let i = 0; i < values.length; i++) {
        data.push({
          date: currentDate.getTime(),
          value: values[i]
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return data;
    }

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.5,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 100,
        minorGridEnabled: true,
        minorLabelsEnabled: true,
        
      }),
      startLocation: 1,
      endLocation: 0.1,
      tooltip: am5.Tooltip.new(root, {}),
      
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 1,
      renderer: am5xy.AxisRendererY.new(root, {
      })
    }));

    let series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      stroke: am5.color(0x8584f6),
      fill: am5.color(0x8584f6),
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Circle.new(root, {
          radius: 4,
          stroke: am5.color(0x8584f6),
          strokeWidth: 2,
          fill: am5.color(0x8584f6)
        })
      });
    });

    let data = generateFixedData();
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);
  }
}
