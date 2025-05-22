"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/actions/auth";
import { toast } from "sonner";

interface EditProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("userId", user.id);
      data.append("name", formData.name);
      data.append("email", formData.email);

      await updateProfile(data);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Edit Profile
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-blue-500 p-8 rounded-lg w-[500px] shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-blue-400">
          Edit Profile
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
