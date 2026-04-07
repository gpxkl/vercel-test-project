import React from 'react';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail, onLogout }) => {
  // Placeholder for statistical data
  const stats = {
    totalUsers: 12345,
    activeUsersToday: 2100,
    newRegistrationsLast24h: 150,
    revenueMonthToDate: '$5,123.45',
  };

  return (
    <div>
      <h2>Welcome, {userEmail}!</h2>
      <h3>Dashboard Statistics</h3>
      <p><strong>Total Users:</strong> {stats.totalUsers}</p>
      <p><strong>Active Users Today:</strong> {stats.activeUsersToday}</p>
      <p><strong>New Registrations (24h):</strong> {stats.newRegistrationsLast24h}</p>
      <p><strong>Revenue (MTD):</strong> {stats.revenueMonthToDate}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
