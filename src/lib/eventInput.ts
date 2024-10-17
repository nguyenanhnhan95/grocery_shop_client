import React from "react";

const exceptThisSymbols = ["e", "E", "+", "-", "."];
export const handleKeyDownNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
    exceptThisSymbols.includes(event.key) && event.preventDefault()
};
