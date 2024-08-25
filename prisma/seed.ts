import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
export const roundsOfHashing = 10;

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('12345', roundsOfHashing);
  const admin = await prisma.user.upsert({
    where: { userName: 'admin' },
    create: {
      name: 'admin',
      userName: 'admin',
      password: hashedPassword,
      role: 'admin',
    },
    update: {},
  });
  const managerOffice = await prisma.office.upsert({
    where: { name: 'مكتب المدير' },
    create: {
      name: 'مكتب المدير',
    },
    update: {},
  });

  const manager = await prisma.user.upsert({
    where: { userName: 'مدير الكلية' },
    create: {
      name: 'مدير الكلية',
      userName: 'مدير الكلية',
      password: hashedPassword,
      role: 'office',
      office: {
        connect: {
          id: managerOffice.id,
        },
      },
    },
    update: {},
  });

  const managerSec = await prisma.user.upsert({
    where: { userName: 'سكرتارية المدير' },
    create: {
      name: 'سكرتارية المدير',
      userName: 'سكرتارية المدير',
      password: hashedPassword,
      role: 'sec',
      office: {
        connect: {
          id: managerOffice.id,
        },
      },
    },
    update: {},
  });

  // نائب المدير

  const deputyOffice = await prisma.office.upsert({
    where: { name: 'نائب المدير' },
    create: {
      name: 'نائب المدير',
    },
    update: {},
  });

  const deputy = await prisma.user.upsert({
    where: { userName: 'نائب المدير' },
    create: {
      name: 'نائب المدير',
      userName: 'نائب المدير',
      password: hashedPassword,
      role: 'office',
      office: {
        connect: {
          id: deputyOffice.id,
        },
      },
    },
    update: {},
  });

  const deputySec = await prisma.user.upsert({
    where: { userName: 'سكرتارية النائب' },
    create: {
      name: 'سكرتارية النائب',
      userName: 'سكرتارية النائب',
      password: hashedPassword,
      role: 'sec',
      office: {
        connect: {
          id: deputyOffice.id,
        },
      },
    },
    update: {},
  });

  // upsert visitors

  const uploadedVisitors = await prisma.visitor.createMany({
    data: visitors.map((visitor) => ({
      name: visitor.VisitorName,
      jobTitle: visitor.JobTitle,
      rank: visitor.Rank,
    })),
    skipDuplicates: true,
  });
}

