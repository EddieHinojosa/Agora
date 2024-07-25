import { useState } from 'react'

const Settings = () => {
    const [shopPhoto, setShopPhoto] = useState(null);
    const [bannerPhoto, setBannerPhoto] = useState(null);
    const [vacationMode, setVacationMode] = useState(null)

    const getShopPhoto = (event) => {
        setShopPhoto(URL.createObjectURL(event.target.files(0)))
    }

    const getBannerPhoto = (event) => {
        setBannerPhoto(URL.createObjectURL(event.target.filer(0)))
    }

    const handleVacationModeToggle = () => {
        setVacationMode(!vacationMode)
    }

    const handleSave = () => {
        
    };

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Shop Settings</h1>
            
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
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-300 file:text-black
                    hover:file:bg-blue-100"
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
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-300 file:text-black
                    hover:file:bg-blue-100"
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
                    className="px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default Settings