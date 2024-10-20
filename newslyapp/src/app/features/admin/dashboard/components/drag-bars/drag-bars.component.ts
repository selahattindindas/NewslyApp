import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from "@amcharts/amcharts5/xy";
import { isPlatformBrowser } from '@angular/common';
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";

@Component({
  selector: 'app-drag-bars',
  standalone: true,
  imports: [],
  templateUrl: './drag-bars.component.html',
  styleUrl: './drag-bars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragBarsComponent implements AfterViewInit {  
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.categoryCharts();
    }
  }

  categoryCharts() {
    const root = am5.Root.new("categoryCharts");
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Dark.new(root)
    ]);
    root._logo!.dispose();

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      paddingLeft: 0,
      layout: root.verticalLayout
    }));
    
    let data = [{
      "month": "Mayıs",
      "year2023": 3.5,
      "year2024": 4.2
    }, {
      "month": "Haziran",
      "year2023": 1.7,
      "year2024": 3.1
    }, {
      "month": "Temmuz",
      "year2023": 2.8,
      "year2024": 2.9
    }, {
      "month": "Ağustos",
      "year2023": 2.6,
      "year2024": 2.3
    }, {
      "month": "Eylül",
      "year2023": 1.4,
      "year2024": 2.1
    }, {
      "month": "Ekim",
      "year2023": 2.6,
      "year2024": 4.9
    }];
    

    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 70,
      minorGridEnabled: true
    });
    
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "month",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {
        themeTags: ["axis"],
        animationDuration: 200
      })
    }));
    
    xRenderer.grid.template.setAll({
      location: 1
    })
    
    xAxis.data.setAll(data);
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      renderer: am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
      })
    }));
        
    let series0 = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Income",
      xAxis: xAxis,
      yAxis: yAxis,
      fill: am5.color(0x8584f6),
      stroke: am5.color(0x8584f6),
      valueYField: "year2023",
      categoryXField: "month",
      clustered: false,
      tooltip: am5.Tooltip.new(root, {
        labelText: "2023: {valueY}"
      })
    }));
    
    series0.columns.template.setAll({
      fillOpacity: 0.3,
      width: am5.percent(80),
      tooltipY: 0,
      strokeOpacity: 0
    });
    
    
    series0.data.setAll(data);
    
    
    let series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Income",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "year2024",
      categoryXField: "month",
      fill: am5.color(0x8584f6),
      stroke: am5.color(0x8584f6),
      clustered: false,
      tooltip: am5.Tooltip.new(root, {
        labelText: "2024: {valueY}"
      })
    }));
    
    series1.columns.template.setAll({
      width: am5.percent(50),
      fillOpacity: 0.6,
      tooltipY: 0,
      strokeOpacity: 0
    });
    
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    series1.data.setAll(data);

    chart.appear(1000, 100);
    series0.appear();
    series1.appear();
  }  
}
