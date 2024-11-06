import React from 'react';

const StyledBox = () => {
  return (
    <div style={styles.box}>
      {/* 여기에 콘텐츠 추가 가능 */}
    </div>
  );
};

const styles = {
  box: {
    width: '800px', // 적절한 크기로 조정
    height: '600px', // 적절한 크기로 조정
    backgroundColor: '#FFFFFF', // 흰색 배경
    borderRadius: '20px',
    border: '3px solid #254D64',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)', // 하단 그림자
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default StyledBox;
