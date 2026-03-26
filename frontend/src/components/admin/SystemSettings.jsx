import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Save, RefreshCcw, Bell, Shield, MessageSquare, ToggleLeft, ToggleRight } from "lucide-react";

const SystemSettings = () => {
  const { settings, getSettings, updateSettings, isLoading } = useAdminStore();
  const [localSettings, setLocalSettings] = useState([]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleToggle = (key) => {
    setLocalSettings(prev => prev.map(s => 
      s.key === key ? { ...s, value: !s.value } : s
    ));
  };

  const handleChange = (key, val) => {
    setLocalSettings(prev => prev.map(s => 
      s.key === key ? { ...s, value: val } : s
    ));
  };

  const handleSave = () => {
    updateSettings(localSettings);
  };

  if (isLoading && localSettings.length === 0) return <div className="p-10 text-center text-slate-500">Loading settings...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">System Configuration</h2>
          <p className="text-slate-400 text-sm">Global settings that affect the entire platform</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-cyan-900/20"
        >
          {isLoading ? <RefreshCcw className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {localSettings.map((setting) => (
          <div key={setting.key} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex items-center justify-between group hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-800 rounded-xl mt-1">
                {setting.key.includes("registration") && <Shield className="size-5 text-purple-400" />}
                {setting.key.includes("message") && <MessageSquare className="size-5 text-blue-400" />}
                {setting.key.includes("announcement") && <Bell className="size-5 text-yellow-400" />}
              </div>
              <div>
                <h4 className="text-white font-semibold capitalize">
                  {setting.key.replace(/_/g, " ")}
                </h4>
                <p className="text-slate-500 text-sm mt-1">{setting.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {typeof setting.value === "boolean" ? (
                <button 
                  onClick={() => handleToggle(setting.key)}
                  className="transition-colors outline-none"
                >
                  {setting.value ? (
                    <ToggleRight className="size-10 text-cyan-500" />
                  ) : (
                    <ToggleLeft className="size-10 text-slate-700 hover:text-slate-600" />
                  )}
                </button>
              ) : (
                <input
                  type={typeof setting.value === "number" ? "number" : "text"}
                  value={setting.value}
                  onChange={(e) => handleChange(setting.key, typeof setting.value === "number" ? Number(e.target.value) : e.target.value)}
                  className="bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 w-48 transition-colors"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex gap-4">
          <div className="p-2 bg-cyan-500/20 rounded-lg h-fit">
              <Shield className="size-5 text-cyan-500" />
          </div>
          <div>
              <p className="text-cyan-500 font-semibold text-sm">Security Note</p>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  These settings take effect immediately for all users. Dynamic limits are enforced at the API level. 
                  Use caution when disabling public registration in production environments.
              </p>
          </div>
      </div>
    </div>
  );
};

export default SystemSettings;
