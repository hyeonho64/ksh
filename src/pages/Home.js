import '../css/Home.css';

const Home = () => {
    return (
        <div className="wrapper">
            <div className="navbar">
                <span>홈</span>
            </div>
            <div className="content">
                <button style={{border: "1px solid gray", backgroundColor: "white", padding: 10}}>
                    시작하기
                </button>
            </div>
        </div>
    );
};

export default Home;