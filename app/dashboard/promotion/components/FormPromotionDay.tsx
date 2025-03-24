"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./uploadButton";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(2).max(500).trim(),
  image: z.array(z.string()),
  contentFinal: z.string().min(2).max(255),
});

const FormPromotionDay = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: [],
      contentFinal: "",
    },
  });

  const onSubmitPromotionDay = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("http://localhost:8000/sendPromotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar a promoção");
      }

      const data = await response.json();
      console.log("Promoção enviada com sucesso:", data);
    } catch (error) {
      console.error("Erro ao enviar dados para o backend:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitPromotionDay)}
        className="w-full space-y-6 rounded-md border bg-white p-4 shadow-md"
      >
        <h1 className="text-2xl font-semibold">Promoção do dia</h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  className="focus:border-none"
                  placeholder="Título da promoção..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conteúdo</FormLabel>
              <FormControl>
                <Textarea
                  className="focus:border-none"
                  placeholder="Conteúdo da promoção..."
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mídia</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(url) => field.onChange([...field.value, url])}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contentFinal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conteúdo Final</FormLabel>
              <FormControl>
                <Textarea
                  className="focus:border-none"
                  placeholder="Conteúdo final da promoção..."
                  {...field}
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
};

export default FormPromotionDay;
