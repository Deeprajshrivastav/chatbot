import React from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import "./CSS/StatusCard.css"

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const StatsCard = ({ title, value, change, isPositive, graphData }) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            data: graphData,
            borderColor: isPositive ? '#28a745' : '#dc3545',
            backgroundColor: 'transparent',
            pointRadius: 0,
            tension: 0.4
        }]
    };

    const options = {
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
        elements: { line: { borderWidth: 2 } },
    };

    return (
        <Card className="stats-card p-3 d-flex flex-column shadow-sm style-card">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h6 className="m-0 font">{title}</h6>
                    <span className="text-muted" style={{ fontSize: '12px' }}>{value}</span>
                </div>
                <div className={isPositive ? "text-success" : "text-danger"} style={{ fontSize: '12px' }}>
                    {change}
                </div>
            </div>
            <div className="mt-3">
                <Line data={data} options={options} height={50} />
            </div>
        </Card>
    );
};

export default StatsCard;