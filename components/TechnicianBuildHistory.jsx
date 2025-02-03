import { useParts } from "@/context/PartsContext"; // Import context

const TechnicianBuildHistory = () => {
  const { buildHistory } = useParts(); // Fetch build history from context

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Build History</h2>

      <div className="flex flex-col gap-4">
        {buildHistory && buildHistory.length > 0 ? (
          buildHistory.map((build) => (
            <div key={build.id} className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-sm">
              <div>
                <p className="text-gray-700 font-medium">Order #{build.id}</p>
                <p className="text-gray-500 text-sm">Completed on {build.date}</p>
              </div>

              {/* View Details Button (For future expansion) */}
              <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No completed builds yet.</p>
        )}
      </div>
    </div>
  );
};

export default TechnicianBuildHistory;
