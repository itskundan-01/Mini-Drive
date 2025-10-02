const StatCard = ({ icon: Icon, title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Icon className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="mt-1 text-3xl font-bold text-slate-800">{value}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
