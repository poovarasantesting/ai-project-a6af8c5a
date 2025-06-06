import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BillGenerator from "@/pages/BillGenerator";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<BillGenerator />} />
        </Routes>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;