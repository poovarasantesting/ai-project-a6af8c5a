import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2 } from "lucide-react";
import BillPreview from "@/components/BillPreview";

interface BillItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export default function BillGenerator() {
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [billDate, setBillDate] = useState(new Date().toISOString().split("T")[0]);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const addBillItem = () => {
    const newItem: BillItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      price: 0,
    };
    setBillItems([...billItems, newItem]);
  };

  const updateBillItem = (id: string, field: keyof BillItem, value: string | number) => {
    setBillItems(
      billItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeBillItem = (id: string) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return billItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const generateBill = () => {
    if (!customerName) {
      toast({
        title: "Missing information",
        description: "Please enter customer name",
        variant: "destructive",
      });
      return;
    }

    if (billItems.length === 0) {
      toast({
        title: "Missing items",
        description: "Please add at least one item to the bill",
        variant: "destructive",
      });
      return;
    }

    // Check if all bill items have descriptions and valid prices
    const invalidItems = billItems.filter(
      (item) => !item.description || item.price <= 0 || item.quantity <= 0
    );
    
    if (invalidItems.length > 0) {
      toast({
        title: "Invalid items",
        description: "All items must have a description, quantity, and price",
        variant: "destructive",
      });
      return;
    }

    setShowPreview(true);
    toast({
      title: "Bill generated",
      description: "Your bill has been generated successfully!",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Simple Bill Generator</h1>
      
      {!showPreview ? (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Create New Bill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billDate">Bill Date</Label>
                <Input
                  id="billDate"
                  type="date"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Bill Items</h3>
                <Button 
                  onClick={addBillItem}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Item
                </Button>
              </div>

              {billItems.length === 0 && (
                <p className="text-center py-4 text-gray-500">
                  No items added yet. Click "Add Item" to start.
                </p>
              )}

              {billItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md">
                  <div className="col-span-12 md:col-span-5 space-y-1">
                    <Label htmlFor={`desc-${item.id}`}>Description</Label>
                    <Input
                      id={`desc-${item.id}`}
                      value={item.description}
                      onChange={(e) => updateBillItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2 space-y-1">
                    <Label htmlFor={`qty-${item.id}`}>Qty</Label>
                    <Input
                      id={`qty-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateBillItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3 space-y-1">
                    <Label htmlFor={`price-${item.id}`}>Price</Label>
                    <Input
                      id={`price-${item.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateBillItem(item.id, "price", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-2 flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBillItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {billItems.length > 0 && (
                <div className="flex justify-end pt-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setBillItems([]);
              setCustomerName("");
              setBillDate(new Date().toISOString().split("T")[0]);
              toast({ title: "Form cleared" });
            }}>
              Clear
            </Button>
            <Button onClick={generateBill}>Generate Bill</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="max-w-3xl mx-auto">
          <BillPreview 
            customerName={customerName}
            billDate={billDate}
            billItems={billItems}
            total={calculateTotal()}
            onBack={() => setShowPreview(false)}
          />
        </div>
      )}
    </div>
  );
}