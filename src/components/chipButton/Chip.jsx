import PropTypes from "prop-types";

function Chip({ isSelected, onClick }) {
  return (
    <div
      className={`px-4 py-2 rounded-full font-bold cursor-pointer border-2 transition-colors duration-200
        ${
          isSelected
            ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
            : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
        }
      `}
      onClick={onClick}
    >
      {isSelected ? "✔ 겹치는 부분 표시" : "✔ 안겹치는 부분 표시"}
    </div>
  );
}

Chip.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Chip;
