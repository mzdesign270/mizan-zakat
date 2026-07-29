import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageMeta } from '@/components/seo/PageMeta';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name:    z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100),
  email:   z.string().email('البريد الإلكتروني غير صحيح').max(254),
  phone:   z.string().max(20).optional(),
  subject: z.string().min(3, 'الموضوع قصير جداً').max(150),
  message: z.string().min(10, 'الرسالة قصيرة جداً').max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type Status = 'idle' | 'success';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const onSubmit = (values: ContactFormValues) => {
    const mailSubject = encodeURIComponent(
      `رسالة جديدة من ميزان الزكاة: ${values.subject}`
    );
    const mailBody = encodeURIComponent(
      `الاسم: ${values.name}\n\n` +
      `البريد الإلكتروني: ${values.email}\n\n` +
      `رقم الجوال: ${values.phone?.trim() || 'غير مُدخل'}\n\n` +
      `الموضوع: ${values.subject}\n\n` +
      `الرسالة:\n${values.message}`
    );

    window.location.href =
      `mailto:mradalahdl64@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    setStatus('success');
  };

  return (
    <>
      <PageMeta
        title="تواصل معنا - ميزان الزكاة"
        description="تواصل مع فريق ميزان الزكاة — استفسارات أو اقتراحات أو ملاحظات."
        canonicalPath="/contact"
      />

      <main className="max-w-xl mx-auto px-4 py-12 space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1B19] mb-2">تواصل معنا</h1>
          <p className="text-muted-foreground">
            استفسار، اقتراح، أو ملاحظة — نُسعد بسماعك.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center" data-testid="contact-success">
            <CheckCircle className="h-12 w-12 text-[#0F5C4C]" />
            <h2 className="font-serif text-xl font-semibold">شكراً لتواصلك!</h2>
            <p className="text-muted-foreground">وصلتنا رسالتك وسنرد عليك في أقرب وقت.</p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
              data-testid="contact-form"
              noValidate
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: محمد العمري" data-testid="input-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" dir="ltr" data-testid="input-email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الجوال (اختياري)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+966 5X XXX XXXX" dir="ltr" data-testid="input-phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الموضوع</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: استفسار عن حاسبة الذهب" data-testid="input-subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرسالة</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="اكتب رسالتك هنا..."
                        className="min-h-32"
                        data-testid="input-message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#0F5C4C] hover:bg-[#0d5244] text-white"
                data-testid="button-submit"
              >
                إرسال الرسالة
              </Button>
            </form>
          </Form>
        )}
      </main>
    </>
  );
}
