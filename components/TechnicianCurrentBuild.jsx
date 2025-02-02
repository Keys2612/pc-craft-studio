const TechnicianCurrentBuild = () => {
    const orders = [
      { id: "123", status: "In Progress" },
      { id: "124", status: "In Progress" },
      { id: "125", status: "In Progress" },
      { id: "126", status: "In Progress" },
    ];
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Current Build</h2>
  
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-sm">
              <p className="text-gray-700 font-medium">Order #{order.id}</p>
              
              {/* Status Dropdown */}
              <select className="bg-gray-200 text-gray-700 rounded-md px-3 py-1">
                <option>In Progress</option>
                <option>Completed</option>
              </select>
  
              {/* Update Button */}
              <button className="bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700">
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TechnicianCurrentBuild;
  