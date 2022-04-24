import { useMemo, useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from '@mui/material/TableHead';

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiAvatar from "components/VuiAvatar";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

export default function Table({ columns, rows }) {
  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;
  const [selectedOrderBy, setSelectedOrderBy] = useState("collection");
  const [selectedOrder, setSelectedOrder] = useState('asc');

  const [tableRows, setTableRows] = useState([]);

  useEffect(()=>{
  }, [selectedOrder, selectedOrderBy]);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
 

  const renderColumns = columns.map(({ name, align, width }, key) => {

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setSelectedOrder(isAsc ? 'desc' : 'asc');
      setSelectedOrderBy(property);
    };

    // const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      console.log(property);
      handleRequestSort(event, property);
    };

    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    let orderBy = 'asc';

    return (
      <VuiBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="text"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        <TableSortLabel
          active={orderBy === name}
          direction={orderBy === name ? order : 'asc'}
          onClick={createSortHandler(name)}
        >
          {name.toUpperCase()}
          {/* {name.toUpperCase()}
          {orderBy === name ? (
            <VuiBox component="span">
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </VuiBox>
          ) : null} */}
        </TableSortLabel>

        
      </VuiBox>
    );
  });

  const renderRows = rows.sort((a,b) => {
    // console.log(a.collection.props.name)
    return  a.collection.props.name.localeCompare(b.collection.props.name, 'en', { sensitivity: 'base' });
  }).map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <VuiBox display="flex" alignItems="center" py={0.5} px={1}>
              <VuiBox mr={2}>
                <VuiAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </VuiBox>
              <VuiTypography
                color="white"
                variant="button"
                fontWeight="medium"
                sx={{ width: "max-content" }}
              >
                {row[name][1]}
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        );
      } else {
        template = (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${grey[700]}` : null}
          >
            <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </VuiTypography>
          </VuiBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <VuiBox component="thead">
              <TableRow>{renderColumns}</TableRow>
          </VuiBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable> 
      </TableContainer>
    ),
    [columns, rows]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};
