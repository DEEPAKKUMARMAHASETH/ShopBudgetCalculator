import React, { useState } from "react";
import './Form.css';
const ClothingForm = () => {
    const [budget, setBudget] = useState("");
    const [combinations, setCombinations] = useState([]);
    const [tshirtPrice, setTshirtPrice] = useState([]);
    const [jeansPrice, setJeansPrice] = useState([]);
    const [jacketPrice, setJacketsPrice] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        generateCombinations();
    };
    const generateCombinations = () => {
        const minPrice = Math.min(tshirtPrice, Math.min(jeansPrice, jacketPrice));
        const comb = [];
        for (let tshirts = 1; tshirts * tshirtPrice <= budget; tshirts++) {
            for (let jeans = 1; jeans * jeansPrice <= budget - tshirts * tshirtPrice; jeans++) {
                let remainingBudget = budget - (tshirts * tshirtPrice + jeans * jeansPrice);
                if (remainingBudget >= jacketPrice) {
                    let jackets = Math.floor(remainingBudget / jacketPrice);
                    let totalPrice = (tshirts * tshirtPrice + jeans * jeansPrice + jackets * jacketPrice);
                    if (budget - totalPrice < minPrice) {
                        comb.push({ tshirts, jeans, jackets, leftovermoney: budget - totalPrice, totalPrice });
                    }
                }
            }
        }
        setCombinations(comb);
    };

    return (
        <div className="main">
            <div className="shop-list">
                <form onSubmit={handleSubmit}>
                    <div className="prodcuts">
                        <div className="input">
                            <h2>T-shirt</h2>
                            <input id="tshirt"
                            type="text"
                            placeholder="Enter price"
                            value={tshirtPrice}
                            onChange={(e) => setTshirtPrice(e.target.value)}
                        />
                        </div>
                        <div className="input">
                            <h2>Jeans</h2>
                            <input  id="jeans"
                            type="text"
                            placeholder="Enter price"
                            value={jeansPrice}
                            onChange={(e) => setJeansPrice(e.target.value)}
                        />
                        </div>
                        <div className="input">
                            <h2>Jackets</h2>
                            <input  id="jackets"
                            type="text"
                            placeholder="Enter price"
                            value={jacketPrice}
                            onChange={(e) => setJacketsPrice(e.target.value)}
                        />
                        </div>
                    </div>
                    <div className="input">
                        <h1>Enter your Budget</h1>
                        <input
                            type="text"
                            id="budget"
                            placeholder="Enter your budget"
                            value={budget} required
                            onChange={(e) => setBudget(e.target.value)}
                        />
                    </div>
                    <div className="generate">
                        <h1>Generate Combinations</h1>
                        <button type="submit">Generate</button>
                    </div>
                </form>
            </div>
            <div className="output">
                <h1>All Possible Combinations</h1>
                <div className="scrollable-div">
                { budget < 230 ? <p>Possible Commbination : 0</p> : combinations.map((combination, index) =>
                    <p style={{color:"#001524"}} key={index}>{`Tshirts: ${combination.tshirts},  Jeans: ${combination.jeans}, Jackets: ${combination.jackets}, Balance: ${combination.leftovermoney},  TotalPrice:${combination.totalPrice} `}</p>)
                }
                </div>
            <div className="total">
                <p>{`Total Combination: ${combinations.length}`}</p>
            </div>
            </div>
        </div>
    );
};

export default ClothingForm;
