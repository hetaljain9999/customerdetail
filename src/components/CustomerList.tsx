
import React from 'react';

// Use the same Customer interface
interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface CustomerListProps {
  customers: Customer[];
  onCustomerSelect: (customer: Customer) => void;
  selectedCustomerId: number;
}

const CustomerList: React.FC<CustomerListProps> = React.memo(({ customers, onCustomerSelect, selectedCustomerId }) => {
  return (
    <div>
      {customers.map(customer => (
        <div
          key={customer.id}
          onClick={() => onCustomerSelect(customer)}
          style={{
            background: selectedCustomerId === customer.id ? 'lightgray' : 'white',
            padding: '10px',
            cursor: 'pointer',
            borderBottom: '1px solid #ddd',
          }}
        >
          <h4>{customer.name}</h4>
          <p>{customer.title}</p>
        </div>
      ))}
    </div>
  );
});

export default CustomerList;

