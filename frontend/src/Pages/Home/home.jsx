import Dashboard from '../../Components/Dashboard/index.jsx';

function Home() {
    const UserName = "Teste"

    return (
        <>
            <h1 className='username-dashboard'>Olá {UserName}</h1>
            <Dashboard />
        </>
    );
}

export default Home;
