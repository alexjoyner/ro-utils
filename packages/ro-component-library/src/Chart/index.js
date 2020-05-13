import React from 'react';
import HighCharts from 'highcharts';
import boost from 'highcharts/modules/boost';
import HighchartsReact from 'highcharts-react-official'; // eslint-disable-line import/first
import { THEME as DefaultTheme } from './demoData/theme';
import { config as DefaultConfig } from './demoData/config';

boost(HighCharts);
const Chart = ({ theme, config }) => {
  HighCharts.setOptions(theme);
  return (
    <div>
      <HighchartsReact
        highcharts={HighCharts}
        options={config}
      />
    </div>
  );
};
Chart.defaultProps = {
  theme: DefaultTheme,
  config: DefaultConfig,
};

export { Chart };