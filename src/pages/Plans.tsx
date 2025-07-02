import { useEffect, useState } from "react";
import { usePlans } from "@/helper/plansHook";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const Plans = () => {
  const { plans, loading, error } = usePlans();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const handlePayment = (planId: string) => {
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: planId,
            quantity: 1,
          },
        ],
        customData: {
          user_id: user!.id,
        },
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Paddle) {
      window.Paddle.Environment.set("sandbox");
      window.Paddle.Initialize({
        token: import.meta.env.VITE_PADDLE_TOKEN,

        eventCallback: function (event: any) {
          console.log(event);
        },
      });
    }
  }, []);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  if (loading)
    return <div className="p-6 text-center">جاري تحميل النقاط...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500 text-center">حدث خطأ أثناء التحميل</div>
    );

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg border text-center">
      <h2 className="text-lg font-semibold text-gray-500 mb-2">
        باقات لمرة واحدة
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        احصل حسب العدد الذي تحتاجه بصلاحية تحميل لمدة سنة
      </p>

      <div className="text-4xl font-bold text-gray-800 mb-2">
        ${selectedPlan?.amount ?? plans[0]?.amount ?? 0}
      </div>
      <div className="text-xl font-semibold text-gray-700 mb-6">
        {selectedPlan?.credits ?? plans[0]?.credits ?? 0} نقطة
      </div>

      <p className="text-sm font-medium text-gray-600 mb-4">
        اختر عدد النقاط التي تحتاجها
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                ${
                  isSelected
                    ? "bg-secondary text-white border-secondary"
                    : "bg-white border-gray-300 text-gray-700 hover:border-secondary"
                }`}
            >
              {plan.credits} نقطة
            </button>
          );
        })}
      </div>

      <button
        className="w-full py-3 bg-primary hover:bg-primary/70 text-white text-lg font-semibold rounded-xl transition"
        onClick={() => {
          handlePayment(selectedPlanId!);
          // Handle subscribe
        }}
      >
        اشترك الآن
      </button>
    </div>
  );
};

export default Plans;