const visitors = [
  {
    VisitorId: 1,
    Rank: 'عميد أ ح',
    VisitorName: 'عباده ابراهيم',
    JobTitle: 'كبير المعلمين',
  },
  {
    VisitorId: 3,
    Rank: 'عميد أ ح',
    VisitorName: 'ياسر محمد السيد برج',
    JobTitle: 'قائد لواء الطلبة',
  },
  {
    VisitorId: 4,
    Rank: 'عقيد أح',
    VisitorName: 'إيهاب ياسين إبراهيم أحمد',
    JobTitle: 'رئيس فرع التخطيط وقسم المبتكرات',
  },
  {
    VisitorId: 10,
    Rank: 'عقيد',
    VisitorName: 'أحمد عبد السلام محمود السيد',
    JobTitle: 'رئيس قسم الجودة وقائد ك الائمه',
  },
  {
    VisitorId: 12,
    Rank: 'عقيد أح',
    VisitorName: 'أحمد محمود عبدالوهاب على',
    JobTitle: 'فرع التعليم',
  },
  {
    VisitorId: 13,
    Rank: 'عقيد أح',
    VisitorName: 'محمد على أحمد على',
    JobTitle: 'المسجل',
  },
  {
    VisitorId: 14,
    Rank: 'مقدم أ ح',
    VisitorName: 'محمد جمعة السيد محمد المحلاوى',
    JobTitle: 'فرع التخطيط',
  },
  {
    VisitorId: 17,
    Rank: 'مقدم',
    VisitorName: 'أحمد فاروق عبدالحميد محمد',
    JobTitle: 'رئيس مفرزة الامن',
  },
  {
    VisitorId: 18,
    Rank: 'مقدم',
    VisitorName: 'محمد زكريا دراز',
    JobTitle: 'رئيس فرع نظم المعلومات',
  },
  {
    VisitorId: 22,
    Rank: 'مقدم',
    VisitorName: 'جون صليب عبدالمسيح صليب',
    JobTitle: 'اتجاه التربية الرياضية',
  },
  {
    VisitorId: 23,
    Rank: 'مقدم',
    VisitorName: 'أحمد السيد منصور أحمد نصر',
    JobTitle: 'قائد ك 3 طلبة',
  },
  {
    VisitorId: 25,
    Rank: 'نقيب',
    VisitorName: 'محمد امين علي',
    JobTitle: 'رئيس قسم الشئون النفسيه',
  },
  {
    VisitorId: 35,
    Rank: 'رائد',
    VisitorName: 'محمد فوزى أحمد الصاوى سعد',
    JobTitle: 'رئيس فرع المنشأت',
  },
  {
    VisitorId: 39,
    Rank: 'رائد',
    VisitorName: 'هانى ابراهيم حامد محمد عطية',
    JobTitle: 'ر قسم التعيينات',
  },
  {
    VisitorId: 42,
    Rank: 'رائد',
    VisitorName: 'محمد صبحى محمد',
    JobTitle: 'رئيس قسم المهمات',
  },
  {
    VisitorId: 45,
    Rank: 'رائد',
    VisitorName: 'مصطفى غريب منصور حسب الله',
    JobTitle: 'ر قسم المركبات والورشة',
  },
  {
    VisitorId: 48,
    Rank: 'نقيب',
    VisitorName: 'ابراهيم عادل',
    JobTitle: 'قائد النقطة الطبية',
  },
  {
    VisitorId: 49,
    Rank: 'رائد',
    VisitorName: 'حسن كرم حسن عبدالحميد',
    JobTitle: 'الكفتريا',
  },
  {
    VisitorId: 50,
    Rank: 'نقيب',
    VisitorName: 'محمد فوزى محمد احمد',
    JobTitle: 'لواء الطلبة',
  },
  {
    VisitorId: 54,
    Rank: 'رائد',
    VisitorName: 'وسام صبحى محمد رمضان',
    JobTitle: 'رئيس قسم الكيما والمبتكرات',
  },
  {
    VisitorId: 59,
    Rank: 'نقيب',
    VisitorName: 'احمد الامير',
    JobTitle: 'رئيس قسم الوقود',
  },
  {
    VisitorId: 61,
    Rank: 'نقيب',
    VisitorName: 'محمد الحسينى عبدالجليل على',
    JobTitle: 'ضابط بلواء الجنود',
  },
  {
    VisitorId: 64,
    Rank: 'نقيب',
    VisitorName: 'رافت عبدالرحمن محمد علي',
    JobTitle: 'قائد فرقة الموسيقى',
  },
  {
    VisitorId: 66,
    Rank: 'نقيب',
    VisitorName: 'أحمد نظمى على محمد',
    JobTitle: 'قائد وحدة الطهى والميس المجمع رقم 16',
  },
  {
    VisitorId: 67,
    Rank: 'نقيب',
    VisitorName: 'أسامة محمد هاشم حسن فياض',
    JobTitle: 'قائد جناح المنشآت الرياضية',
  },
  {
    VisitorId: 68,
    Rank: 'نقيب',
    VisitorName: 'عبدالمنعم فرهود',
    JobTitle: 'القسم المتقدم',
  },
  {
    VisitorId: 70,
    Rank: 'ملازم أ',
    VisitorName: 'مصطفى هانى محمود عبدالشافى',
    JobTitle: 'ضابط بالنقطة الطبية',
  },
  {
    VisitorId: 71,
    Rank: 'ملازم أ.ش',
    VisitorName: 'محمد عبدالنبي توفيق',
    JobTitle: 'قسم الشؤن المعنويه',
  },
  {
    VisitorId: 72,
    Rank: 'ملازم أ',
    VisitorName: 'السيد خضر السيد عبدة',
    JobTitle: 'ضابط بالحملة',
  },
  {
    VisitorId: 73,
    Rank: 'ملازم أ',
    VisitorName: 'عبدالحليم محمد شكير',
    JobTitle: 'ضابط بلواء الجنود',
  },
  {
    VisitorId: 74,
    Rank: 'ملازم أ',
    VisitorName: 'مظهر شحاته محمد العدوى',
    JobTitle: 'ض بقسم الأشغال',
  },
  {
    VisitorId: 75,
    Rank: 'ملازم أ',
    VisitorName: 'عمرو محمد عبدالحميد عبدالمنعم',
    JobTitle: 'ضابط بالنقطة الطبية',
  },
  {
    VisitorId: 76,
    Rank: 'نقيب',
    VisitorName: 'عرفة جابر رياض سليمان',
    JobTitle: 'ضابط بقسم الافراد',
  },
  {
    VisitorId: 77,
    Rank: 'مساعد',
    VisitorName: 'أحمد جودة',
    JobTitle: 'شئون طلبة',
  },
  {
    VisitorId: 78,
    Rank: 'رقيب اول',
    VisitorName: 'مصطفى ثابت',
    JobTitle: 'الماليات',
  },
  {
    VisitorId: 83,
    Rank: 'رقيب اول',
    VisitorName: 'سمير احمد محمد',
    JobTitle: 'الافراد',
  },
  {
    VisitorId: 84,
    Rank: 'رقيب اول',
    VisitorName: 'محمد غنيمى مصطفى',
    JobTitle: 'الافراد',
  },
  {
    VisitorId: 85,
    Rank: 'مساعد اول',
    VisitorName: 'محمد  عبدالجواد',
    JobTitle: 'الزرع',
  },
  {
    VisitorId: 86,
    Rank: 'مساعد اول',
    VisitorName: 'أحمد  فهمى',
    JobTitle: 'الحسابات الخصوصية',
  },
  {
    VisitorId: 87,
    Rank: 'مساعد اول',
    VisitorName: 'احمد ناجى',
    JobTitle: 'الماليات',
  },
  {
    VisitorId: 88,
    Rank: 'مساعد اول',
    VisitorName: 'حمادة محمد حامد',
    JobTitle: 'الاشغال',
  },
  {
    VisitorId: 90,
    Rank: 'مساعد',
    VisitorName: 'محمود ذكى',
    JobTitle: 'المزرعة',
  },
  {
    VisitorId: 91,
    Rank: 'مساعد',
    VisitorName: 'أيمن ذكى',
    JobTitle: 'المسجل',
  },
  {
    VisitorId: 94,
    Rank: 'رقيب',
    VisitorName: 'محمد عبداللطيف',
    JobTitle: 'الماليات',
  },
  {
    VisitorId: 96,
    Rank: 'رقيب',
    VisitorName: 'أحمد طلعت شاهين',
    JobTitle: 'المطبعة',
  },
  {
    VisitorId: 97,
    Rank: 'رقيب',
    VisitorName: 'محمد طه شحاتة',
    JobTitle: 'المطبعة',
  },
  {
    VisitorId: 98,
    Rank: 'رقيب',
    VisitorName: 'احمد عبدالفتاح',
    JobTitle: 'المهمات',
  },
  {
    VisitorId: 99,
    Rank: 'رقيب',
    VisitorName: 'حمادة موسى طه',
    JobTitle: 'المهمات',
  },
  {
    VisitorId: 102,
    Rank: 'مساعد اول',
    VisitorName: 'أحمد ناجى',
    JobTitle: 'الماليات',
  },
  {
    VisitorId: 103,
    Rank: 'كابتن',
    VisitorName: 'ك/ محمود عواد',
    JobTitle: 'مزرعة',
  },
  {
    VisitorId: 105,
    Rank: 'رقيب',
    VisitorName: 'محمد عبداللطيف',
    JobTitle: 'ماليات',
  },
  {
    VisitorId: 107,
    Rank: 'ملازم ش',
    VisitorName: 'احمد عوض',
    JobTitle: 'ماليات',
  },
  {
    VisitorId: 108,
    Rank: 'رقيب',
    VisitorName: 'محمد نوار',
    JobTitle: 'شئون ضباط',
  },
  {
    VisitorId: 109,
    Rank: 'رقيب',
    VisitorName: 'احمد عبدالتواب',
    JobTitle: 'مخبز',
  },
  {
    VisitorId: 110,
    Rank: 'رقيب',
    VisitorName: 'محمد كامل مكي',
    JobTitle: 'الاشغال',
  },
  {
    VisitorId: 115,
    Rank: 'مدنى',
    VisitorName: 'ماجد ماهر',
    JobTitle: 'رئيس العمال',
  },
  {
    VisitorId: 121,
    Rank: 'رائد',
    VisitorName: 'عمر ابومسلم',
    JobTitle: 'مكتب الانضباط',
  },
  {
    VisitorId: 122,
    Rank: 'مقدم',
    VisitorName: 'اسلام السعيد مصطفي',
    JobTitle: 'قائد كتيبة',
  },
  {
    VisitorId: 125,
    Rank: 'رقيب',
    VisitorName: 'احمد ابو هندي',
    JobTitle: 'الامن',
  },
  {
    VisitorId: 126,
    Rank: 'رائد',
    VisitorName: 'محمد علي عبدالقوي',
    JobTitle: 'رمايه وجوده',
  },
  {
    VisitorId: 128,
    Rank: 'رائد',
    VisitorName: 'محمد ابوالمحاسن',
    JobTitle: 'الإنضباط',
  },
  {
    VisitorId: 129,
    Rank: 'نقيب',
    VisitorName: 'محمود سعد الحسيني',
    JobTitle: 'مطبعه / الدكان الحر',
  },
  {
    VisitorId: 130,
    Rank: 'لواء',
    VisitorName: 'محمود نصر',
    JobTitle: '',
  },
  {
    VisitorId: 131,
    Rank: 'مدنى',
    VisitorName: 'مشرفين وزاره الاوقاف',
    JobTitle: '',
  },
  {
    VisitorId: 132,
    Rank: 'نقيب',
    VisitorName: 'احمد نوار عبدالمجيد',
    JobTitle: 'رئيس قسم الأشغال',
  },
  {
    VisitorId: 133,
    Rank: 'نقيب',
    VisitorName: 'محمد امين علي',
    JobTitle: 'رئيس قسم شئون نفسيه',
  },
  {
    VisitorId: 134,
    Rank: 'مساعد اول',
    VisitorName: 'صابر السعيد محي',
    JobTitle: 'مساعد تعليم لواء الطلبه',
  },
  {
    VisitorId: 137,
    Rank: 'رقيب',
    VisitorName: 'خالد صقر عبدالله',
    JobTitle: 'المخبز',
  },
  {
    VisitorId: 139,
    Rank: 'رائد',
    VisitorName: 'وليد هاشم مغربي',
    JobTitle: 'الامن',
  },
  {
    VisitorId: 140,
    Rank: 'رقيب',
    VisitorName: 'عصام ناصر',
    JobTitle: 'النظم',
  },
  {
    VisitorId: 141,
    Rank: 'رقيب اول',
    VisitorName: 'مصطفي عادل',
    JobTitle: 'الاشاره',
  },
  {
    VisitorId: 142,
    Rank: 'نقيب',
    VisitorName: 'عبدالله عزت',
    JobTitle: 'تسليح الكليه',
  },
  {
    VisitorId: 143,
    Rank: 'نقيب',
    VisitorName: 'محمد حسين شبل',
    JobTitle: 'اشاره + ابتكارات',
  },
  {
    VisitorId: 144,
    Rank: 'رقيب',
    VisitorName: 'محمود عبدالرازق محمد',
    JobTitle: 'قسم الجودة',
  },
  {
    VisitorId: 147,
    Rank: 'مساعد اول',
    VisitorName: 'حمدي عبدالله الشحات',
    JobTitle: 'الموسيقا',
  },
  {
    VisitorId: 148,
    Rank: 'رائد',
    VisitorName: 'محمد فرج',
    JobTitle: 'اتجاه التربيه',
  },
  {
    VisitorId: 149,
    Rank: 'مهندس مدني',
    VisitorName: 'المهندس عمر الهادي',
    JobTitle: 'مهندس مدني',
  },
  {
    VisitorId: 150,
    Rank: 'عريف',
    VisitorName: 'ابراهيم عبد النعم',
    JobTitle: 'حمله الكليه',
  },
  {
    VisitorId: 151,
    Rank: 'لواء',
    VisitorName: 'محمود',
    JobTitle: 'العرض الصامت',
  },
  {
    VisitorId: 152,
    Rank: 'نقيب',
    VisitorName: 'محمد مصطفي عبد الفتاح',
    JobTitle: 'لواء الطلبه',
  },
  {
    VisitorId: 153,
    Rank: 'نقييب',
    VisitorName: 'باسل عبد الرحمن',
    JobTitle: 'قائد سريه',
  },
  {
    VisitorId: 154,
    Rank: 'نقيب',
    VisitorName: 'محمد دغيش',
    JobTitle: 'رئيس قسم الامتحانات',
  },
  {
    VisitorId: 155,
    Rank: 'رائد',
    VisitorName: 'عباده',
    JobTitle: 'طبيه',
  },
  {
    VisitorId: 156,
    Rank: 'مقاول',
    VisitorName: 'عيد',
    JobTitle: 'مقاولات',
  },
  {
    VisitorId: 157,
    Rank: 'نقيب',
    VisitorName: 'حمدى',
    JobTitle: 'حرس شرف',
  },
  {
    VisitorId: 158,
    Rank: 'نقيب',
    VisitorName: 'محمود',
    JobTitle: 'معلق الحفله',
  },
  {
    VisitorId: 159,
    Rank: 'مساعد',
    VisitorName: 'احمد عبد الله',
    JobTitle: 'مزرعه',
  },
  {
    VisitorId: 160,
    Rank: 'نقيب',
    VisitorName: 'محمد مجدي',
    JobTitle: 'الصاعقه',
  },
  {
    VisitorId: 161,
    Rank: 'نقيب',
    VisitorName: 'محمود المسلمي',
    JobTitle: 'الخزنه',
  },
  {
    VisitorId: 162,
    Rank: 'مساعد',
    VisitorName: 'سمير جميل فهيم',
    JobTitle: 'ش اداريه ل الطلبه',
  },
  {
    VisitorId: 163,
    Rank: 'عريف',
    VisitorName: 'علي ابراهيم السيد',
    JobTitle: 'لواء الطلبة',
  },
  {
    VisitorId: 165,
    Rank: 'نقيب',
    VisitorName: 'اسامه محمد هاشم',
    JobTitle: 'اتجاه التربيه',
  },
  {
    VisitorId: 166,
    Rank: 'عريف',
    VisitorName: 'محمود سلطان',
    JobTitle: 'اتجاه التربيه',
  },
  {
    VisitorId: 167,
    Rank: 'عريف',
    VisitorName: 'محمد عبدالستار',
    JobTitle: 'حمله',
  },
  {
    VisitorId: 168,
    Rank: 'رقيب',
    VisitorName: 'عبدالله البرى',
    JobTitle: 'مساعد تعليم لواء الجنود',
  },
  {
    VisitorId: 169,
    Rank: 'مهندس',
    VisitorName: 'عمر الهادى',
    JobTitle: '',
  },
  {
    VisitorId: 170,
    Rank: 'نقيب',
    VisitorName: 'احمد محمود عبدالفتاح',
    JobTitle: 'لواء الطلبه',
  },
  {
    VisitorId: 171,
    Rank: 'رائد',
    VisitorName: 'اسلام ندا',
    JobTitle: 'قائد لواء الجنود',
  },
  {
    VisitorId: 174,
    Rank: 'رقيب اول',
    VisitorName: 'مصطفي محمود ثابت',
    JobTitle: 'قسم الماليات',
  },
  {
    VisitorId: 175,
    Rank: 'رائد',
    VisitorName: 'اسلام بحيري',
    JobTitle: 'رئيس  القسم البيطري',
  },
  {
    VisitorId: 177,
    Rank: 'رقيب اول',
    VisitorName: 'رفعت حسين محمد',
    JobTitle: 'مساعد تعليم لواء الجنود',
  },
  {
    VisitorId: 178,
    Rank: 'نقيب',
    VisitorName: 'حمدى السيد هلال',
    JobTitle: 'قا حرس الشرف',
  },
  {
    VisitorId: 179,
    Rank: 'مقدم',
    VisitorName: 'احمد علي',
    JobTitle: 'رئيس شؤن ظباط',
  },
  {
    VisitorId: 180,
    Rank: 'نقيب',
    VisitorName: 'محمود مصطفي',
    JobTitle: 'طبيه',
  },
  {
    VisitorId: 182,
    Rank: 'رائد',
    VisitorName: 'محمد العنانى',
    JobTitle: 'رئيس فرع الشؤن الاداريه',
  },
  {
    VisitorId: 183,
    Rank: 'مقدم',
    VisitorName: 'احمد على محمد',
    JobTitle: 'رئيس فرع شئون ضباط',
  },
  {
    VisitorId: 186,
    Rank: 'نقيب',
    VisitorName: 'محمود مصطفى ابراهيم',
    JobTitle: 'النقطه الطبيه',
  },
  {
    VisitorId: 187,
    Rank: 'مقدم',
    VisitorName: 'محمود صلاح الدين المحمدي',
    JobTitle: 'رئيس قسم الافراد',
  },
  {
    VisitorId: 188,
    Rank: 'نقيب',
    VisitorName: 'اسماعيل محمد اسماعيل',
    JobTitle: 'قائد فصيلة المخبز',
  },
  {
    VisitorId: 189,
    Rank: 'رائد',
    VisitorName: 'محمود سيد',
    JobTitle: 'لواء الطلبه',
  },
  {
    VisitorId: 190,
    Rank: 'نقيب',
    VisitorName: 'حمدى السيد',
    JobTitle: 'مجمع الخدمات',
  },
  {
    VisitorId: 191,
    Rank: 'مساعد اول',
    VisitorName: 'الراعي على السعيد',
    JobTitle: 'موسيقي',
  },
  {
    VisitorId: 192,
    Rank: 'رقيب',
    VisitorName: 'احمد حسن',
    JobTitle: 'ميس الضباط',
  },
  {
    VisitorId: 1192,
    Rank: 'مدنى',
    VisitorName: 'ايهاب',
    JobTitle: 'مصوراتي الامانه',
  },
  {
    VisitorId: 1193,
    Rank: 'عريف',
    VisitorName: 'محمد رمضان سعيد',
    JobTitle: 'افراد الكلية',
  },
  {
    VisitorId: 1194,
    Rank: 'طلبه',
    VisitorName: '2 طلبه لغه عربيه',
    JobTitle: 'طلبه',
  },
  {
    VisitorId: 1195,
    Rank: 'مدنى',
    VisitorName: 'أ / اشرف',
    JobTitle: 'مصوراتى الكليه',
  },
  {
    VisitorId: 1196,
    Rank: 'رقيب اول',
    VisitorName: 'محمد فاروق',
    JobTitle: 'سلاح لواء الجنود',
  },
  {
    VisitorId: 1197,
    Rank: 'عريف',
    VisitorName: 'احمد شحته حسن',
    JobTitle: 'مفرزه امن الكلية',
  },
  {
    VisitorId: 1198,
    Rank: 'مساعد',
    VisitorName: 'محمد بديع الجارحى',
    JobTitle: 'حمله المدير',
  },
  {
    VisitorId: 1199,
    Rank: 'نقيب',
    VisitorName: 'حمدي هلال',
    JobTitle: 'مجمع الخدمات',
  },
  {
    VisitorId: 1200,
    Rank: 'نقيب',
    VisitorName: 'محمد فتيان',
    JobTitle: 'لواء الجنود',
  },
  {
    VisitorId: 1201,
    Rank: 'ملازم',
    VisitorName: 'ريمون عادل عدلي',
    JobTitle: 'النقطه الطبيه',
  },
  {
    VisitorId: 2199,
    Rank: 'مدنى',
    VisitorName: 'امام المسجد',
    JobTitle: '',
  },
  {
    VisitorId: 2200,
    Rank: 'رائد',
    VisitorName: 'وليد هاشم',
    JobTitle: 'امن الكليه',
  },
  {
    VisitorId: 2201,
    Rank: 'نقيب',
    VisitorName: 'احمد محمود عبدالمجيد',
    JobTitle: 'لواء الطلبة',
  },
  {
    VisitorId: 3201,
    Rank: 'رقيب اول',
    VisitorName: 'عبدالقادر محمد',
    JobTitle: 'قسم الجودة',
  },
  {
    VisitorId: 3202,
    Rank: 'رائد',
    VisitorName: 'محمد حجاج',
    JobTitle: 'قسم المتابعه',
  },
  {
    VisitorId: 3203,
    Rank: 'رائد',
    VisitorName: 'حسام النبراوي',
    JobTitle: 'سكرتير السيد المدير',
  },
  {
    VisitorId: 3204,
    Rank: 'رقيب اول',
    VisitorName: 'سمير احمد محمد',
    JobTitle: 'أفراد الكلية',
  },
  {
    VisitorId: 3205,
    Rank: 'عقيد',
    VisitorName: 'على حجاج',
    JobTitle: 'رئيس قسم المتابعه',
  },
  {
    VisitorId: 3206,
    Rank: 'نقيب',
    VisitorName: 'احمد الكاتب',
    JobTitle: 'رئيس قسم القضاء',
  },
  {
    VisitorId: 3207,
    Rank: 'نقيب',
    VisitorName: 'ابراهيم عادل خليل',
    JobTitle: 'قائد النقطه الطبيه',
  },
  {
    VisitorId: 3208,
    Rank: 'رائد',
    VisitorName: 'مصطفي سيد',
    JobTitle: 'رئيس قسم البيطري',
  },
  {
    VisitorId: 3209,
    Rank: 'رائد',
    VisitorName: 'محمد فوزى غزالى',
    JobTitle: 'مفرزه الامن',
  },
  {
    VisitorId: 3211,
    Rank: 'مدنى',
    VisitorName: 'ايهاب خالد',
    JobTitle: 'البنك المصرى لتنميه الصادرات',
  },
  {
    VisitorId: 3212,
    Rank: 'موظف',
    VisitorName: 'ابراهيم خالد',
    JobTitle: 'موظف البنك',
  },
  {
    VisitorId: 3213,
    Rank: 'رقيب',
    VisitorName: 'سليمان محمد سليمان',
    JobTitle: 'افراد الكلية',
  },
  {
    VisitorId: 3214,
    Rank: 'رائد',
    VisitorName: 'محمد عناني',
    JobTitle: 'رئيس فرع الشئون الادراية',
  },
  {
    VisitorId: 3215,
    Rank: 'عريف',
    VisitorName: 'احمد داهش حسان',
    JobTitle: 'قسم المهمات',
  },
  {
    VisitorId: 3216,
    Rank: 'مهندس',
    VisitorName: 'جلال',
    JobTitle: 'المسطحات الخضراء والزرع',
  },
  {
    VisitorId: 3217,
    Rank: 'نقيب',
    VisitorName: 'احمد محمود الكاتب',
    JobTitle: 'رئيس قسم القضاء',
  },
  {
    VisitorId: 3218,
    Rank: 'عريف',
    VisitorName: 'احمد خالد عبد الشكور',
    JobTitle: 'امين عهده الكيما',
  },
  {
    VisitorId: 3219,
    Rank: 'رائد',
    VisitorName: 'محمد فوزي غزالي',
    JobTitle: 'امن الكلية',
  },
  {
    VisitorId: 3220,
    Rank: 'رقيب اول',
    VisitorName: 'كامل جمعه كامل',
    JobTitle: 'سلاح لوا الطلبة',
  },
  {
    VisitorId: 3221,
    Rank: 'نقيب',
    VisitorName: 'احمد عبد المجيد',
    JobTitle: 'لوا الطلبه',
  },
  {
    VisitorId: 4209,
    Rank: 'عقيد',
    VisitorName: 'تامر علي عبد الكريم',
    JobTitle: 'رئيس اركان لوا الطلبة',
  },
  {
    VisitorId: 4210,
    Rank: 'مقدم',
    VisitorName: 'نور الدين محمد عبدالفتاح',
    JobTitle: 'ابتكارات',
  },
  {
    VisitorId: 4211,
    Rank: 'رائد',
    VisitorName: 'محمد حسين شبل',
    JobTitle: 'رئيس قسم الاشارة و الابتكارت',
  },
  {
    VisitorId: 4212,
    Rank: 'رقيب اول',
    VisitorName: 'محمد عبدالفتاح',
    JobTitle: 'قسم المعنوي',
  },
  {
    VisitorId: 4213,
    Rank: 'مدنى',
    VisitorName: 'حج محرز',
    JobTitle: '',
  },
  {
    VisitorId: 4214,
    Rank: 'نقيب',
    VisitorName: 'عرفه جابر',
    JobTitle: 'المغسله',
  },
  {
    VisitorId: 4215,
    Rank: 'مساعد اول',
    VisitorName: 'محمد عبدالجواد',
    JobTitle: 'المسطحات الخضراء',
  },
  {
    VisitorId: 4216,
    Rank: 'نقيب',
    VisitorName: 'ابراهيم حربي ابراهيم',
    JobTitle: 'لوا الطلبة',
  },
  {
    VisitorId: 4217,
    Rank: 'ملازم أ',
    VisitorName: 'محمود نزيه نصر',
    JobTitle: 'النقطة الطبية',
  },
  {
    VisitorId: 4218,
    Rank: 'رقيب اول',
    VisitorName: 'يوسف السعيد عبدالمنعم',
    JobTitle: 'الحملة',
  },
  {
    VisitorId: 4219,
    Rank: 'نقيب',
    VisitorName: 'محمود فوزي احمد',
    JobTitle: 'لوا الطلبة',
  },
  {
    VisitorId: 4220,
    Rank: 'مدنى',
    VisitorName: 'جمال',
    JobTitle: 'كهربائى الكليه',
  },
  {
    VisitorId: 4221,
    Rank: 'مدنى',
    VisitorName: 'الكابتن سعيد',
    JobTitle: 'قسم التربيه',
  },
  {
    VisitorId: 4223,
    Rank: 'ملازم أ.ش',
    VisitorName: 'محمدعبد النبي',
    JobTitle: 'معنوي',
  },
];

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
