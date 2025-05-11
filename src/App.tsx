import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/Not-Found";
import TrackingPage from "./pages/Tracking-Vehicle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TrackingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
