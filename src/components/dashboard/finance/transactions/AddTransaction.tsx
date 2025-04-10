"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useFinance } from "@/hook/useFinance";
import { Mini_alert } from "@/components/alerts/Mini-alert";

const AddTransaction: React.FC = () => {
  const {
    categories,
    typeTransactions,
    account,
    createTransaction,
    loading,
    error,
    success,
    fetchAccount,
  } = useFinance();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    concept: "",
    amount: 0,
    fk_type_transaction: 0,
    fk_account: null as number | null,
    fk_category: 0,
  });

  const [accountLoaded, setAccountLoaded] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    { field: string; message: string }[]
  >([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccessAlert(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        setShowSuccessAlert(false);
        setFormData({
          concept: "",
          amount: 0,
          fk_type_transaction: typeTransactions[0]?.id || 0,
          fk_account: account?.id || null,
          fk_category: categories[0]?.id || 0,
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, account?.id, categories, typeTransactions]);

  useEffect(() => {
    if (typeTransactions.length > 0 && formData.fk_type_transaction === 0) {
      const defaultType = typeTransactions.find(t => t.id)?.id || 0;
      setFormData(prev => ({
        ...prev,
        fk_type_transaction: defaultType
      }));
    }
  }, [typeTransactions]);

  useEffect(() => {
    if (categories.length > 0 && formData.fk_category === 0) {
      const defaultCategory = categories.find(c => c.id)?.id || 0;
      setFormData(prev => ({
        ...prev,
        fk_category: defaultCategory
      }));
      setCategoriesLoaded(true);
    }
  }, [categories]);

  useEffect(() => {
    if (account) {
      setFormData(prev => ({
        ...prev,
        fk_account: account.id || null
      }));
      setAccountLoaded(true);
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = [];
    if (!formData.concept.trim()) errors.push({ field: "concept", message: "Concepto requerido" });
    if (formData.amount <= 0) errors.push({ field: "amount", message: "Monto debe ser > 0" });
    if (!formData.fk_account) errors.push({ field: "account", message: "Cuenta no válida" });
    if (!formData.fk_type_transaction) errors.push({ field: "fk_type_transaction", message: "Seleccione tipo" });
    if (!formData.fk_category) errors.push({ field: "fk_category", message: "Seleccione categoría" });

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await createTransaction({
        concept: formData.concept,
        amount: formData.amount,
        fk_type_transaction: formData.fk_type_transaction,
        fk_account: formData.fk_account as number,
        fk_category: formData.fk_category
      });
    } catch (err) {
      console.error("Error creating transaction:", err);
    }
  };

  const safeParseInt = (value: string): number => {
    const parsed = parseInt(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const generateSafeKey = (prefix: string, id: number | undefined, index: number) => {
    return id ? `${prefix}-${id}` : `${prefix}-fallback-${index}`;
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
      >
        <FaPlus className="mr-2" />
        Nueva Transacción
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">
                Agregar Transacción
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400">
                <FaTimes />
              </button>
            </div>

            {error && <Mini_alert type="error" message={error} />}

            {showSuccessAlert && (
              <div className="mb-4">
                <Mini_alert type="success" message="Transacción realizada con éxito" />
              </div>
            )}

            {validationErrors.length > 0 && (
              <div className="mb-4 space-y-2">
                {validationErrors.map((err, index) => (
                  <Mini_alert
                    key={`error-${index}-${err.field}`}
                    type={err.field === "account" ? "error" : "warning"}
                    message={err.message}
                  />
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 dark:text-white">Concepto</label>
                <input
                  type="text"
                  name="concept"
                  value={formData.concept}
                  onChange={(e) => setFormData({...formData, concept: e.target.value})}
                  className={`w-full p-2 border rounded ${
                    validationErrors.some(err => err.field === "concept") ? "border-red-500" : ""
                  }`}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 dark:text-white">Monto</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                  className={`w-full p-2 border rounded ${
                    validationErrors.some(err => err.field === "amount") ? "border-red-500" : ""
                  }`}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 dark:text-white">Tipo</label>
                <select
                  name="fk_type_transaction"
                  value={formData.fk_type_transaction || ""}
                  onChange={(e) => setFormData({...formData, fk_type_transaction: safeParseInt(e.target.value)})}
                  className={`w-full p-2 border rounded ${
                    validationErrors.some(err => err.field === "fk_type_transaction") ? "border-red-500" : ""
                  }`}
                  disabled={typeTransactions.length === 0}
                >
                  {typeTransactions.length > 0 ? (
                    <>
                      <option value="" disabled>
                        Seleccione un tipo
                      </option>
                      {typeTransactions.map((type, index) => (
                        <option key={generateSafeKey("type", type.id, index)} value={type.id || ""}>
                          {type.name} ({type.is_income ? "Ingreso" : "Gasto"})
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="" disabled>
                      Cargando tipos...
                    </option>
                  )}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 dark:text-white">Categoría</label>
                <select
                  name="fk_category"
                  value={formData.fk_category || ""}
                  onChange={(e) => setFormData({...formData, fk_category: safeParseInt(e.target.value)})}
                  className={`w-full p-2 border rounded ${
                    validationErrors.some(err => err.field === "fk_category") ? "border-red-500" : ""
                  }`}
                  disabled={categories.length === 0}
                >
                  {categories.length > 0 ? (
                    <>
                      <option value="" disabled>
                        Seleccione una categoría
                      </option>
                      {categories.map((category, index) => (
                        <option key={generateSafeKey("category", category.id, index)} value={category.id || ""}>
                          {category.name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="" disabled>
                      Cargando categorías...
                    </option>
                  )}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.fk_account}
                className={`${
                  loading || !formData.fk_account
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white py-2 px-4 rounded w-full`}
              >
                {loading ? "Procesando..." : "Guardar Transacción"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;