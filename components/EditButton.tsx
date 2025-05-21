"use client";

import { useState } from "react";
import { updateCar } from "../app/actions/auth";
import { toast } from "sonner";

interface EditButtonProps {
  carId: string;
  initialData: {
    name: string;
    description: string;
    year: number;
    price: number;
    imageUrl: string;
    features: string[];
  };
}

const EditButton = ({ carId, initialData }: EditButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleEdit = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });
      data.append("id", carId);

      await updateCar(data);
      toast.success("Car updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update car");
    }
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-black border-2 border-white p-8 rounded-lg w-[500px] shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-white">Edit Car</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-black border-2 border-white rounded-md p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Car Name"
            />
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-black border-2 border-white rounded-md p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Description"
            />
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              className="bg-black border-2 border-white rounded-md p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Year"
            />
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="bg-black border-2 border-white rounded-md p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Price"
            />
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="bg-black border-2 border-white rounded-md p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Image URL"
            />
            <input
              type="text"
              value={formData.features.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  features: e.target.value
                    .split(",")
                    .map((feature) => feature.trim()),
                })
              }
              className="bg-black border-2 border-white rounded-md p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Features (comma separated)"
            />
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 border-2 border-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 border-2 border-white transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-800"
    >
      Edit
    </button>
  );
};

export default EditButton;
