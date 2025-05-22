"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddCarForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    price: "",
    imageUrl: "",
    features: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
          price: parseFloat(formData.price),
          features: formData.features
            .split(",")
            .map((feature) => feature.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add car");
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        year: "",
        price: "",
        imageUrl: "",
        features: "",
      });

      // Show success toast
      toast.success("Car added successfully!");

      // Refresh the page to show the new car
      router.refresh();
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Car Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-white"
          >
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            min="1900"
            max={new Date().getFullYear()}
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-white"
        >
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
        />
      </div>

      <div>
        <label
          htmlFor="features"
          className="block text-sm font-medium text-white"
        >
          Features (comma-separated)
        </label>
        <input
          type="text"
          id="features"
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="e.g., Leather seats, Sunroof, Navigation"
          className="mt-1 block w-full rounded-md bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Adding Car..." : "Add Car"}
      </button>
    </form>
  );
}
