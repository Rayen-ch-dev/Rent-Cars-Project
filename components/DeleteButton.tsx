"use client";

import { removeCar } from "../app/actions/auth";
import { toast } from "sonner";

interface DeleteButtonProps {
  carId: string;
}

const DeleteButton = ({ carId }: DeleteButtonProps) => {
  const handleDelete = async () => {
    try {
      await removeCar(carId);
      toast.success("Car deleted successfully");
    } catch (error) {
      toast.error("Failed to delete car");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
