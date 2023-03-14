import Dashboard from '../../Components/Dashboard/index.jsx';

function Home() {
    const UserName = sessionStorage.getItem('userName');

    return (
        <>
            <h1 className='username-dashboard'>Olá {UserName}</h1>
            <Dashboard />
        </>
    );
}

export default Home;
