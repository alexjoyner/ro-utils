import React from 'react';
import styled, {injectGlobal} from 'styled-components';

export const Gauge = (props) => {
    const opts = {
        height: props.height || 'auto',
        width: props.width || '100%',
        radius: 120.5,
        center: {
            x: 125,
            y: 150
        },
        value: props.value || 0,
        units: props.units || '',
        max: props.max || 100,
        min: props.min || 0,
        ranges: props.ranges || [{
            lowerValue: 0,
            upperValue: 20,
            color: "#95a5a6"
        },{
            lowerValue: 20,
            upperValue: 30,
            color: "#9b59b6"
        },{
            lowerValue: 30,
            upperValue: 50,
            color: "#f1c40f"
        },{
            lowerValue: 50,
            upperValue: 80,
            color: "#2ecc71"
        },{
            lowerValue: 80,
            upperValue: 100,
            color: "#e74c3c"
        }]
    };
    return (
        <svg height={opts.height} width={opts.width} viewBox="0 0 250 180">
        <GaugeStatus cx="125" cy="150" r="108.5" fill="none" color={calcColor(opts.value, opts.ranges)}/>
        {opts.ranges.map((range, i) => getRange(opts, range, i))}
        <GaugeOutlines /> 
        <Needle points="125,150 115,148 1,150 115,152" transform={`rotate(${gaugeValueToAngle(opts, props.value)}, 125, 150)`}/>
        <Value x="125" y="165">{opts.value}{opts.units}</Value>
        <BasicLine x1="1" y1="150" x2="30" y2="150" />
        <BasicLine x1="250" y1="150" x2="220" y2="150" />
        <CenterPoint cx="125" cy="150" r="2" fill="white"/>
        </svg>
    )
}
const calcColor = (value, ranges) => {
    let result = null;
    ranges.map((range) => {
        if(value > range.lowerValue && value <= range.upperValue)
            result = range.color;
    })
    return result;
}
const GaugeStatus = styled.circle`
  stroke: ${(props) => props.color};
  stroke-width: 17;
  stroke-dasharray: 340.865;
  stroke-dashoffset: 340.865;
`
const getRange = (opts, range, index) => {
    const lowerBoundAngle = gaugeValueToAngle(opts, range.lowerValue);
    const lowerBoundPoint = polarToCartesian(opts.center.x, opts.center.y, opts.radius, lowerBoundAngle);
    const upperBoundAngle = gaugeValueToAngle(opts, range.upperValue);
    const upperBoundPoint = polarToCartesian(opts.center.x, opts.center.y, opts.radius, upperBoundAngle);
    const M = `M ${lowerBoundPoint.x} ${lowerBoundPoint.y} `;
    const A = `A ${opts.radius} ${opts.radius} 0 0 1 ${upperBoundPoint.x} ${upperBoundPoint.y}`
    const labelOffsetX = (upperBoundPoint.x - 15) + (30 * getPercentage(range.upperValue, opts.max, opts.min));
    return (
        <g key={index}>
        <Range
            stroke={range.color}
            d={`${M} ${A}`}
            fill="none" />
        <Tick angle={upperBoundAngle}/>
        <Label x={labelOffsetX} y={upperBoundPoint.y - 10}>{range.upperValue}</ Label>
        </g>
    )
}
const gaugeValueToAngle = (opts, value) => {
    return (180 * getPercentage(value, opts.max, opts.min));
}
const getPercentage = (value, max, min) => {
    return value / (max - min)
}
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};
const GaugeOuterCircle = styled.circle`
  stroke: #34495e;
  stroke-width: 1;
  stroke-dasharray: 389.557;
  stroke-dashoffset: 389.557;
`
const GaugeRangeBoundary = styled.circle`
  stroke: #34495e;
  stroke-width: 1;
  stroke-dasharray: 367.557;
  stroke-dashoffset: 367.557;
`
const GaugeInnerCircle = styled.circle`
  stroke: #34495e;
  stroke-width: 1;
  stroke-dasharray: 314.160;
  stroke-dashoffset: 314.160;
`
const CenterPoint = styled.circle`
  stroke: #34495e;
`
const Range = styled.path`
  stroke-width: 7;
  fill: none;
`

const Needle = styled.polygon`
    stroke: #34495e;
    stroke-width: 0.3;
    fill: #2980b9;
    transform: rotate(60, 125, 150);
`
const Value = styled.text`
    stroke: #34495e;
    stroke-width: .1;
    text-anchor: middle;
    dominant-baseline: central;
`
const Label = styled.text`
    font-size: .6rem;
    fill: #5b6268;
    text-anchor: middle;
    dominant-baseline: central;
`
const BasicLine = styled.line`
  stroke: #34495e;
`
const Tick = (props) => {
    return (
        <line 
            x1="1" 
            y1="150" 
            x2="15" 
            y2="150" 
            stroke="#34495e"
            strokeLinecap="round" 
            transform={`rotate(${props.angle} 125 150)`}></line>
    )
}
const GaugeOutlines = () => {
    return (
        <g>
        <GaugeOuterCircle cx="125" cy="150" r="124" fill="none"/>
        <GaugeRangeBoundary id="gauge-range-boundary-circle" cx="125" cy="150" r="117" fill="none"/>
        <GaugeInnerCircle id="gauge-inner-circle" cx="125" cy="150" r="100" fill="none"/>
        </g>
    )
}