import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import '../style.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Index({ isOpen, dataRevenue }) {
    const [modalIsopen, setIsopen] = useState(isOpen);
    const [monthlyAmount, setMonthlyAmount] = useState(dataRevenue.monthlyAmount);
    const [extraIncome, setExtraIncome] = useState(dataRevenue.extraIncome);
    const userId = sessionStorage.getItem('userId');

    console.log(dataRevenue.monthlyAmount)
    console.log(dataRevenue.extraIncome)

    function closeModal() {
        setIsopen(false);
    }

    async function handleSubmit(e) {
        e.preventDefault(); // Evita que o formulario envie o dado e recarregue a página

        const revenueData = {
            "codUser": userId,
            "monthlyAmount": monthlyAmount,
            "extraIncome": extraIncome,
            "idRevenue" : dataRevenue.revenueId,
        }

        const { data } = await axios.put('http://localhost:3333/revenue', revenueData);
        alert(data.message);
        window.location.reload(true);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsopen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <h2>Atualização de Receita</h2>
                <form className="d-flex flex-column justify-content-center justify-content-center form-modal">
                    <input
                        id="monthlyAmount"
                        type="text"
                        placeholder="Renda Mensal"
                        value={monthlyAmount}
                        onChange={({ target }) => setMonthlyAmount(target.value)} />
                    <input
                        id="extraIncome"
                        type="text"
                        placeholder="Renda Extra"
                        value={extraIncome}
                        onChange={({ target }) => setExtraIncome(target.value)} />
                    <button type="submit" name="action" onClick={handleSubmit}>Atualizar</button>
                    <button onClick={() => { window.location.reload(true) }}>Cancelar</button>
                </form >
            </Modal >
        </div >
    )
}

export default Index;