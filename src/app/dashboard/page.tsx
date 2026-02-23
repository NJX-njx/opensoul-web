import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">
          <Plus size={16} />
          New Agent
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Stats Card 1 */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-medium text-zinc-400">Active Agents</div>
          <div className="mt-2 text-3xl font-bold">3</div>
        </div>
        {/* Stats Card 2 */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-medium text-zinc-400">Total Messages</div>
          <div className="mt-2 text-3xl font-bold">1,248</div>
        </div>
        {/* Stats Card 3 */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-medium text-zinc-400">System Status</div>
          <div className="mt-2 flex items-center gap-2 text-sm font-bold text-green-400">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            Operational
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold">Active Agents</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: "Personal Assistant", type: "Productivity", status: "Online" },
              { name: "Coding Buddy", type: "Developer", status: "Idle" },
              { name: "Travel Planner", type: "Lifestyle", status: "Offline" },
            ].map((agent, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-4"
              >
                <div>
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-sm text-zinc-500">{agent.type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      agent.status === "Online"
                        ? "bg-green-500"
                        : agent.status === "Idle"
                        ? "bg-yellow-500"
                        : "bg-zinc-500"
                    }`}
                  />
                  <span className="text-sm text-zinc-400">{agent.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
