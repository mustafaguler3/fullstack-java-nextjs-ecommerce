"use client";

import { useEffect, useState, useRef } from "react";
import userService from "@/services/userService";
import { User } from "@/types/User";
import {
  User as UserIcon,
  Package,
  MapPin,
  Settings,
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Save,
  Camera,
  UploadCloud,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchUserAccount();
  }, []);

  const fetchUserAccount = async () => {
    try {
      const response = await userService.userAccount();
      const data = response.data;
      setUser(data);
      setFormData({
        username: data.username || "",
        fullName: data.fullName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
      });

      if (data.profilePicture) {
        setPreviewUrl(`http://localhost:8080${data.profilePicture}`);
      }
    } catch (error) {
      console.error("Error fetching user account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const loadingToast = toast.loading("Updating your neural profile...");
    setIsUpdating(true);
    try {
      const data = new FormData();

      data.append("userDTO", JSON.stringify(formData));

      if (selectedFile) {
        data.append("imageFile", selectedFile);
      }
      
      const updateData: any = {
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };

      const res = await userService.updateProfile(updateData);
      const token = res.data.meta?.token;

      if (token) {
        localStorage.setItem("token", token);
        return;
      }
      

      await fetchUserAccount();
      toast.success("Profile synchronized successfully!", { id: loadingToast });
      setIsEditing(false);
      
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed", { id: loadingToast });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500 font-bold animate-pulse italic">
        MG_SYSTEM_BOOTING...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      <div className="h-48 bg-gradient-to-r from-blue-900/40 via-slate-900 to-emerald-900/40 border-b border-white/5 flex items-end px-8 pb-8">
        <div className="max-w-6xl mx-auto w-full flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-1 shadow-2xl shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center overflow-hidden">
              {user?.profilePicture ? (
                <img
                  src={`http://localhost:8080${user.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-black italic text-white">
                  {user?.username?.[0].toUpperCase() ||
                    user?.fullName?.[0].toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">
              Welcome, <span className="text-blue-500">{user?.username}</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
              Account Dashboard / {activeTab}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-white/5 rounded-[2rem] p-4 backdrop-blur-xl sticky top-8">
            <h2 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4 ml-4">
              Account Menu
            </h2>
            <nav className="space-y-1">
              <MenuButton
                icon={<UserIcon size={18} />}
                label="Personal Details"
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              />
              <MenuButton
                icon={<Package size={18} />}
                label="My Orders"
                active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
              />
              <MenuButton
                icon={<MapPin size={18} />}
                label="Addresses"
                active={activeTab === "address"}
                onClick={() => setActiveTab("address")}
              />
              <MenuButton
                icon={<ShieldCheck size={18} />}
                label="Security"
                active={activeTab === "security"}
                onClick={() => setActiveTab("security")}
              />
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest mt-4"
              >
                <div className="flex items-center gap-3">
                  <LogOut size={18} /> Logout
                </div>
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-2">
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">
                    Account <span className="text-blue-500">Information</span>
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-[10px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/20 px-6 py-2.5 rounded-full hover:bg-emerald-500/10 transition-all"
                    >
                      Edit Info
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedFile(null);
                      }}
                      className="text-[10px] font-black uppercase tracking-widest text-red-400 border border-red-400/20 px-6 py-2.5 rounded-full hover:bg-red-400/10 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className={`relative w-40 h-40 rounded-[2rem] overflow-hidden border-2 transition-all ${isEditing ? "border-blue-500 cursor-pointer scale-105" : "border-white/5"}`}
                      onClick={() => isEditing && fileInputRef.current?.click()}
                    >
                      <img
                        src={previewUrl || "/default-avatar.png"}
                        className="w-full h-full object-cover"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center">
                          <Camera size={24} />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        (setSelectedFile(e.target.files[0]),
                        setPreviewUrl(URL.createObjectURL(e.target.files[0])))
                      }
                    />
                  </div>

                  <div className="flex-1 grid grid-cols-1 gap-6">
                    <ProfileInput
                      label="Username"
                      value={formData.username}
                      isEditing={isEditing}
                      onChange={(v) =>
                        setFormData({ ...formData, username: v })
                      }
                    />
                    <ProfileInput
                      label="Full Name"
                      value={formData.fullName}
                      isEditing={isEditing}
                      onChange={(v) =>
                        setFormData({ ...formData, fullName: v })
                      }
                    />
                    <ProfileInput
                      label="Email"
                      value={formData.email}
                      isEditing={isEditing}
                      onChange={(v) => setFormData({ ...formData, email: v })}
                    />
                    <ProfileInput
                      label="Phone"
                      value={formData.phoneNumber}
                      isEditing={isEditing}
                      onChange={(v) =>
                        setFormData({ ...formData, phoneNumber: v })
                      }
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="w-full mt-10 bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <>
                        <Save size={16} /> Save Changes
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-12 text-center border-dashed">
              <Package size={48} className="mx-auto text-slate-700 mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                No orders found yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group ${active ? "bg-blue-600/10 text-blue-400" : "hover:bg-white/5 text-slate-400"}`}
  >
    <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-widest">
      {icon} {label}
    </div>
    <ChevronRight
      size={14}
      className={`${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
    />
  </button>
);

const ProfileInput = ({ label, value, isEditing, onChange }: any) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-1">
      {label}
    </p>
    {isEditing ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 focus:border-blue-500 outline-none transition-all text-sm font-bold"
      />
    ) : (
      <p className="bg-slate-950/30 border border-white/5 py-3 px-4 rounded-xl text-sm font-bold text-slate-300">
        {value || "---"}
      </p>
    )}
  </div>
);

export default ProfilePage;
