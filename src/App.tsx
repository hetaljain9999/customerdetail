
import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';


interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}


const generateCustomers = (num: number): Customer[] => {
  return Array.from({ length: num }, (_, i) => ({
    id: i + 1,
    name: `Customer ${String(i + 1).padStart(2, '0')}`,
    title: `Title ${i + 1}`,
    address: `Address ${i + 1}`,
  }));
};

const customers: Customer[] = generateCustomers(1000);

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customers[0]);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '300px', overflowY: 'auto', maxHeight: '100vh' }}>
        <CustomerList
          customers={customers}
          onCustomerSelect={handleCustomerSelect}
          selectedCustomerId={selectedCustomer.id}
        />
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <CustomerDetails customer={selectedCustomer} />
      </div>
    </div>
  );
};

export default App;
