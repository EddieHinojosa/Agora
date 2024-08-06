import { useState } from 'react';
import MainSettings from '../../components/ShopManager/Settings/MainSettings'; 
import ShippingSettings from '../../components/ShopManager/Settings/ShippingSettings'; 

const Settings = () => {
  const [shopPhoto, setShopPhoto] = useState(null);
  const [bannerPhoto, setBannerPhoto] = useState(null);
  const [vacationMode, setVacationMode] = useState(false);
  const [activeTab, setActiveTab] = useState('main');
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA'
  });
  const [savedAddresses, setSavedAddresses] = useState([]);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const countries = ['USA', 'Canada', 'Mexico'];

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl mb-6">Shop Settings</h2>
      <nav className="p-3 bg-gray-100 mb-6 space-x-4">
        <button
          onClick={() => setActiveTab('main')}
          className={`mr-4 text-sm ${activeTab === 'main' ? 'font-bold' : ''}`}
        >
          Main
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`text-sm ${activeTab === 'shipping' ? 'font-bold' : ''}`}
        >
          Shipping
        </button>
      </nav>

      {activeTab === 'main' && (
        <MainSettings
          shopPhoto={shopPhoto}
          setShopPhoto={setShopPhoto}
          bannerPhoto={bannerPhoto}
          setBannerPhoto={setBannerPhoto}
          vacationMode={vacationMode}
          setVacationMode={setVacationMode}
        />
      )}

      {activeTab === 'shipping' && (
        <ShippingSettings
          address={address}
          setAddress={setAddress}
          savedAddresses={savedAddresses}
          setSavedAddresses={setSavedAddresses}
          states={states}
          countries={countries}
        />
      )}
    </div>
  );
};

export default Settings;
