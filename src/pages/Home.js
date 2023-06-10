import '../css/Home.css';

const Home = () => {
    return (
        <div className="wrapper">
            <div className="navbar">
                <span>홈</span>
            </div>
            <p className="wrap" align="middle">
            <div className="content">
                <img src="./ksh_transparent.png" alt="ksh icon" />
                <div className="hero">
                    <span style={{fontSize: 60, fontFamily: "SUITE-Regular"}}>Kojan Shooting Game</span>
                </div>
                <a href="/Game">
                <button style={{border: "1px solid gray", fontFamily: "SUIT-Regular", backgroundColor: "white", padding: 20, fontSize: 20 , borderRadius: 5}}>
                    시작하기
                </button>
                </a>
            </div>
            </p>
        </div>
    );
};

export default Home;