import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/api/conectionBack.js";
import { useAuth } from "./useAuth";

interface Cash {
  id?: number;
  name: string;
  currency: string;
  created_at?: string;
  updated_at?: string;
}

interface TypeTransaction {
  id?: number;
  name: string;
  is_income: boolean;
}

interface Category {
  id?: number;
  name: string;
  description?: string;
  status: boolean;
}

interface Account {
  id?: number;
  number_account: string;
  balance: number;
  fk_cash: number;
  fk_user: number;
  created_at?: string;
  updated_at?: string;
}

interface Transaction {
  id?: number;
  concept?: string;
  amount: number;
  fk_type_transaction: number;
  fk_account: number;
  fk_category?: number;
  created_at?: string;
  updated_at?: string;
  hora_dia?: number;
  dia_semana?: number;
  mes?: number;
}

interface BalanceHistory {
  id?: number;
  account: number;
  transaction: number;
  previous_balance: number;
  new_balance: number;
  created_at?: string;
}

interface TransactionWithDetails extends Transaction {
  id: number;
  type_name?: string;
  category_name?: string;
  is_income?: boolean;
}

interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

let cashCache: Cash[] = [];
let typeTransactionsCache: TypeTransaction[] = [];
let categoriesCache: Category[] = [];

export const useFinance = () => {
  const { isAuthenticated, navigateTo } = useAuth();
  const [cash, setCash] = useState<Cash[]>([]);
  const [typeTransactions, setTypeTransactions] = useState<TypeTransaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<TransactionWithDetails[]>([]);
  const [balanceHistory, setBalanceHistory] = useState<BalanceHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [summary, setSummary] = useState<FinanceSummary>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactionCount: 0,
  });
  
  const isInitializedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const summaryCalculatedRef = useRef(false);
  
  const fetchLockRef = useRef(false);

  const fetchCachedData = useCallback(async (endpoint: string, setter: Function, cache: any[], forceRefresh = false) => {
    if (cache.length > 0 && !forceRefresh) {
      setter(cache);
      return cache;
    }
    
    try {
      const response = await api.get(endpoint);
      setter(response.data);
      return response.data;
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}:`, err);
      throw err;
    }
  }, []);

  const fetchCash = useCallback((forceRefresh = false) => {
    return fetchCachedData("api/finanzas/cash/", setCash, cashCache, forceRefresh)
      .then(data => {
        cashCache = data;
        return data;
      });
  }, [fetchCachedData]);

  const fetchTypeTransactions = useCallback((forceRefresh = false) => {
    return fetchCachedData("api/finanzas/type-transaction/", setTypeTransactions, typeTransactionsCache, forceRefresh)
      .then(data => {
        typeTransactionsCache = data;
        setTypeTransactions(typeTransactionsCache);
        return typeTransactionsCache;
      });
  }, [fetchCachedData]);

  const fetchCategories = useCallback((forceRefresh = false) => {
    return fetchCachedData("api/finanzas/category/", setCategories, categoriesCache, forceRefresh)
      .then(data => {
        categoriesCache = data;
        return data;
      });
  }, [fetchCachedData]);
  
  const fetchAccount = useCallback(async () => {
    try {
      const response = await api.get("api/finanzas/account/");
      
      if (response.data && response.data.length > 0) {
        const accountData = response.data[0];
        
        if (accountData && !accountData.id && accountData.id !== 0) {
          if (accountData.pk || accountData.account_id) {
            accountData.id = accountData.pk || accountData.account_id;
          }
        }
        
        setAccount(accountData);
        return accountData;
      }
      return null;
    } catch (err) {
      console.error("Error fetching account:", err);
      throw err;
    }
  }, []);

  const processTransactions = useCallback((rawTransactions: any[]) => {
    if (typeTransactionsCache.length === 0 || categoriesCache.length === 0) {
      console.warn("Cannot process transactions: missing type or category data");
      return [];
    }
    
    return rawTransactions.map(transaction => {
      const result = { ...transaction } as TransactionWithDetails;
      
      if (transaction.fk_type_transaction) {
        const typeData = typeTransactionsCache.find(t => t.id === transaction.fk_type_transaction);
        
        if (typeData) {
          result.type_name = typeData.name;
          result.is_income = typeData.is_income;
        }
      }
      
      if (result.is_income === undefined) {
        result.is_income = 
          transaction.concept?.toLowerCase().includes('ingreso') || 
          transaction.concept?.toLowerCase().includes('depósito') || 
          false;
      }
      
      if (transaction.fk_category) {
        const category = categoriesCache.find(c => c.id === transaction.fk_category);
        if (category) {
          result.category_name = category.name;
        }
      }
      
      return result;
    });
  }, []);

  const fetchTransactionsWithDetails = useCallback(async () => {
    try {
      const response = await api.get("api/finanzas/transaction/");
      const processedTransactions = processTransactions(response.data);
      setTransactions(processedTransactions);
      return processedTransactions;
    } catch (err) {
      console.error("Error fetching transactions:", err);
      throw err;
    }
  }, [processTransactions]);

  const fetchBalanceHistory = useCallback(async () => {
    try {
      const response = await api.get("api/finanzas/balance-history/");
      setBalanceHistory(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching balance history:", err);
      throw err;
    }
  }, []);

  const calculateSummary = useCallback(() => {
    if (summaryCalculatedRef.current) {
      return;
    }

    const currentBalance = account?.balance || 0;
    
    if (!transactions.length) {
      setSummary({
        totalIncome: 0,
        totalExpense: 0,
        balance: currentBalance,
        transactionCount: 0,
      });
      return;
    }
    
    console.log("Calculating summary with transactions:", transactions.length);
    
    const incomeTransactions = transactions.filter(t => t.is_income === true);
    const expenseTransactions = transactions.filter(t => t.is_income === false);
    
    console.log(`Found ${incomeTransactions.length} income and ${expenseTransactions.length} expense transactions`);

    const totalIncome = incomeTransactions
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const totalExpense = expenseTransactions
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    setSummary({
      totalIncome,
      totalExpense,
      balance: currentBalance,
      transactionCount: transactions.length,
    });
    
    summaryCalculatedRef.current = true;
  }, [account, transactions]);

  const loadInitialData = useCallback(async () => {
    if (isLoadingRef.current || isInitializedRef.current || fetchLockRef.current) {
      return;
    }
    
    if (!isAuthenticated()) {
      navigateTo('/login');
      return;
    }
    
    fetchLockRef.current = true;
    isLoadingRef.current = true;
    setLoading(true);
    
    try {
      await Promise.all([
        fetchCash(),
        fetchTypeTransactions(),
        fetchCategories()
      ]);
      
      const accountData = await fetchAccount();
      
      if (accountData) {
        await fetchTransactionsWithDetails();
      }
      
      isInitializedRef.current = true;
      
      summaryCalculatedRef.current = false;
    } catch (err) {
      console.error("Error cargando datos iniciales:", err);
      setError("Error cargando datos. Por favor, intenta más tarde.");
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
      fetchLockRef.current = false;
    }
  }, [fetchCash, fetchTypeTransactions, fetchCategories, fetchAccount, fetchTransactionsWithDetails, isAuthenticated, navigateTo]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      loadInitialData();
    }
  }, [loadInitialData]);

  useEffect(() => {
    if (isInitializedRef.current && account && transactions.length > 0 && !summaryCalculatedRef.current) {
      calculateSummary();
    }
  }, [account, transactions, calculateSummary]);

  const createAccount = async (accountData: Omit<Account, 'id' | 'created_at' | 'updated_at'>) => {
    if (fetchLockRef.current) return;
    fetchLockRef.current = true;
    setLoading(true);
    setError("");
    
    try {
      const response = await api.post("api/finanzas/account/", accountData);
      setAccount(response.data);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Error al crear la cuenta.";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
      fetchLockRef.current = false;
    }
  };

  const createTransaction = async (transactionData: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
    if (fetchLockRef.current) return;
    fetchLockRef.current = true;
    setLoading(true);
    setError("");
    
    try {
      if (!transactionData.fk_account) {
        throw new Error("Account ID is missing");
      }
      
      const response = await api.post("api/finanzas/transaction/", transactionData);
      
      await fetchAccount();
      
      const newTransaction = response.data;
      
      if (typeTransactionsCache.length === 0) {
        await fetchTypeTransactions();
      }
      
      const processedNewTransaction = processTransactions([newTransaction])[0];
      
      setTransactions(prevTransactions => [...prevTransactions, processedNewTransaction]);
      
      summaryCalculatedRef.current = false;
      
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      console.error("Transaction error details:", err);
      const errorMsg = err.response?.data?.error || "Error al crear la transacción.";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
      fetchLockRef.current = false;
    }
  };

  const formatCurrency = (amount: number, currency = "MXN") => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Función para recargar todos los datos (optimizada)
  const refreshAllData = useCallback(async () => {
    if (fetchLockRef.current) return;
    fetchLockRef.current = true;
    setLoading(true);
    
    try {
      await Promise.all([
        fetchCash(true),
        fetchTypeTransactions(true),
        fetchCategories(true)
      ]);
      
      await fetchAccount();
      await fetchTransactionsWithDetails();
      
      summaryCalculatedRef.current = false;
    } catch (err) {
      console.error("Error recargando datos:", err);
      setError("Error recargando datos. Por favor, intenta más tarde.");
    } finally {
      setLoading(false);
      fetchLockRef.current = false;
    }
  }, [fetchCash, fetchTypeTransactions, fetchCategories, fetchAccount, fetchTransactionsWithDetails]);

  return {
    cash,
    typeTransactions,
    categories,
    account,
    transactions,
    balanceHistory,
    summary,
    loading,
    error,
    success,
    fetchCash,
    fetchTypeTransactions,
    fetchCategories,
    fetchAccount,
    fetchTransactions: fetchTransactionsWithDetails,
    fetchBalanceHistory,
    createAccount,
    createTransaction,
    formatCurrency,
    formatDate,
    calculateSummary,
    refreshAllData
  };
};