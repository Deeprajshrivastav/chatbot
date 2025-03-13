import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import { candleData } from './chartData'; 

const CandleChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        Highcharts.stockChart(chartRef.current, {
            chart: {
                type: 'candlestick',
                backgroundColor: '#ffffff',  
                style: {
                    fontFamily: 'Arial, sans-serif'
                }
            },
            title: {
                text: "LOGS"  
                 
            },
            rangeSelector: {
                enabled: false  
            },
            navigator: {
                enabled: false 
            },
            scrollbar: {
                enabled: false 
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%H:%M}',  
                    style: {
                        color: '#888888',
                        fontSize: '10px'
                    }
                },
                lineColor: '#f0f0f0',
                tickColor: '#f0f0f0'
            },
            yAxis: {
                title: {
                    text: "No. of Orders"  ,
                    margin: 30 
                },
                labels: {
                    align: 'right',
                    style: {
                        color: '#888888',
                        fontSize: '10px'
                    }
                },
                gridLineColor: '#f0f0f0',
                opposite: true  
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#1e88e5',  
                style: {
                    color: '#ffffff'
                },
                borderWidth: 0,
                borderRadius: 4,
                shadow: false,
                formatter: function() {
                    return `<span style="font-size: 10px">${this.y} • ${this.point.open}</span>`;
                }
            },
            plotOptions: {
                candlestick: {
                    color: '#9D7FFE', 
                    upColor: '#39D3EC',  
                    lineColor: '#9D7FFE', 
                    upLineColor: '#39D3EC',  
                    lineWidth: 1,
                    pointWidth: 6  
                }
            },
            series: [{
                name: 'Price',
                data: candleData,
                tooltip: {
                    valueDecimals: 0
                }
            }],
            time: {
                useUTC: false
            },
            credits: {
                enabled: false  
            }
        });

       
        const timeButtons = document.createElement('div');
        timeButtons.style.cssText = 'position: absolute; top: 10px; left: 10px; display: flex; gap: 10px;';
        timeButtons.innerHTML = `
            <button style="border: none; background: none; color: #888; font-size: 12px;">1 min</button>
            <button style="border: none; background: none; color: #888; font-size: 12px;">5 min</button>
            <button style="border: none; background: none; color: #888; font-size: 12px;">15 min</button>
            <button style="border: none; background: none; color: #0d6efd; font-size: 12px; font-weight: bold; border-bottom: 2px solid #0d6efd;">1 hr</button>
            <button style="border: none; background: none; color: #888; font-size: 12px;">4 hr</button>
            <button style="border: none; background: none; color: #888; font-size: 12px;">1 day</button>
        `;
        chartRef.current.appendChild(timeButtons);

       
         
    }, []);

    return <div ref={chartRef} style={{ height: '600px', position: 'relative' }} />;
};

export default CandleChart;