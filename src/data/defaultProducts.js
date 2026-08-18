export const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'جميع الأصناف', icon: 'Boxes' },
  { id: 'poultry', name: 'دواجن مجمدة', icon: 'Drumstick' },
  { id: 'meat', name: 'لحوم ومصنعات', icon: 'Beef' },
  { id: 'seafood', name: 'أسماك ومأكولات بحرية', icon: 'Fish' },
  { id: 'appetizers', name: 'مقبلات وسناكس', icon: 'Utensils' },
  { id: 'vegetables', name: 'خضروات وفواكه مجمدة', icon: 'Carrot' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'ستربس دجاج حار (أكياس 1 كجم)',
    category: 'poultry',
    unit: 'كيس',
    currentStock: 18,
    minCriticalThreshold: 8,
    healthyThreshold: 20,
    freezerLocation: 'فريزر رقم 1 - الرف العلوي',
    notes: 'ماركة شهية، الأكثر طلباً للمطعم',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      {
        id: 'aud-1-1',
        date: '2026-08-10T11:30:00.000Z',
        quantity: 35,
        delta: 35,
        auditor: 'أحمد محمود',
        notes: 'استلام شحنة جديدة كاملة'
      },
      {
        id: 'aud-1-2',
        date: '2026-08-15T09:00:00.000Z',
        quantity: 24,
        delta: -11,
        auditor: 'كريم سامي',
        notes: 'جرد أسبوعي دوري'
      },
      {
        id: 'aud-1-3',
        date: '2026-08-18T18:45:00.000Z',
        quantity: 18,
        delta: -6,
        auditor: 'أحمد محمود',
        notes: 'جرد مسائي قبل نهاية الوردية'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'بانيه دجاج متبل مقرمش (كرتونة 5 كجم)',
    category: 'poultry',
    unit: 'كرتونة',
    currentStock: 4,
    minCriticalThreshold: 6,
    healthyThreshold: 15,
    freezerLocation: 'فريزر رقم 1 - الرف الأوسط',
    notes: 'استهلاك يومي مرتفع، بحاجة لطلب توريد عاجل',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      {
        id: 'aud-2-1',
        date: '2026-08-12T14:00:00.000Z',
        quantity: 12,
        delta: 12,
        auditor: 'طارق علي',
        notes: 'افتتاح الجرد'
      },
      {
        id: 'aud-2-2',
        date: '2026-08-18T20:10:00.000Z',
        quantity: 4,
        delta: -8,
        auditor: 'أحمد محمود',
        notes: 'سحب مكثف لقسم السندوتشات'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'برجر لحم بقري جامبو (علبة 24 قطعة)',
    category: 'meat',
    unit: 'علبة',
    currentStock: 28,
    minCriticalThreshold: 10,
    healthyThreshold: 25,
    freezerLocation: 'فريزر رقم 2 - الرف 1',
    notes: 'جودة ممتازة - صلاحية حتى نهاية العام',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      {
        id: 'aud-3-1',
        date: '2026-08-17T16:00:00.000Z',
        quantity: 28,
        delta: 0,
        auditor: 'كريم سامي',
        notes: 'مطابقة تامة للمخزون'
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'بطاطس نصف مقلية فريتس (كيس 2.5 كجم)',
    category: 'appetizers',
    unit: 'كيس',
    currentStock: 12,
    minCriticalThreshold: 15,
    healthyThreshold: 35,
    freezerLocation: 'غرفة التجميد الرئيسية - سلة B',
    notes: 'تحتاج متابعة مع المورد لزيادة الكمية',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      {
        id: 'aud-4-1',
        date: '2026-08-11T12:00:00.000Z',
        quantity: 30,
        delta: 30,
        auditor: 'طارق علي',
        notes: 'جرد أولي'
      },
      {
        id: 'aud-4-2',
        date: '2026-08-16T10:30:00.000Z',
        quantity: 12,
        delta: -18,
        auditor: 'أحمد محمود',
        notes: 'مخزون قارب على النفاد'
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'سمبوسك جبنة بالنعناع (طبق 50 حبة)',
    category: 'appetizers',
    unit: 'طبق',
    currentStock: 0,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'فريزر رقم 3 - رف المقبلات',
    notes: 'نفد بالكامل خلال عطلة نهاية الأسبوع!',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      {
        id: 'aud-5-1',
        date: '2026-08-13T10:00:00.000Z',
        quantity: 9,
        delta: 9,
        auditor: 'كريم سامي',
        notes: 'متبقي من الوردية السابقة'
      },
      {
        id: 'aud-5-2',
        date: '2026-08-18T12:00:00.000Z',
        quantity: 0,
        delta: -9,
        auditor: 'أحمد محمود',
        notes: 'نفاد كامل للكمية'
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'فيليه سمك قشر بياض مجمد (كرتونة 10 كجم)',
    category: 'seafood',
    unit: 'كرتونة',
    currentStock: 14,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'فريزر الأسماك المستقل',
    notes: 'درجة حرارة الفريزر مضبوطة على -18 مئوية',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      {
        id: 'aud-6-1',
        date: '2026-08-08T09:00:00.000Z',
        quantity: 14,
        delta: 14,
        auditor: 'طارق علي',
        notes: 'لم يجرى جرد منذ 10 أيام - بحاجة للتأكيد'
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'خضار مشكل مجمد بسلة وجزر وفاصوليا (كيس 1 كجم)',
    category: 'vegetables',
    unit: 'كيس',
    currentStock: 45,
    minCriticalThreshold: 15,
    healthyThreshold: 40,
    freezerLocation: 'فريزر الخضار رقم 4',
    notes: 'مخزون ممتاز وكافٍ',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      {
        id: 'aud-7-1',
        date: '2026-08-18T15:20:00.000Z',
        quantity: 45,
        delta: 5,
        auditor: 'أحمد محمود',
        notes: 'إضافة عبوات جديدة'
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'كفتة حاتي متبلة وجاهزة للشواء (أطباق 1 كجم)',
    category: 'meat',
    unit: 'طبق',
    currentStock: 9,
    minCriticalThreshold: 8,
    healthyThreshold: 20,
    freezerLocation: 'فريزر رقم 2 - الرف 3',
    notes: 'توشك على دخول مرحلة الخطر',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      {
        id: 'aud-8-1',
        date: '2026-08-17T21:00:00.000Z',
        quantity: 9,
        delta: -4,
        auditor: 'كريم سامي',
        notes: 'استهلاك قسم المشويات'
      }
    ]
  }
];
