import React, {FC, useRef, useState, useEffect, useContext} from 'react';
import {inject, observer} from 'mobx-react';
import IntentStore from '../../Store/IntentStore';
import {style} from 'typestyle';
import {DataContext} from '../../App';
import {Plot} from '../../Store/IntentState';
import {scaleLinear} from 'd3';
import translate from '../../Utils/Translate';
import RawPlot from './RawPlot';

export interface Props {
  store?: IntentStore;
  height: number;
  width: number;
  plot: Plot;
}

const Scatterplot: FC<Props> = ({width, height, plot, store}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const data = useContext(DataContext);

  const [dim, setDim] = useState({height: 0, width: 0});

  useEffect(() => {
    const {height, width} = dim;
    const {current} = svgRef;
    if (current && height === 0 && width === 0) {
      const size = current.getBoundingClientRect();
      setDim({height: size.height, width: size.width});
    }
  }, [dim]);

  const adjustedWidth = dim.width * 0.9;
  const adjustedHeight = dim.height * 0.9;
  const xPadding = (dim.width - adjustedWidth) / 2;
  const yPadding = (dim.height - adjustedHeight) / 2;

  const {x, y} = plot;

  const xyData = data.values.map(d => ({x: d[x], y: d[y]}));

  const [xMin, xMax] = [
    Math.min(...xyData.map(d => d.x)),
    Math.max(...xyData.map(d => d.x)),
  ];

  const [yMin, yMax] = [
    Math.min(...xyData.map(d => d.y)),
    Math.max(...xyData.map(d => d.y)),
  ];

  const xScale = scaleLinear()
    .domain([xMin, xMax])
    .range([0, adjustedWidth])
    .nice();
  const yScale = scaleLinear()
    .domain([yMax, yMin])
    .range([0, adjustedHeight])
    .nice();

  return (
    <div className={surroundDiv} style={{height, width}}>
      <svg className={svgStyle} ref={svgRef}>
        <rect height={dim.height} width={dim.width} fill="#ccc" opacity="0.1" />
        <RawPlot
          plot={plot}
          height={adjustedHeight}
          width={adjustedWidth}
          data={xyData}
          transform={translate(xPadding, yPadding)}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
    </div>
  );
};

(Scatterplot as any).whyDidYouRender = true;
export default inject('store')(observer(Scatterplot));

const surroundDiv = style({
  padding: '1em',
});

const svgStyle = style({
  height: '100%',
  width: '100%',
});
