import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MainSettings from '../../components/ShopManager/Settings/MainSettings'; 
import ShippingSettings from '../../components/ShopManager/Settings/ShippingSettings'; 
import { updateUserShopSettings, fetchUserShopSettings } from '../../api/shopSettingsApi';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [shopPhoto, setShopPhoto] = useState(null);
  const [bannerPhoto, setBannerPhoto] = useState(null);
  const [vacationMode, setVacationMode] = useState(false);
  const [activeTab, setActiveTab] = useState('main');
  const [shopDescription, setShopDescription] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await fetchUserShopSettings(user._id);
        setShopDescription(settings.shopDescription || '');
        setAddress(settings.shopShippingAddress || {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        });
        // Set other settings like shopPhoto, bannerPhoto, vacationMode if needed
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    if (user) {
      loadSettings();
    }
  }, [user]);

  const handleSaveSettings = async (userId) => {
    try {
      const response =
      await updateUserShopSettings(userId, shopDescription, address);
      console.log('Shop settings updated successfully!', response);
    } catch (error) {
      console.error('Failed to update shop settings.', error);
    }
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const countries = ['United States of America', 'Canada', 'Mexico'];

  if (!user) {
    return <div>Plays jeopardy theme music</div>;
  }

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
          userId={user._id}
          shopPhoto={shopPhoto}
          setShopPhoto={setShopPhoto}
          bannerPhoto={bannerPhoto}
          setBannerPhoto={setBannerPhoto}
          vacationMode={vacationMode}
          setVacationMode={setVacationMode}
          shopDescription={shopDescription}
          setShopDescription={setShopDescription}
        />
      )}

      {activeTab === 'shipping' && (
        <ShippingSettings
          userId={user._id}
          address={address}
          setAddress={setAddress}
          savedAddresses={savedAddresses}
          setSavedAddresses={setSavedAddresses}
          states={states}
          countries={countries}
          shopShippingAddress={user.shopShippingAddress}
        />
      )}

      <div className="mt-6">
        <button
          onClick={() => handleSaveSettings(user._id)}
          className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
