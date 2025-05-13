import React, { useState } from "react";
import { EXCHANGE_RATES, CURRENCY_NAMES, CURRENCY_FLAGS } from "../../utils/constants";
import type Conversion from "../../types/conversion";

export default function ConversionForm({ 
    setHistory,
    setResult,
    setError,
    error,
    history
}:{ 
    setHistory: (history: Conversion[]) => void,
    setResult: (result: Conversion | null) => void,
    setError: (error: string) => void,
    error: string,
    result: Conversion | null,
    history: Conversion[]
}) {
    // States to handle the form inputs
    const [amount, setAmount] = useState<string>('');
    const [fromCurrency, setFromCurrency] = useState<string>('EUR');
    const [toCurrency, setToCurrency] = useState<string>('USD');

    // Handle key down event
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleConversion();
        }
    };

    // Handle amount change
    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Only allow numbers and up to 2 decimal places
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            setAmount(value);
            if (error) setError('');
        }
    };

    // Handle clear amount
    const handleClearAmount = () => {
        setAmount('');
        if (error) setError('');
    };

    // Handle swap currencies
    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Handle conversion
    const handleConversion = () => {
        if (!amount) {
            setError('Veuillez entrer un montant');
            setResult(null);
            return;
        }

        if (Number.isNaN(Number(amount))) {
            setError('Veuillez entrer un montant valide');
            setResult(null);
            return;
        }

        if (Number(amount) <= 0) {
            setError('Le montant doit être supérieur à zéro');
            setResult(null);
            return;
        }

        setError('');

        const amountInEUR = Number(amount) / EXCHANGE_RATES[fromCurrency];
        const convertedAmount = amountInEUR * EXCHANGE_RATES[toCurrency];

        const resultData: Conversion = {
            amount: Number(Number(amount).toFixed(2)),
            from: fromCurrency,
            to: toCurrency,
            result: Number(convertedAmount.toFixed(2)),
            timestamp: Date.now()
        };

        // Update history and result
        setHistory([resultData, ...history]);
        setResult(resultData);
    };

    return (
        <div>
            <div className="input-group amount-input-group">
                <label htmlFor="amount">Montant</label>
                <div className="input-with-button">
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Entrez un montant"
                    />
                    {amount && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={handleClearAmount}
                            aria-label="Effacer"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>

            <div className="currency-exchange">
                <div className="input-group">
                    <label htmlFor="fromCurrency">De</label>
                    <div className="select-with-flag">
                        <span className="currency-flag">{CURRENCY_FLAGS[fromCurrency]}</span>
                        <select
                            id="fromCurrency"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {Object.keys(EXCHANGE_RATES).map(currency => (
                                <option key={`from-${currency}`} value={currency}>
                                    {currency} - {CURRENCY_NAMES[currency]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="button"
                    className="swap-button"
                    onClick={handleSwapCurrencies}
                    aria-label="Intervertir les devises"
                >
                    ⇄
                </button>

                <div className="input-group">
                    <label htmlFor="toCurrency">À</label>
                    <div className="select-with-flag">
                        <span className="currency-flag">{CURRENCY_FLAGS[toCurrency]}</span>
                        <select
                            id="toCurrency"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {Object.keys(EXCHANGE_RATES).map(currency => (
                                <option key={`to-${currency}`} value={currency}>
                                    {currency} - {CURRENCY_NAMES[currency]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="convert-button"
                onClick={handleConversion}
            >
                Convertir
            </button>
        </div>
    )
}