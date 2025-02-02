const CurrentOrders = ({ orders }) => { // ✅ Receive `orders` as a prop
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
        <div className="bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Parts</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-4">#{order.id}</td>
                  <td className="p-4">{order.parts}</td>
                  <td className={`p-4 font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="p-4">
                    <button className={`px-4 py-2 rounded ${getButtonColor(order.action)}`}>
                      {order.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Helper functions for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "text-green-500";
      case "In Progress":
        return "text-yellow-500";
      case "Pending":
        return "text-orange-500";
      default:
        return "text-red-500";
    }
  };
  
  const getButtonColor = (action) => {
    return action === "Cancel" ? "bg-red-500 text-white" : "bg-indigo-500 text-white";
  };
  
  export default CurrentOrders;