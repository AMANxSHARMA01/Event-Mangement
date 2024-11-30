import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

function DelEntity({ entityType, apiEndpoint, entityLabel, navigateHome }) {
  const [entities, setEntities] = useState([]); // State to store fetched entities
  const [selectedEntityId, setSelectedEntityId] = useState(""); // State to store selected entity's ID
  const [error, setError] = useState(""); // State for error messages
  const [message, setMessage] = useState(""); // State for success messages
  const navigate = useNavigate();

  // Fetch all entities on component mount
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch(apiEndpoint); // API to fetch entities
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to fetch ${entityLabel}s.`);
        }

        setEntities(data); // Set the entities state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEntities();
  }, [apiEndpoint, entityLabel]);

  // Handle form submission to delete the selected entity
  const handleDelete = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous success messages

    if (!selectedEntityId) {
      setError(`Please select a ${entityLabel}.`);
      return;
    }

    try {
      const response = await fetch(`${apiEndpoint}/${selectedEntityId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to delete ${entityLabel}.`);
      }

      setMessage(`${entityLabel} deleted successfully!`);
      setEntities(entities.filter((entity) => entity._id !== selectedEntityId)); // Update the entity list
      setSelectedEntityId(""); // Reset the dropdown
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-50 px-20">
        <div className="flex flex-col max-w-4xl mx-auto w-full">
        <Navbar />
          <div className="text-2xl font-bold text-center my-6 ">
       
          Delete {entityLabel}
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Error message */}
        {message && <div className="text-green-500 text-center mb-4">{message}</div>} {/* Success message */}

        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="entity">
              Select {entityLabel} to Delete
            </label>
            <select
              id="entity"
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              required
            >
              <option value="">-- Select {entityLabel} --</option>
              {entities.map((entity) => (
                <option key={entity._id} value={entity._id}>
                  {entity.email || entity.name} {/* Display either email for user or name for vendor */}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition duration-150 ease-in-out"
            >
              Delete {entityLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DelEntity;
