import { Toaster } from "@/components/ui/toaster";
import { BillGenerator } from "@/components/BillGenerator";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<BillGenerator />} />
        </Routes>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;