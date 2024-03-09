import { TextField } from "@mui/material";
import React from "react";

type SearchPostsProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchPosts = ({ searchTerm, setSearchTerm }: SearchPostsProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <TextField
      label="Search Posts"
      variant="outlined"
      value={searchTerm}
      fullWidth
      onChange={handleSearchChange}
      style={{ marginBottom: "20px" }}
    />
  );
};

export default SearchPosts;
