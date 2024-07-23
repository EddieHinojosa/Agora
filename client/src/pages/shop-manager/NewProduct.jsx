import { MdUpload } from 'react-icons/md';

const NewProduct = () => {
    return (
        <div className="flex flex-col">
            <div className="text-left text-xl font-bold">New Product</div>
            <div className="mt-4 flex space-x-4 w-full">
                <div className="w-1/2 flex flex-col space-y-4">
                    <div>
                        <label htmlFor="productName" className="block text-left text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label htmlFor="productDetails" className="block text-left text-sm font-medium text-gray-700">
                            Product Details
                        </label>
                        <textarea
                            id="productDetails"
                            name="productDetails"
                            className="mt-1 p-2 block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter product details"
                        />
                    </div>
                </div>
                <div className="w-1/2 flex flex-col space-y-4">
                    <div>
                        <label htmlFor="productType" className="block text-left text-sm font-medium text-gray-700">
                            Product Type
                        </label>
                        <input
                            type="text"
                            id="productType"
                            name="productType"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter product type"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex mt-5">
                            <input
                                type="checkbox"
                                id="physicalItem"
                                name="physicalItem"
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="physicalItem" className="ml-2 block text-left text-sm text-gray-700">
                                Physical Item
                            </label>
                        </div>
                        <div className="flex mt-5">
                            <input
                                type="checkbox"
                                id="digitalItem"
                                name="digitalItem"
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="digitalItem" className="ml-2 block text-left text-sm text-gray-700">
                                Digital Item
                            </label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="itemTags" className="block text-left text-sm font-medium text-gray-700">
                            Item Tags
                        </label>
                        <input
                            type="text"
                            id="itemTags"
                            name="itemTags"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter item tags"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6 text-left text-2xl font-bold">Images</div>
            <div className="mt-4 w-full flex space-x-4">
                <div className="w-1/4">
                    <div className="text-left text-xl font-bold">How to Upload</div>
                    <p className="mt-2 text-left text-sm text-gray-700">
                        Please follow these steps to upload images: 
                        <ol className="list-decimal ml-4 mt-2">
                            <li>Step 1</li>
                            <li>Step 2</li>
                            <li>Step 3</li>
                        </ol>
                    </p>
                </div>
                <div className="w-3/4 grid grid-cols-6">
                    <div className="border bg-gray-200 rounded-md flex h-32 w-32">
                        <button className="py-2 px-4 rounded-md hover:underline">
                            Upload Image <MdUpload className="mx-auto mt-2" />
                        </button>
                    </div>
                    <div className="border border-gray-300 rounded-md h-32 w-32"></div>
                    <div className="border border-gray-300 rounded-md h-32 w-32"></div>
                    <div className="border border-gray-300 rounded-md h-32 w-32"></div>
                    <div className="border border-gray-300 rounded-md h-32 w-32"></div>
                    <div className="border border-gray-300 rounded-md h-32 w-32"></div>
                </div>
            </div>
        </div>
    );
}

export default NewProduct;
