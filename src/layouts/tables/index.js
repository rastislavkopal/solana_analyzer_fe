// @mui material components
import Card from "@mui/material/Card";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CollectionsNavbar from "examples/Navbars/CollectionsNavbar";

import Footer from "examples/Footer";
import Table from "examples/Tables/sortableTable/collectionsTable";


// Data
import collectionsTableData from "layouts/tables/data/collectionsTableData";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Tables() {
  const { columns, rows } = collectionsTableData();

  return (
    <DashboardLayout>
      <CollectionsNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Collections
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
              { rows.length == 0 && 
                <Box sx={{ display: 'flex', width: "100%" }}>
                  <CircularProgress sx={{ margin: 'auto' }} />
                </Box>
              }
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}
