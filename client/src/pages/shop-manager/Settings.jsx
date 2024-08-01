import { useState } from 'react';

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

    const countries = [
        'USA', 'Canada', 'Mexico'
    ];

    const getShopPhoto = (event) => {
        setShopPhoto(URL.createObjectURL(event.target.files[0]));
    }

    const getBannerPhoto = (event) => {
        setBannerPhoto(URL.createObjectURL(event.target.files[0]));
    }

    const handleVacationModeToggle = () => {
        setVacationMode(!vacationMode);
    }

    const handleSave = () => {
        // Needs code for saving photos/vacation mode settings
    };

    const handleSaveAddress = () => {
        setSavedAddresses([...savedAddresses, address]);
        setAddress({ line1: '', line2: '', city: '', state: '', zip: '', country: 'USA' });
    };

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Shop Settings</h2>
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
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shop Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={getShopPhoto}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:border-0 file:text-sm file:font-semibold
                            file:bg-gray-300 file:text-black
                            hover:file:bg-gray-300"
                        />
                        {shopPhoto && <img src={shopPhoto} alt="Shop" className="mt-4 w-32 h-32 object-cover rounded" />}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Banner Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={getBannerPhoto}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:border-0 file:text-sm file:font-semibold
                            file:bg-gray-300 file:text-black
                            hover:file:bg-gray-300"
                        />
                        {bannerPhoto && <img src={bannerPhoto} alt="Banner" className="mt-4 w-full h-32 object-cover rounded" />}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shop Description
                        </label>
                        <textarea
                            className="block w-1/2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="flex items-center mb-6">
                        <label className="block text-sm font-medium text-gray-700 mr-4">
                            Vacation Mode
                        </label>
                        <input
                            type="checkbox"
                            checked={vacationMode}
                            onChange={handleVacationModeToggle}
                            className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'shipping' && (
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            value={address.line1}
                            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                            className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address Line 2
                        </label>
                        <input
                            type="text"
                            value={address.line2}
                            onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                            className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                        </label>
                        <select
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="" disabled>Select a state</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                        </label>
                        <input
                            type="text"
                            value={address.zip}
                            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                            className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                        </label>
                        <select
                            value={address.country}
                            onChange={(e) => setAddress({ ...address, country: e.target.value })}
                            className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="" disabled>Select a country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <button
                            onClick={handleSaveAddress}
                            className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Save Address
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Saved Addresses
                        </label>
                        <select className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            {savedAddresses.map((addr, index) => (
                                <option key={index} value={index}>
                                    {`${addr.line1}, ${addr.line2} ${addr.city}, ${addr.state}, ${addr.country}`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Settings;
