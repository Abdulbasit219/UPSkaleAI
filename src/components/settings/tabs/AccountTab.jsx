import React, { useState } from "react";
import {
  Mail,
  Check,
  AlertCircle,
  Trash2,
} from "lucide-react";
import SettingsCard from "../SettingsCard";
import InputField from "../InputField";
import Button from "../Button";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AccountTab({ isDark }) {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure? This will permanently delete your account and all data."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await axios.delete("/api/user/delete-account", {
        data: {
          userId: user?._id,
        },
      });

      alert("Account deleted successfully");

      // logout user
      await signOut({ redirect: false });

      // redirect to home / signup
      router.push("/");
    } catch (error) {
      alert(
        error?.response?.data?.message || "Failed to delete account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Email Address */}
      <SettingsCard title="Email Address" isDark={isDark}>
        <InputField
          type="email"
          icon={Mail}
          defaultValue={user?.email}
          isDark={isDark}
          disabled
        />
        <p className="text-sm mt-2 flex items-center gap-2 text-gray-500">
          <Check className="w-4 h-4 text-green-400" />
          Email verified
        </p>
      </SettingsCard>

      {/* Danger Zone */}
      <SettingsCard
        title={
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            Danger Zone
          </div>
        }
        isDark={isDark}
        variant="danger"
      >
        <div
          className={`flex items-start justify-between p-4 rounded-lg border ${
            isDark
              ? "bg-red-500/5 border-red-500/20"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div>
            <div className="font-semibold mb-1">
              Delete Account
            </div>
            <div className="text-sm text-gray-500">
              Permanently delete your account and all data
            </div>
          </div>

          <Button
            variant="danger"
            icon={Trash2}
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </SettingsCard>
    </>
  );
}
