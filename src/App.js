import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import ProductTable from './component/Product/ProductTable';
import UserDatafetch from './component/UserData/UserDatafetch';
import SaleEntryForm from './component/SaleEntry/SaleEntryForm';
import SaleEntryFormFunc from './component/SaleEntry/SaleEntryFormFunc';

function App() {
  return (
    <>
    <Navbar className="test"></Navbar>
    <ProductTable></ProductTable>
    {/* <UserDatafetch></UserDatafetch> */}
    {/* <SaleEntryForm></SaleEntryForm> */}   
   </>
  );
}

export default App;
