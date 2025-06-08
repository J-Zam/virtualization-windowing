import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import RowList from "./components/virtualized-items/row/products/RowList";
import GridList from "./components/virtualized-items/grid/GridList";
import Sales from "./components/virtualized-items/row/sales/Sales";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
     <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/row-list" element={<RowList/>} />
      <Route path="/grid-list" element={<GridList/>} />
      <Route path="/sales" element={<Sales/>} />
     </Routes>
    </QueryClientProvider>
  );
}

export default App;
