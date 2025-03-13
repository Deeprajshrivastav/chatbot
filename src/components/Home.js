import React from 'react';
import { Row, Col } from 'reactstrap';
import StatsCard from './StatusCard';
import CandleChart from './candlechart';
import OrderList from './Orderlist';
const Dashboard = () => {
  const orders = [
    { id: 1001, status: 'Delivered' },
    { id: 1002, status: 'Pending' },
    { id: 1003, status: 'Cancelled' },
    { id: 1004, status: 'Shipped' },
    { id: 1005, status: 'Delivered' },
    { id: 1006, status: 'Delivered' },
    { id: 1007, status: 'Pending' },
    { id: 1008, status: 'Cancelled' },
    { id: 1009, status: 'Shipped' },
    { id: 1010, status: 'Delivered' },
    { id: 1008, status: 'Cancelled' },
];
    return (
      <div className='p-2'>
       <Row className="g-3 mt-4  ">
            <Col md={3}><StatsCard title="No. of Orders" value="1,234" change="+5.2%" isPositive={true} graphData={[20, 30, 25, 40, 35, 45]} /></Col>
            <Col md={3}><StatsCard title="Total Contacts" value="567" change="+2.1%" isPositive={true} graphData={[15, 20, 18, 25, 22, 28]} /></Col>
            <Col md={3}><StatsCard title="Total Revenue" value="¥ 721,882" change="-4.66%" isPositive={false} graphData={[50, 45, 48, 40, 35, 38]} /></Col>
            <Col md={3}><StatsCard title="Delivered Orders" value="432" change="+3.8%" isPositive={true} graphData={[10, 12, 15, 13, 18, 20]} /></Col>
        </Row>
        <Row className="mt-4">
                <Col md={8}><CandleChart /></Col>
                <Col md={4}><OrderList orders={orders} /></Col>
            </Row>
        </div>
       
    );
};

export default Dashboard;