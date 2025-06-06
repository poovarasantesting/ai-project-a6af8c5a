import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Printer } from "lucide-react";

interface BillItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface BillPreviewProps {
  customerName: string;
  billDate: string;
  billItems: BillItem[];
  total: number;
  onBack: () => void;
}

export default function BillPreview({ customerName, billDate, billItems, total, onBack }: BillPreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const billNumber = `BILL-${new Date().getTime().toString().slice(-6)}`;

  return (
    <div className="space-y-4 print:py-0">
      <div className="flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handlePrint} className="flex items-center gap-1">
          <Printer className="h-4 w-4" /> Print Bill
        </Button>
      </div>

      <Card className="print:shadow-none print:border-none">
        <CardHeader className="border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">INVOICE</CardTitle>
              <p className="text-sm text-gray-500">Bill #{billNumber}</p>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-xl">Your Company Name</h3>
              <p className="text-sm text-gray-500">123 Business Street</p>
              <p className="text-sm text-gray-500">City, State, ZIP</p>
              <p className="text-sm text-gray-500">contact@yourcompany.com</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Bill To:</h3>
              <p className="font-bold">{customerName}</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium text-gray-500 mb-1">Date:</h3>
              <p>{new Date(billDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium">
                    Total:
                  </td>
                  <td className="px-4 py-3 text-right text-lg font-bold">
                    ${total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="pt-4">
            <h3 className="font-medium text-gray-500 mb-2">Notes:</h3>
            <p className="text-sm text-gray-600">
              Thank you for your business! Payment is due within 30 days. Please make checks payable to Your Company Name or use the bank details provided.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t text-center text-gray-500 text-sm py-4 print:mt-12">
          <p className="w-full">This bill was generated with Simple Bill Generator</p>
        </CardFooter>
      </Card>
    </div>
  );
}