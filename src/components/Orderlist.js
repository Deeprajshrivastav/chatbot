import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import "./CSS/Orderpage.css";
const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered':
            return '#28a745'; 
        case 'Cancelled':
            return '#dc3545'; 
        case 'Shipped':
            return '#07BEAA';  
        case 'Pending':
            return '#ffc107';  
        default:
            return '#6c757d';  
    }
};


const OrderList = ({ orders }) => {
  return (
    <div className="p-3 border rounded shadow-sm bg-white">
      <h5 className="mb-3 d-flex justify-content-center font">Order List</h5>
      <ListGroup>
        {orders.map((order, index) => (
          <ListGroupItem
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            <span>Order #{order.id}</span>
            <Button
              style={{
                backgroundColor: getStatusColor(order.status),
                borderColor: getStatusColor(order.status),
              }}
              size="sm"
              className="text-white px-3 status-btn"
            >
              {order.status}
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default OrderList;
