import { CURRENCY_FLAGS } from "../../utils/constants";
import type Conversion from "../../types/conversion";
import React from "react";
import { formatNumber } from "../../utils/utils";

export default function History({ history }: { history: Conversion[] }) {
    return (
        <div className="history-container">
            <h3>Conversions récentes</h3>
            <ul className="conversion-history">
                {history.map((item) => (
                    <li key={`${item.from}-${item.to}-${item.amount}-${item.timestamp}`} className="history-item">
                        <div className="history-flags">
                            <span className="currency-flag">{CURRENCY_FLAGS[item.from]}</span>
                            <span className="history-arrow">→</span>
                            <span className="currency-flag">{CURRENCY_FLAGS[item.to]}</span>
                        </div>
                        <div className="history-values">
                            <span>{formatNumber(item.amount)} {item.from}</span>
                            <span>→</span>
                            <span>{formatNumber(item.result)} {item.to}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}