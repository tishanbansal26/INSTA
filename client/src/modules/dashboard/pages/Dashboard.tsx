export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="text-2xl font-bold text-text mt-2">$124,500</p>
          <p className="text-xs text-success mt-2">+14% from last month</p>
        </div>
        <div className="glass p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Active Policies</h3>
          <p className="text-2xl font-bold text-text mt-2">1,420</p>
          <p className="text-xs text-success mt-2">+5% from last month</p>
        </div>
        <div className="glass p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Pending Renewals</h3>
          <p className="text-2xl font-bold text-text mt-2">34</p>
          <p className="text-xs text-warning mt-2">Requires attention</p>
        </div>
        <div className="glass p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Recent Claims</h3>
          <p className="text-2xl font-bold text-text mt-2">12</p>
          <p className="text-xs text-danger mt-2">-2% from last month</p>
        </div>
      </div>
      <div className="glass p-8 rounded-xl min-h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Charts and activities will go here in Phase 9</p>
      </div>
    </div>
  );
}
