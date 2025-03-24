"use client";

import FormPromotionAniversary from "./components/FormPromotionAniversary";
import FormPromotionDay from "./components/FormPromotionDay";

const PromotionPage = () => {
  return (
    <section className="w-full space-y-8">
      <h1 className="text-3xl font-bold">Promoções</h1>
      <div className="grid w-full gap-10 lg:grid-cols-2 2xl:grid-cols-3">
        <FormPromotionDay />
        <FormPromotionAniversary />
      </div>
    </section>
  );
};
export default PromotionPage;
