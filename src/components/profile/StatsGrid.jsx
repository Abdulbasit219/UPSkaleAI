import StatCard from "./StatCard";

const StatsGrid = ({ stats, isDark }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} isDark={isDark} />
      ))}
    </div>
  );
};

export default StatsGrid;
