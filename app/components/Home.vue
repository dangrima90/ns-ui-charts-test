<template>
  <Page>
    <ActionBar>
      <Label text="Home" />
    </ActionBar>

    <StackLayout>
      <LineChart
        height="300"
        ref="chart"
        id="chart"
        width="auto"
        @loaded="onChartLoaded"
      />
    </StackLayout>
  </Page>
</template>

<script>
import { LinearGradient, TileMode } from "@nativescript-community/ui-canvas";

import { LineData } from "@nativescript-community/ui-chart/data/LineData";
import { LineDataSet } from "@nativescript-community/ui-chart/data/LineDataSet";

import { chartData } from "./chart-data";

export default {
  computed: {
    message() {
      return "Blank {N}-Vue app";
    },
  },

  methods: {
    onChartLoaded() {
      const chart = this.$refs.chart.nativeView;

      chart.setTouchEnabled(true);
      chart.setDragEnabled(true);
      chart.setDoubleTapToZoomEnabled(false);
      chart.setDrawGridBackground(false);
      chart.setHighlightPerTapEnabled(true);
      chart.setHighlightPerDragEnabled(true);
      chart.setExtraOffsets(8, 10, 8, 8);

      const axisLeft = chart.getAxisLeft();
      axisLeft.setDrawAxisLine(true);
      axisLeft.setAxisLineColor("gray");
      axisLeft.setAxisLineWidth(0.5);
      axisLeft.setDrawLabels(true);
      axisLeft.setDrawGridLines(false);

      const axisRight = chart.getAxisRight();
      axisRight.setDrawAxisLine(false);
      axisRight.setDrawGridLines(false);
      axisRight.setDrawLabels(false);

      const xAxis = chart.getXAxis();
      xAxis.setDrawAxisLine(true);
      xAxis.setAxisLineColor("gray");
      xAxis.setAxisLineWidth(0.5);
      xAxis.setDrawLabels(true);
      xAxis.setDrawGridLines(false);

      this.setData();
    },

    setData() {
      const chart = this.$refs.chart.nativeView;
      const dataSet = new LineDataSet(
        chartData.map((v, i) => {
          return {
            index: i,
            y: v[1],
          };
        }),
        "Price Data"
      );

      dataSet.setLineWidth(2);
      dataSet.setColor("#E1AFFD");
      dataSet.setDrawValues(false);
      dataSet.enableDashedHighlightLine(10, 5, 0);
      dataSet.setDrawVerticalHighlightIndicator(true);
      dataSet.setDrawHorizontalHighlightIndicator(false);
      dataSet.setHighLightColor("#E1AFFD");

      // set gradient
      setTimeout(() => {
        dataSet.setDrawFilled(true);
        dataSet.setFillShader(
          new LinearGradient(
            0,
            0,
            0,
            chart.mViewPortHandler.getChartHeight() -
              chart.mViewPortHandler.offsetBottom(),
            "#E1AFFD",
            "#FFFFFF00",
            TileMode.CLAMP
          )
        );
        chart.invalidate();
      }, 350);

      const data = new LineData([dataSet]);

      chart.setData(data);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
