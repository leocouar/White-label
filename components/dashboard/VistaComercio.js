import React, { useState } from 'react';

const VistaComercio = (id) => {
  console.log(id);
  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Commerce information (you can use your own data or fetch it from an API)
  const [commerceData, setCommerceData] = useState(id
    /*{
    email: 'info@yourcommerce.com',
    phone: '+1 (123) 456-7890',
    address: '123 Main St, City, Country',
    businessHours: {
      mondayToFriday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  }*/);
  // State variables for edited values
  // const [newEmail, setNewEmail] = useState(commerceData.email);
  // const [newPhone, setNewPhone] = useState(commerceData.phone);
  // const [newAddress, setNewAddress] = useState(commerceData.address);
  // const [newMondayToFriday, setNewMondayToFriday] = useState(commerceData.businessHours.mondayToFriday);
  // const [newSaturday, setNewSaturday] = useState(commerceData.businessHours.saturday);
  // const [newSunday, setNewSunday] = useState(commerceData.businessHours.sunday);

  const handleEditClick = () => {
    // Open the modal when the "Edit" button is clicked
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Update the commerce information with the new values
    // setCommerceData({
    //   email: newEmail,
    //   phone: newPhone,
    //   address: newAddress,
    //   businessHours: {
    //     mondayToFriday: newMondayToFriday,
    //     saturday: newSaturday,
    //     sunday: newSunday,
    //   },
    // });

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div className="bg-blue-100 p-4 rounded-md shadow-md">
      <h1 className="text-4xl font-semibold mb-4">Commerce Info</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Display commerce information */}
        <div>
          <h2 className="text-2xl font-semibold">{commerceData.name}</h2>
          <ul className="list-disc ml-5">
            <li>
              <span className="font-medium">Email:</span> {commerceData.email}
            </li>
            <li>
              <span className="font-medium">Phone:</span> {commerceData.phone}
            </li>
            <li>
              <span className="font-medium">Address:</span> {commerceData.address}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Business Hours</h2>
          <ul className="list-disc ml-5">
            <li>
              <span className="font-medium">Monday - Friday:</span>{' '}
              {/* {commerceData.businessHours.mondayToFriday} */}
            </li>
            <li>
              <span className="font-medium">Saturday:</span> 
              {/* {commerceData.businessHours.saturday} */}
            </li>
            <li>
              <span className="font-medium">Sunday:</span> 
              {/* {commerceData.businessHours.sunday} */}
            </li>
          </ul>
        </div>
      </div>

      {/* Edit button */}
      <div className="md:col-span-2 text-right">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>

      {isModalOpen && (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-96 md:w-2/5 mx-auto p-6 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Edit Commerce Information</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email:</label>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Phone:</label>
        <input
          type="text"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Address:</label>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Monday - Friday:</label>
        <input
          type="text"
          value={newMondayToFriday}
          onChange={(e) => setNewMondayToFriday(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Saturday:</label>
        <input
          type="text"
          value={newSaturday}
          onChange={(e) => setNewSaturday(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Sunday:</label>
        <input
          type="text"
          value={newSunday}
          onChange={(e) => setNewSunday(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
      >
        Save
      </button>
      <button
        onClick={handleCloseModal}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  );
};  
  export default VistaComercio;