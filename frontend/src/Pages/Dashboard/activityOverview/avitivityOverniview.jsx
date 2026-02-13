import React from "react";

const ActivityOverview = ({ todayMessage, yesterdayMessage, weekMessage }) => {
  const DetailCard = ({ items, footer }) => (
    <div className="flex flex-col gap-4 p-6 pt-4 bg-gray-800/60">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex justify-between text-sm text-gray-300`}
        >
          <span>{item.label}</span>
          <span className="text-white font-bold">{item.value}</span>
        </div>
      ))}
      {footer && (
        <div className="text-sm pt-2 border-t border-slate-700 text-gray-300">
          <span>{footer.label}: </span>
          <span className="text-white font-bold">{footer.value}</span>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="
      card rounded-xl bg-gray-800/60 border border-white/5
      flex flex-col max-h-[300px] overflow-y-auto customscrollbar shadow-lg shadow-cyan-500/10
    "
    >
      {/* ⭐ Sticky Header */}
      <h2 className="sticky top-0 z-10 bg-gray-800/60 pt-4 pb-3 px-6 text-xl font-semibold text-white flex items-center gap-2 border-b border-slate-800">
        <i className="fas fa-chart-line text-sky-400"></i>
        Activity Overview
      </h2>

      {/* Scrollable content */}
      <DetailCard
        items={[
          { label: "Today", value: todayMessage },
          { label: "Yesterday", value: yesterdayMessage },
          { label: "This Week", value: weekMessage },
        ]}
      />
    </div>
  );
};

export default ActivityOverview;
