const StyledBox = ({ children, style }) => {
  return (
    <div style={{ ...styles.box, ...style }}>
      {children} {/* 콘텐츠 추가 가능 */}
    </div>
  );
};

const styles = {
  box: {
    width: '100%', // 부모 요소에 따라 크기가 조정되도록
    maxWidth: '400px', // 최대 너비 설정
    height: 'auto', // 높이 자동 조정
    padding: '16px', // 내부 여백 추가
    backgroundColor: '#FFFFFF', // 흰색 배경
    borderRadius: '10px',
    border: '2px solid #254D64',
    boxShadow: '0px 4px 0px #2d4856', // 하단 그림자
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default StyledBox;
