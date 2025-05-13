import { CURRENCY_FLAGS } from "../../utils/constants"; 
import { formatNumber } from "../../utils/utils";
import React from "react";
import type Conversion from "../../types/conversion";

export default function Result({ result }: { result: Conversion }) {
    return (
        <div className="result-container">
            <h2>Résultat</h2>
            <div className="result-display">
                <div className="currency-amount">
                    <span className="currency-flag">{CURRENCY_FLAGS[result.from]}</span>
                    <span>{formatNumber(result.amount)} {result.from}</span>
                </div>
                <div className="equal-sign">=</div>
                <div className="currency-amount result">
                    <span className="currency-flag">{CURRENCY_FLAGS[result.to]}</span>
                    <span className="result-value">{formatNumber(result.result)} {result.to}</span>
                </div>
            </div>
        </div>
    )
}