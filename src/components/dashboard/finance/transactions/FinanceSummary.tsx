import React from 'react';
import { FaMoneyBillWave, FaArrowUp, FaArrowDown, FaList } from 'react-icons/fa';
import { useFinance } from '@/hook/useFinance';
import { IconType } from 'react-icons';

interface SummaryCardProps {
  icon: IconType;
  title: string;
  value: string | number;
  colorClass: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon: Icon, title, value, colorClass }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full dark:bg-gray-800">
      <div className="flex items-center">
        <Icon className={`text-2xl mr-2 ${colorClass}`} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className={`text-2xl font-bold mt-2 ${colorClass || ''}`}>{value}</p>
    </div>
  );
};

const FinanceSummary: React.FC = () => {
  const { summary, formatCurrency } = useFinance();
  
  const summaryCards = [
    {
      icon: FaMoneyBillWave,
      title: "Balance Total",
      value: formatCurrency(summary.balance),
      colorClass: "text-green-500"
    },
    {
      icon: FaArrowUp,
      title: "Ingresos",
      value: formatCurrency(summary.totalIncome),
      colorClass: "text-blue-500"
    },
    {
      icon: FaArrowDown,
      title: "Gastos",
      value: formatCurrency(summary.totalExpense),
      colorClass: "text-red-500"
    },
    {
      icon: FaList,
      title: "Total Transacciones",
      value: summary.transactionCount.toString(), // Convertir a string para consistencia
      colorClass: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {summaryCards.map((card, index) => (
        <SummaryCard
          key={index}
          icon={card.icon}
          title={card.title}
          value={card.value}
          colorClass={card.colorClass}
        />
      ))}
    </div>
  );
};

export default FinanceSummary;