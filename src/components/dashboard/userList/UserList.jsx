import { useState, useEffect } from "react";
import Pagination from "../../pagination/Pagination";

const UserList = ({
    users,
    getRoleName,
    getRoleId,
    onChangeRole,
    onDelete,
    onViewPurchases,
    translate,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const totalPages = Math.ceil(users.length / usersPerPage);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
        setCurrentPage(1);
    }, [users]);

    return (
        <>
            <div className="dashboard-pagination">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                <ul className="userList">
                    {currentUsers.map((user) => (
                        <li key={user.id}>
                            <span>
                                {user.name} | {user.email} | {translate("Role")}:{" "}
                                {getRoleName(user) || translate("No_role")}
                            </span>

                            <select
                                onChange={(e) => onChangeRole(user.id, e.target.value)}
                                value={getRoleId(user)}
                            >
                                <option value={3}>{translate("User")}</option>
                                <option value={2}>Admin</option>
                                <option value={1}>Sysadmin</option>
                            </select>

                            <button onClick={() => onDelete(user.id)}>
                                {translate("Delete")}
                            </button>

                            <button
                                onClick={() => onViewPurchases(user.id, user.email)}
                            >
                                {translate("See_Pucharse")}
                            </button>
                        </li>
                    ))}
                </ul>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default UserList;