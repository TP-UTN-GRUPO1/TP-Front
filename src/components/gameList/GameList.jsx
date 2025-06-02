import Cards from "../cards/Cards";
import CustomPagination from "../pagination/Pagination";

const GameList = ({
  games,
  currentGames,
  currentPage,
  gamesPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(games.length / gamesPerPage);

  return (
    <>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Cards games={currentGames} />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default GameList;
