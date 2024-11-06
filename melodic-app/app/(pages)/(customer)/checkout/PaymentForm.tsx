import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from "@/app/interface";

interface PaymentFormProps {
  formData: FormData;
  onRadioChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const PaymentForm = ({ formData, onRadioChange, onSubmit, onBack }: PaymentFormProps) => (
  <form onSubmit={onSubmit} className="space-y-8">
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Phương thức vận chuyển</h2>
      <RadioGroup
        value={formData.deliveryMethod}
        onValueChange={(value) => onRadioChange("deliveryMethod", value)}
        className="space-y-2"
      >
        <div className="flex items-center justify-between border p-4 rounded-md">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="home" id="home" />
            <Label htmlFor="home">Giao hàng tận nơi</Label>
          </div>
          <span>30,000đ</span>
        </div>
      </RadioGroup>
    </Card>

    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
      <RadioGroup
        value={formData.paymentMethod}
        onValueChange={(value) => onRadioChange("paymentMethod", value)}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod">Thanh toán khi giao hàng (COD)</Label>
        </div>
        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="bank" id="bank" />
          <Label htmlFor="bank">Chuyển khoản qua ngân hàng</Label>
        </div>
      </RadioGroup>
    </Card>

    <div className="flex justify-end space-x-4">
      <Button type="button" variant="outline" onClick={onBack}>
        Quay lại
      </Button>
      <Button type="submit" className="bg-cart-primary hover:bg-cart-primary/90">
        Hoàn tất đơn hàng
      </Button>
    </div>
  </form>
);

export default PaymentForm;