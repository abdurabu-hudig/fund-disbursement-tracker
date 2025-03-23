
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from '@/hooks/use-mobile';

const formSchema = z.object({
  voucherNumber: z.string().min(1, {
    message: "يجب إدخال رقم السند.",
  }),
  date: z.date({
    required_error: "يجب إدخال التاريخ.",
  }),
  location: z.string().min(1, {
    message: "يجب إدخال الموقع.",
  }),
  recipientName: z.string().min(1, {
    message: "يجب إدخال اسم المستلم.",
  }),
  recipientPhone: z.string().min(7, {
    message: "يجب إدخال رقم هاتف صحيح.",
  }),
  totalAmount: z.number({
    required_error: "يجب إدخال المبلغ الإجمالي.",
    invalid_type_error: "يجب أن يكون المبلغ الإجمالي رقمًا.",
  }).min(0, {
    message: "يجب أن يكون المبلغ الإجمالي أكبر من أو يساوي 0.",
  }),
  improvementAmount: z.number({
    required_error: "يجب إدخال مبلغ التحسين.",
    invalid_type_error: "يجب أن يكون مبلغ التحسين رقمًا.",
  }).min(0, {
    message: "يجب أن يكون مبلغ التحسين أكبر من أو يساوي 0.",
  }),
  fineAmount: z.number({
    required_error: "يجب إدخال مبلغ الغرامة.",
    invalid_type_error: "يجب أن يكون مبلغ الغرامة رقمًا.",
  }).min(0, {
    message: "يجب أن يكون مبلغ الغرامة أكبر من أو يساوي 0.",
  }),
  notes: z.string().optional(),
  voucherRows: z.array(
    z.object({
      description: z.string().min(1, {
        message: "يجب إدخال الوصف.",
      }),
      amount: z.number({
        required_error: "يجب إدخال المبلغ.",
        invalid_type_error: "يجب أن يكون المبلغ رقمًا.",
      }).min(1, {
        message: "يجب أن يكون المبلغ أكبر من 0.",
      }),
    })
  ).min(1, {
    message: "يجب إدخال صف واحد على الأقل.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const VoucherForm: React.FC = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucherNumber: "",
      date: new Date(),
      location: "",
      recipientName: "",
      recipientPhone: "",
      totalAmount: 0,
      improvementAmount: 0,
      fineAmount: 0,
      notes: "",
      voucherRows: [{ description: "", amount: 0 }],
    },
  });

  const { control, handleSubmit, formState: { errors }, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voucherRows",
  });

  const validateForm = () => {
    if (Object.keys(errors).length > 0) {
      toast({
        title: "خطأ",
        description: "الرجاء التأكد من إدخال جميع الحقول المطلوبة بشكل صحيح.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const resetForm = () => {
    reset({
      voucherNumber: "",
      date: new Date(),
      location: "",
      recipientName: "",
      recipientPhone: "",
      totalAmount: 0,
      improvementAmount: 0,
      fineAmount: 0,
      notes: "",
      voucherRows: [{ description: "", amount: 0 }],
    });
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      
      // Transform voucher_details to JSON compatible format
      // Convert Date to ISO string format for Supabase
      const voucherData = {
        voucher_number: form.getValues("voucherNumber"),
        date: form.getValues("date").toISOString(), // Convert Date to ISO string
        location: form.getValues("location"),
        recipient_name: form.getValues("recipientName"),
        recipient_phone: form.getValues("recipientPhone"),
        total_amount: form.getValues("totalAmount"),
        improvement_amount: form.getValues("improvementAmount"),
        fine_amount: form.getValues("fineAmount"),
        notes: form.getValues("notes"),
        voucher_details: form.getValues("voucherRows") // Pass as is, Supabase will handle the JSON conversion
      };

      const { error } = await supabase
        .from('vouchers')
        .insert(voucherData);

      if (error) {
        console.error('Error saving voucher:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حفظ السند. الرجاء المحاولة مرة أخرى.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم",
          description: "تم حفظ السند بنجاح",
        });
        
        // Reset form after successful save
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">إنشاء سند صرف</h1>
      <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
        {/* Voucher Number and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="voucherNumber">رقم السند</Label>
            <Input id="voucherNumber" type="text" {...form.register("voucherNumber")} />
            {errors.voucherNumber && (
              <p className="text-red-500 text-sm">{errors.voucherNumber.message}</p>
            )}
          </div>
          <div>
            <Label>تاريخ السند</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.getValues("date") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.getValues("date") ? (
                    format(form.getValues("date"), "PPP")
                  ) : (
                    <span>اختر تاريخ</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <Calendar
                  mode="single"
                  selected={form.getValues("date")}
                  onSelect={(date) => form.setValue("date", date!)}
                  disabled={(date) =>
                    date > new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>
        </div>

        {/* Location and Recipient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">الموقع</Label>
            <Input id="location" type="text" {...form.register("location")} />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="recipientName">اسم المستلم</Label>
            <Input id="recipientName" type="text" {...form.register("recipientName")} />
            {errors.recipientName && (
              <p className="text-red-500 text-sm">{errors.recipientName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="recipientPhone">رقم هاتف المستلم</Label>
            <Input id="recipientPhone" type="tel" {...form.register("recipientPhone")} />
            {errors.recipientPhone && (
              <p className="text-red-500 text-sm">{errors.recipientPhone.message}</p>
            )}
          </div>
        </div>

        {/* Amounts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="totalAmount">المبلغ الإجمالي</Label>
            <Input id="totalAmount" type="number" step="0.01" {...form.register("totalAmount", { valueAsNumber: true })} />
            {errors.totalAmount && (
              <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="improvementAmount">مبلغ التحسين</Label>
            <Input id="improvementAmount" type="number" step="0.01" {...form.register("improvementAmount", { valueAsNumber: true })} />
            {errors.improvementAmount && (
              <p className="text-red-500 text-sm">{errors.improvementAmount.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="fineAmount">مبلغ الغرامة</Label>
            <Input id="fineAmount" type="number" step="0.01" {...form.register("fineAmount", { valueAsNumber: true })} />
            {errors.fineAmount && (
              <p className="text-red-500 text-sm">{errors.fineAmount.message}</p>
            )}
          </div>
        </div>

        {/* Voucher Details */}
        <div>
          <Label>تفاصيل السند</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row gap-2 mb-2">
              <div className="w-full md:w-1/2">
                <Label htmlFor={`voucherRows.${index}.description`}>الوصف</Label>
                <Input
                  id={`voucherRows.${index}.description`}
                  type="text"
                  {...form.register(`voucherRows.${index}.description`)}
                />
                {errors.voucherRows?.[index]?.description && (
                  <p className="text-red-500 text-sm">
                    {errors.voucherRows?.[index]?.description?.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/4">
                <Label htmlFor={`voucherRows.${index}.amount`}>المبلغ</Label>
                <Input
                  id={`voucherRows.${index}.amount`}
                  type="number"
                  step="0.01"
                  {...form.register(`voucherRows.${index}.amount`, { valueAsNumber: true })}
                />
                {errors.voucherRows?.[index]?.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.voucherRows?.[index]?.amount?.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/4 flex items-end">
                <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                  حذف
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" variant="secondary" size="sm" onClick={() => append({ description: "", amount: 0 })}>
            إضافة تفصيل
          </Button>
          {errors.voucherRows && errors.voucherRows.length > 0 && (
            <p className="text-red-500 text-sm">{errors.voucherRows[0].message}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes">ملاحظات</Label>
          <Textarea id="notes" {...form.register("notes")} />
          {errors.notes && (
            <p className="text-red-500 text-sm">{errors.notes.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : "حفظ السند"}
        </Button>
      </form>
    </div>
  );
};

export default VoucherForm;
