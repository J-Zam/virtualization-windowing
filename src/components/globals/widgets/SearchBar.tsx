import { ReactNode, Dispatch, SetStateAction } from "react";
import { TextField, Grid } from "@mui/material";
import { FaSearch } from "react-icons/fa";

interface IProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
  fullWidth?: boolean;
}

const SearchBar = ({ filter, setFilter, children, fullWidth }: IProps) => {

  return (
    <Grid container spacing={1} className={`${fullWidth ? 'tw-justify-end' : 'md:tw-flex tw-justify-between'}`}>
      <Grid item xs={fullWidth ? 12 : 6} sm={fullWidth ? 12 : 4} md={4} >
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          size={"small"}
          value={filter}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'grey',
                borderWidth: 2, // Increased border width
                borderRadius: '5px',
              },
            },
          }}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <FaSearch style={{ marginRight: '8px', color: 'grey' }} />
            ),
          }}
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          fullWidth={true}
        />
      </Grid>

      {children && (
        <Grid item xs={6} sm={3} xl={4} className="tw-flex tw-justify-end">{children}</Grid>
      )}
    </Grid>
  );
};

export default SearchBar;
