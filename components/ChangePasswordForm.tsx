"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { changePassword } from "@/app/actions/auth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordFormProps {
  userId: string;
}

export function ChangePasswordForm({ userId }: ChangePasswordFormProps) {
  const router = useRouter();
  const [isChanging, setIsChanging] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("userId", userId);
      data.append("currentPassword", formData.currentPassword);
      data.append("newPassword", formData.newPassword);
      data.append("confirmPassword", formData.confirmPassword);

      await changePassword(data);
      toast.success("Password changed successfully");
      setIsChanging(false);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to change password");
    }
  };

  if (!isChanging) {
    return (
      <button
        onClick={() => setIsChanging(true)}
        className="px-6 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-900 transition-colors font-semibold"
      >
        Change Password
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-blue-500 p-8 rounded-lg w-[500px] shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-blue-400">
          Change Password
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-2 top-2 text-gray-400"
              >
                {showPasswords.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-2 top-2 text-gray-400"
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-2 top-2 text-gray-400"
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsChanging(false)}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
