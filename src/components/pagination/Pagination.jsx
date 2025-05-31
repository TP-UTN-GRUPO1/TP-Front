import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="custom-pagination">
      <div className="pagination-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <div
            key={page}
            className="pagination-item"
            onClick={() => onPageChange(page)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onPageChange(page);
              }
            }}
          >
            <div className="pagination-icon">
              <img src="/src/assets/img/ps1.png" alt={`Icono página ${page}`} />
            </div>
            <span
              className={`pagination-number ${
                currentPage === page ? "active" : ""
              }`}
            >
              {page}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
