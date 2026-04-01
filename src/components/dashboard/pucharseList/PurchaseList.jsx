import { useState, useEffect } from "react";
import Pagination from "../../pagination/Pagination";

const PurchaseList = ({ orders, games, translate, formatDate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    const currentOrders = orders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [orders]);

    if (orders.length === 0) {
        return <p className="ph-message">{translate("No_pucharse")}</p>;
    }

    return (
        <>
            <div className="dashboard-pagination">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                {currentOrders.map((order) => (
                    <div key={order.orderId || order.id} className="ph-order-card">
                        <p>
                            <strong>{translate("Date")}:</strong>{" "}
                            {formatDate(order.createdAt || order.date || order.orderDate)}
                        </p>

                        <p>
                            <strong>Total:</strong>{" "}
                            <span className="ph-total">
                                ${(order.totalAmount || order.total || 0).toFixed(2)}
                            </span>
                        </p>

                        <h4 className="ph-games-title">{translate("Games")}:</h4>

                        <ul className="ph-items-list">
                            {(order.orderItems || order.items || []).map((item, idx) => {
                                const gameId =
                                    item.gameId || item.game_id || item.game?.id;

                                const fetchedGame = games[gameId] || {};
                                const game = item.game || fetchedGame;

                                const gameName =
                                    game.nameGame || game.title || game.name || "Juego";

                                const gameImg =
                                    game.imageURL || game.imageUrl || "";

                                return (
                                    <li
                                        key={
                                            item.order_item_id ||
                                            item.orderItemId ||
                                            item.id ||
                                            idx
                                        }
                                        className="ph-item"
                                    >
                                        {gameImg && (
                                            <img
                                                src={gameImg}
                                                alt={gameName}
                                                className="ph-item-img"
                                            />
                                        )}

                                        <div className="ph-item-info">
                                            <span className="ph-item-name">
                                                {gameName}
                                            </span>

                                            <span className="ph-item-detail">
                                                {translate("Amount")}: {item.quantity} &middot;{" "}
                                                {translate("Price_unit")}: $
                                                {(item.unitPrice || item.price || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default PurchaseList;