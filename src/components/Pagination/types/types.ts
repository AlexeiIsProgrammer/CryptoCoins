type PaginationProps = {
  page: number;
  itemsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default PaginationProps;
