const NotFound = () => {
    return (
        <div
            style={{
                padding: 30
            }}>
            <div style={{
                fontWeight: 'bold',
                fontSize: 44
            }}>
                404 오류
            </div>
            <br/>
            오류가 났네요. 걱정마세요, 우리 프로그래밍 동아리 똑똑이들이 눈 깜짝할 사이에 고칠 수 있으니까요. 아래 버튼 하나로 해결 가능합니다.
            <br/>
            <br/>
            <a href="/">
                <button
                    style={{
                        backgroundColor: "white",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        padding: "7px",
                        fontWeight: "bold"
                    }}>새로고침
                </button>
            </a>
        </div>
    );
};

export default NotFound;