import React, { useState, useEffect } from "react";
import quotesData from "./quotes.json";

const QuoteDisplay = () => {
    const [currentQuote, setCurrentQuote] = useState(() => {
        const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
        return quotesData.quotes[randomIndex];
    });
    const [loading, setLoading] = useState(false);
    const [bgColor, setBgColor] = useState(generateRandomColor());

    const getRandomQuote = () => {
        setLoading(true);
        setTimeout(() => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * quotesData.quotes.length);
            } while (quotesData.quotes[newIndex].q === currentQuote.q);
            setCurrentQuote(quotesData.quotes[newIndex]);
            setLoading(false);
        }, 300);
    };

    // Generate a random RGB color
    function generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Change background color every 10 seconds
    useEffect(() => {
        const bgTimer = setInterval(() => {
            setBgColor(generateRandomColor());
        }, 10000); // 10 seconds

        return () => clearInterval(bgTimer);
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen text-center p-6 transition-all duration-1000"
            style={{
                backgroundColor: bgColor,
                transition: "background-color 0.5s ease",
            }}
        >
            <div className="bg-white shadow-xl rounded-3xl p-8 max-w-lg w-full transition-all duration-500 ease-in-out opacity-90 backdrop-blur-md">
                {loading ? (
                    <div className="flex justify-center items-center space-x-2 animate-pulse">
                        <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full delay-100"></div>
                        <div className="w-4 h-4 bg-blue-900 rounded-full delay-200"></div>
                    </div>
                ) : (
                    <div className="fade-in">
                        <p className="text-3xl sm:text-2xl md:text-3xl font-semibold text-black mb-4">
                            "{currentQuote.q}"
                        </p>
                        <p className="text-2xl text-indigo-900 mb-2 font-semibold">{currentQuote.a}</p>
                        <p className="text-xl text-red-900 mb-6">Source: {currentQuote.source}</p>
                        <button
                            onClick={getRandomQuote}
                            disabled={loading}
                            className={`px-6 py-2 bg-blue-500 text-white font-bold rounded-full shadow-md transform transition duration-300
                                ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-900 active:bg-black hover:scale-105"}`}
                        >
                            {loading ? "Loading..." : "Show Another Quote"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteDisplay;
