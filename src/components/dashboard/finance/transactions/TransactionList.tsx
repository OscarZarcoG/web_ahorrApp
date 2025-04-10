'use client'
import React from 'react';
import { useFinance } from '@/hook/useFinance';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@/components/dashboard/finance/ui/table/Table';
import { StatusBadge } from '@/components/dashboard/finance/ui/status/StatusBadge';

const TransactionList: React.FC = () => {
  const { transactions, formatCurrency, formatDate, loading, refreshAllData } = useFinance();

  if (loading) return <div className="p-4 text-center">Cargando transacciones...</div>;
  
  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-lg dark:bg-slate-800 w-11/12 mx-auto">
        <p className="text-lg mb-4">No hay transacciones registradas</p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => refreshAllData()}
        >
          Actualizar datos
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-slate-800 w-11/12 mx-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Historial de Transacciones</h2>
        <button 
          className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          onClick={() => refreshAllData()}
        >
          Actualizar
        </button>
      </div>
     
      <Table>
        <TableHead>
          <TableRow>
            <TableCell as="th">Fecha</TableCell>
            <TableCell as="th">Concepto</TableCell>
            <TableCell as="th">Categoría</TableCell>
            <TableCell as="th">Tipo</TableCell>
            <TableCell as="th">Monto</TableCell>
          </TableRow>
        </TableHead>
       
        <TableBody>
          {transactions.map(transaction => {
            const isIncome = transaction.is_income !== undefined 
              ? transaction.is_income 
              : false;
              
            return (
              <TableRow key={transaction.id || `${transaction.created_at}-${transaction.amount}`}>
                <TableCell>{transaction.created_at && formatDate(transaction.created_at)}</TableCell>
                <TableCell>{transaction.concept}</TableCell>
                <TableCell>{transaction.category_name || 'Sin categoría'}</TableCell>
                <TableCell>
                  <StatusBadge type={isIncome ? 'income' : 'expense'}>
                    {transaction.type_name || (isIncome ? 'Ingreso' : 'Gasto')}
                  </StatusBadge>
                </TableCell>
                <TableCell className={`font-medium ${
                  isIncome ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isIncome ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;