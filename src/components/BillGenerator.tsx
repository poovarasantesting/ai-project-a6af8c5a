import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";

type BillItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export function BillGenerator() {
  const [items, setItems] = useState<BillItem[]>([]);
  const [companyName, setCompanyName] = useState("My Company");
  const [billDate, setBillDate] = useState(new Date().toISOString().split("T")[0]);
  const [billNumber, setBillNumber] = useState("BL-" + Math.floor(1000 + Math.random() * 9000));
  const { toast } = useToast();

  const addItem = () => {
    const newItem: BillItem = {
      id: uuidv4(),
      name: "",
      quantity: 1,
      price: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof BillItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const generatePdf = () => {
    // In a real app, this would generate a PDF
    toast({
      title: "Bill Generated",
      description: "Your bill has been generated and is ready for download.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Bill Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billNumber">Bill Number</Label>
                <Input
                  id="billNumber"
                  value={billNumber}
                  onChange={(e) => setBillNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Items</h3>
              <Button onClick={addItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No items added. Click "Add Item" to start.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 font-medium text-sm border-b pb-2">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-3">Price</div>
                  <div className="col-span-1">Total</div>
                  <div className="col-span-1"></div>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5">
                      <Input
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, "quantity", parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(item.id, "price", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="col-span-1 font-medium">
                      {formatCurrency(item.quantity * item.price)}
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>{formatCurrency(calculateTax())}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setItems([])}>
            Clear All
          </Button>
          <Button onClick={generatePdf}>Generate Bill</Button>
        </CardFooter>
      </Card>
    </div>
  );
}