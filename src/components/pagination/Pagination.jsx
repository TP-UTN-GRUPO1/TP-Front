import React from 'react';
import './Pagination.css'; // Archivo CSS para los estilos

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="custom-pagination">
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div key={page} className="pagination-item">
                <div className="pagination-icon">
                  <img src="/src/assets/img/ps1.png" alt="PS1 Icon" />
                </div>
                <button
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    };
    

export default Pagination;
