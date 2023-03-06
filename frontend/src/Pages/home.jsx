import Dashboard from '../Components/Dashboard/index.jsx';

function Home() {
    const UserName = "Teste"

    return (
        <>
            <h1>Olá {UserName}</h1>
            <Dashboard />
        </>
    );
}

export default Home;
