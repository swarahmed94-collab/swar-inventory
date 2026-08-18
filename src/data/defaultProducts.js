export const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'جميع الأصناف', icon: 'Boxes' },
  { id: 'poultry', name: 'دواجن ومجمدات أطياب والوادي', icon: 'Drumstick' },
  { id: 'meat', name: 'لحوم ومصنعات الجوكر وميتلاند', icon: 'Beef' },
  { id: 'dairy', name: 'أجبان ومنتجات ألبان', icon: 'Milk' },
  { id: 'pickles', name: 'مخللات وطرشي', icon: 'Jar' },
  { id: 'appetizers', name: 'مقبلات وسناكس', icon: 'Utensils' },
  { id: 'vegetables', name: 'خضروات وفواكه مجمدة', icon: 'Carrot' },
];

export const INITIAL_PRODUCTS = [
  // ==================== 1. منتجات أطياب (Atyab) - دواجن ومصنعات ====================
  {
    id: 'atyab-strips-cold-box',
    name: 'ستريبس أطياب بارد (علبة)',
    emoji: '🍗',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 25,
    minCriticalThreshold: 8,
    healthyThreshold: 20,
    freezerLocation: 'فريزر أطياب 1 - رف الدواجن',
    notes: 'أطياب أصلي - بارد',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-1', date: '2026-08-18T14:00:00.000Z', quantity: 25, delta: 5, auditor: 'مسؤول الجرد', notes: 'جرد أسبوعي' }
    ]
  },
  {
    id: 'atyab-strips-cold-carton',
    name: 'ستريبس أطياب بارد (كرتونة)',
    emoji: '🍗',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'كرتونة',
    currentStock: 12,
    minCriticalThreshold: 4,
    healthyThreshold: 10,
    freezerLocation: 'غرفة التجميد الرئيسية - باليت أطياب',
    notes: 'كرتونة كاملة',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-2', date: '2026-08-18T14:00:00.000Z', quantity: 12, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-strips-spicy-box',
    name: 'ستريبس أطياب حار (علبة)',
    emoji: '🍗',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 18,
    minCriticalThreshold: 6,
    healthyThreshold: 15,
    freezerLocation: 'فريزر أطياب 1 - رف الدواجن',
    notes: 'أطياب سبايسي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-3', date: '2026-08-18T14:00:00.000Z', quantity: 18, delta: -2, auditor: 'مسؤول الجرد', notes: 'سحب مبيعات' }
    ]
  },
  {
    id: 'atyab-strips-spicy-carton',
    name: 'ستريبس أطياب حار (كرتونة)',
    emoji: '🍗',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'كرتونة',
    currentStock: 8,
    minCriticalThreshold: 3,
    healthyThreshold: 8,
    freezerLocation: 'غرفة التجميد الرئيسية - باليت أطياب',
    notes: 'كراتين سبايسي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-4', date: '2026-08-18T14:00:00.000Z', quantity: 8, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-pane-cold-box',
    name: 'بانيه أطياب بارد (علبة)',
    emoji: '🥩',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 22,
    minCriticalThreshold: 7,
    healthyThreshold: 18,
    freezerLocation: 'فريزر أطياب 1 - رف 2',
    notes: 'بانيه مقرمش عادي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-5', date: '2026-08-18T15:00:00.000Z', quantity: 22, delta: 4, auditor: 'مسؤول الجرد', notes: 'استلام شحنة' }
    ]
  },
  {
    id: 'atyab-pane-cold-carton',
    name: 'بانيه أطياب بارد (كرتونة)',
    emoji: '🥩',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'كرتونة',
    currentStock: 10,
    minCriticalThreshold: 4,
    healthyThreshold: 10,
    freezerLocation: 'غرفة التجميد الرئيسية',
    notes: 'كرتونة بانيه',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-6', date: '2026-08-18T15:00:00.000Z', quantity: 10, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-pane-spicy-box',
    name: 'بانيه أطياب حار (علبة)',
    emoji: '🥩',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 14,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'فريزر أطياب 1 - رف 2',
    notes: 'بانيه مقرمش سبايسي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-7', date: '2026-08-18T15:00:00.000Z', quantity: 14, delta: -3, auditor: 'مسؤول الجرد', notes: 'سحب' }
    ]
  },
  {
    id: 'atyab-pane-spicy-carton',
    name: 'بانيه أطياب حار (كرتونة)',
    emoji: '🥩',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'كرتونة',
    currentStock: 6,
    minCriticalThreshold: 3,
    healthyThreshold: 8,
    freezerLocation: 'غرفة التجميد الرئيسية',
    notes: 'كراتين بانيه حار',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-8', date: '2026-08-18T15:00:00.000Z', quantity: 6, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-luncheon-plain-box',
    name: 'لانشون أطياب سادة (علبة)',
    emoji: '🥓',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 16,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'ثلاجة المصنعات واللحوم الباردة',
    notes: 'لانشون دجاج/لحم سادة',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-9', date: '2026-08-18T16:00:00.000Z', quantity: 16, delta: 0, auditor: 'مسؤول الجرد', notes: 'جرد يومي' }
    ]
  },
  {
    id: 'atyab-luncheon-plain-carton',
    name: 'لانشون أطياب سادة (كرتونة)',
    emoji: '🥓',
    brand: 'أطياب',
    category: 'meat',
    unit: 'كرتونة',
    currentStock: 7,
    minCriticalThreshold: 3,
    healthyThreshold: 8,
    freezerLocation: 'مخزن الجملة',
    notes: 'كرتونة لانشون سادة',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-10', date: '2026-08-18T16:00:00.000Z', quantity: 7, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-luncheon-olives-box',
    name: 'لانشون أطياب بالزيتون (علبة)',
    emoji: '🥓',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 12,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'ثلاجة المصنعات',
    notes: 'لانشون بالزيتون',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-11', date: '2026-08-18T16:00:00.000Z', quantity: 12, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-luncheon-pepper-box',
    name: 'لانشون أطياب بالفلفل الأسود (علبة)',
    emoji: '🥓',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 9,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'ثلاجة المصنعات',
    notes: 'لانشون بالفلفل',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-12', date: '2026-08-18T16:00:00.000Z', quantity: 9, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-sausage-box',
    name: 'سجق أطياب (علبة)',
    emoji: '🌭',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 15,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'فريزر أطياب 2 - لحوم',
    notes: 'سجق شرقي أطياب',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-13', date: '2026-08-18T16:30:00.000Z', quantity: 15, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-sausage-carton',
    name: 'سجق أطياب (كرتونة)',
    emoji: '🌭',
    brand: 'أطياب',
    category: 'meat',
    unit: 'كرتونة',
    currentStock: 6,
    minCriticalThreshold: 2,
    healthyThreshold: 6,
    freezerLocation: 'غرفة التجميد الرئيسية',
    notes: 'كراتين سجق',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-14', date: '2026-08-18T16:30:00.000Z', quantity: 6, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-burger-catering-1kg',
    name: 'برجر كاتيرنج أطياب (1 كيلو)',
    emoji: '🍔',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 20,
    minCriticalThreshold: 6,
    healthyThreshold: 20,
    freezerLocation: 'فريزر البرجر رقم 1',
    notes: 'كاتيرنج اقتصادي للمطاعم 1 كجم',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-15', date: '2026-08-18T17:00:00.000Z', quantity: 20, delta: 5, auditor: 'مسؤول الجرد', notes: 'استلام' }
    ]
  },
  {
    id: 'atyab-burger-catering-500g',
    name: 'برجر كاتيرنج أطياب (500 جرام)',
    emoji: '🍔',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 14,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'فريزر البرجر رقم 1',
    notes: 'عبوة 500 جم',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-16', date: '2026-08-18T17:00:00.000Z', quantity: 14, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-burger-jumbo-box',
    name: 'برجر أطياب جامبو (علبة / كرتونة)',
    emoji: '🍔',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 18,
    minCriticalThreshold: 6,
    healthyThreshold: 18,
    freezerLocation: 'فريزر البرجر رقم 1',
    notes: 'جامبو أطياب الفاخر',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-17', date: '2026-08-18T17:00:00.000Z', quantity: 18, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-kofta-box',
    name: 'كفتة أطياب متبلة (علبة / كرتونة)',
    emoji: '🌭',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 12,
    minCriticalThreshold: 4,
    healthyThreshold: 15,
    freezerLocation: 'فريزر المشويات',
    notes: 'كفتة شوي سريعة التحضير',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-18', date: '2026-08-18T17:30:00.000Z', quantity: 12, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-hotdog-box',
    name: 'هوت دوج / فرانكفورتر أطياب (علبة / كرتونة)',
    emoji: '🌭',
    brand: 'أطياب',
    category: 'meat',
    unit: 'علبة',
    currentStock: 16,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'ثلاجة الهوت دوج',
    notes: 'فرانكفورتر عالي الجودة',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-19', date: '2026-08-18T17:30:00.000Z', quantity: 16, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'atyab-shish-cordon-box',
    name: 'شيش طاووق / كوردون بلو أطياب (علبة)',
    emoji: '🍗',
    brand: 'أطياب',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 10,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'فريزر الدواجن الفاخرة',
    notes: 'متبل جاهز للقلي والطهي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-at-20', date: '2026-08-18T18:00:00.000Z', quantity: 10, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },

  // ==================== 2. منتجات الجوكر (El-Joker) ====================
  {
    id: 'joker-kofta-box',
    name: 'كفتة الجوكر (علبة)',
    emoji: '🌭',
    brand: 'الجوكر',
    category: 'meat',
    unit: 'علبة',
    currentStock: 15,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'فريزر الجوكر 1 - رف الكفتة',
    notes: 'كفتة الجوكر المميزة',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-jk-1', date: '2026-08-18T14:30:00.000Z', quantity: 15, delta: 0, auditor: 'مسؤول الجرد', notes: 'جرد أولي' }
    ]
  },
  {
    id: 'joker-kofta-carton',
    name: 'كفتة الجوكر (كرتونة)',
    emoji: '🌭',
    brand: 'الجوكر',
    category: 'meat',
    unit: 'كرتونة',
    currentStock: 8,
    minCriticalThreshold: 3,
    healthyThreshold: 8,
    freezerLocation: 'غرفة التجميد - باليت الجوكر',
    notes: 'كراتين كفتة الجوكر',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-jk-2', date: '2026-08-18T14:30:00.000Z', quantity: 8, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'joker-burger-box',
    name: 'برجر الجوكر (علبة)',
    emoji: '🍔',
    brand: 'الجوكر',
    category: 'meat',
    unit: 'علبة',
    currentStock: 20,
    minCriticalThreshold: 6,
    healthyThreshold: 18,
    freezerLocation: 'فريزر الجوكر 1 - رف البرجر',
    notes: 'برجر لحم الجوكر',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-jk-3', date: '2026-08-18T14:30:00.000Z', quantity: 20, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'joker-burger-carton',
    name: 'برجر الجوكر (كرتونة)',
    emoji: '🍔',
    brand: 'الجوكر',
    category: 'meat',
    unit: 'كرتونة',
    currentStock: 10,
    minCriticalThreshold: 3,
    healthyThreshold: 10,
    freezerLocation: 'غرفة التجميد - باليت الجوكر',
    notes: 'كراتين برجر الجوكر',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-jk-4', date: '2026-08-18T14:30:00.000Z', quantity: 10, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'joker-sausage-box',
    name: 'سجق الجوكر (علبة)',
    emoji: '🌭',
    brand: 'الجوكر',
    category: 'meat',
    unit: 'علبة',
    currentStock: 14,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'فريزر الجوكر 1 - رف السجق',
    notes: 'سجق الجوكر بلدي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-jk-5', date: '2026-08-18T14:30:00.000Z', quantity: 14, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'joker-sausage-carton',
    name: 'سجق الجوكر (كرتونة)',
    emoji: '🌭',
    brand: 'الجوكر',
    category: 'meat',
    unit: 'كرتونة',
    currentStock: 7,
    minCriticalThreshold: 2,
    healthyThreshold: 7,
    freezerLocation: 'غرفة التجميد - باليت الجوكر',
    notes: 'كراتين سجق الجوكر',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-jk-6', date: '2026-08-18T14:30:00.000Z', quantity: 7, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },

  // ==================== 3. منتجات الوادي (El-Wadi) ====================
  {
    id: 'wadi-pane-cold-box',
    name: 'بانيه الوادي بارد (علبة / كرتونة)',
    emoji: '🥩',
    brand: 'الوادي',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 16,
    minCriticalThreshold: 5,
    healthyThreshold: 16,
    freezerLocation: 'فريزر الوادي 2',
    notes: 'بانيه مقرمش الوادي بارد',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-wd-1', date: '2026-08-18T15:30:00.000Z', quantity: 16, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'wadi-pane-spicy-box',
    name: 'بانيه الوادي حار (علبة / كرتونة)',
    emoji: '🥩',
    brand: 'الوادي',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 12,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'فريزر الوادي 2',
    notes: 'بانيه الوادي حار',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-wd-2', date: '2026-08-18T15:30:00.000Z', quantity: 12, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'wadi-strips-box',
    name: 'ستريبس الوادي (علبة / كرتونة)',
    emoji: '🍗',
    brand: 'الوادي',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 14,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'فريزر الوادي 2',
    notes: 'ستريبس دجاج الوادي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-wd-3', date: '2026-08-18T15:30:00.000Z', quantity: 14, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'wadi-burger-box',
    name: 'برجر الوادي (علبة / كرتونة)',
    emoji: '🍔',
    brand: 'الوادي',
    category: 'meat',
    unit: 'علبة',
    currentStock: 15,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'فريزر الوادي 2',
    notes: 'برجر لحم الوادي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-wd-4', date: '2026-08-18T15:30:00.000Z', quantity: 15, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'wadi-kofta-box',
    name: 'كفتة الوادي (علبة / كرتونة)',
    emoji: '🌭',
    brand: 'الوادي',
    category: 'meat',
    unit: 'علبة',
    currentStock: 11,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'فريزر الوادي 2',
    notes: 'كفتة الوادي جاهزة للشواء',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-wd-5', date: '2026-08-18T15:30:00.000Z', quantity: 11, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },

  // ==================== 4. منتجات ميتلاند (Meatland) ====================
  {
    id: 'meatland-luncheon-plain-box',
    name: 'لانشون ميتلاند سادة (علبة / كرتونة)',
    emoji: '🥓',
    brand: 'ميتلاند',
    category: 'meat',
    unit: 'علبة',
    currentStock: 14,
    minCriticalThreshold: 4,
    healthyThreshold: 14,
    freezerLocation: 'ثلاجة ميتلاند',
    notes: 'لانشون ميتلاند سادة فاخر',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ml-1', date: '2026-08-18T16:00:00.000Z', quantity: 14, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'meatland-luncheon-olives-box',
    name: 'لانشون ميتلاند بالزيتون (علبة / كرتونة)',
    emoji: '🥓',
    brand: 'ميتلاند',
    category: 'meat',
    unit: 'علبة',
    currentStock: 10,
    minCriticalThreshold: 3,
    healthyThreshold: 10,
    freezerLocation: 'ثلاجة ميتلاند',
    notes: 'لانشون ميتلاند بالزيتون',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ml-2', date: '2026-08-18T16:00:00.000Z', quantity: 10, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'meatland-luncheon-pepper-box',
    name: 'لانشون ميتلاند بالفلفل الأسود (علبة / كرتونة)',
    emoji: '🥓',
    brand: 'ميتلاند',
    category: 'meat',
    unit: 'علبة',
    currentStock: 8,
    minCriticalThreshold: 3,
    healthyThreshold: 10,
    freezerLocation: 'ثلاجة ميتلاند',
    notes: 'لانشون ميتلاند بالفلفل',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ml-3', date: '2026-08-18T16:00:00.000Z', quantity: 8, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'meatland-burger-box',
    name: 'برجر ميتلاند (علبة / كرتونة)',
    emoji: '🍔',
    brand: 'ميتلاند',
    category: 'meat',
    unit: 'علبة',
    currentStock: 16,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'ثلاجة ميتلاند',
    notes: 'برجر لحم ميتلاند',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ml-4', date: '2026-08-18T16:00:00.000Z', quantity: 16, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'meatland-frank-box',
    name: 'فرانك ميتلاند (علبة / كرتونة)',
    emoji: '🌭',
    brand: 'ميتلاند',
    category: 'meat',
    unit: 'علبة',
    currentStock: 12,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'ثلاجة ميتلاند',
    notes: 'فرانكفورتر ميتلاند',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ml-5', date: '2026-08-18T16:00:00.000Z', quantity: 12, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },

  // ==================== 5. منتجات حلواني إخوان، العابد، سما، فودينا ====================
  {
    id: 'sama-luncheon-box',
    name: 'لانشون سما (علبة / قالب)',
    emoji: '🥓',
    brand: 'سما',
    category: 'meat',
    unit: 'علبة',
    currentStock: 15,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'ثلاجة اللحوم الباردة',
    notes: 'لانشون ماركة سما',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-sm-1', date: '2026-08-18T17:00:00.000Z', quantity: 15, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'fodina-luncheon-box',
    name: 'لانشون فودينا (علبة / قالب)',
    emoji: '🥓',
    brand: 'فودينا',
    category: 'meat',
    unit: 'علبة',
    currentStock: 12,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'ثلاجة اللحوم الباردة',
    notes: 'لانشون ماركة فودينا',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-fd-1', date: '2026-08-18T17:00:00.000Z', quantity: 12, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'halwani-luncheon-box',
    name: 'لانشون حلواني إخوان (علبة / كرتونة)',
    emoji: '🥓',
    brand: 'حلواني إخوان',
    category: 'meat',
    unit: 'علبة',
    currentStock: 18,
    minCriticalThreshold: 5,
    healthyThreshold: 18,
    freezerLocation: 'ثلاجة حلواني',
    notes: 'حلواني إخوان أصلي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-hw-1', date: '2026-08-18T17:00:00.000Z', quantity: 18, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'halwani-pane-box',
    name: 'بانيه حلواني إخوان (علبة / كرتونة)',
    emoji: '🥩',
    brand: 'حلواني إخوان',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 14,
    minCriticalThreshold: 4,
    healthyThreshold: 14,
    freezerLocation: 'ثلاجة حلواني',
    notes: 'بانيه دجاج حلواني',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-hw-2', date: '2026-08-18T17:00:00.000Z', quantity: 14, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'halwani-burger-box',
    name: 'برجر حلواني إخوان (علبة / كرتونة)',
    emoji: '🍔',
    brand: 'حلواني إخوان',
    category: 'meat',
    unit: 'علبة',
    currentStock: 15,
    minCriticalThreshold: 5,
    healthyThreshold: 15,
    freezerLocation: 'ثلاجة حلواني',
    notes: 'برجر بقري حلواني',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-hw-3', date: '2026-08-18T17:00:00.000Z', quantity: 15, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'abed-duck-frozen',
    name: 'بط مجمد العابد (حبة / كرتونة)',
    emoji: '🍗',
    brand: 'العابد',
    category: 'poultry',
    unit: 'قطعة',
    currentStock: 10,
    minCriticalThreshold: 3,
    healthyThreshold: 10,
    freezerLocation: 'فريزر الطيور والمجمدات الكاملة',
    notes: 'بط العابد وزن 2.5 - 3 كجم',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ab-1', date: '2026-08-18T17:30:00.000Z', quantity: 10, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'abed-pigeon-frozen',
    name: 'حمام مجمد العابد (زوج / طبق)',
    emoji: '🍗',
    brand: 'العابد',
    category: 'poultry',
    unit: 'طبق',
    currentStock: 12,
    minCriticalThreshold: 4,
    healthyThreshold: 12,
    freezerLocation: 'فريزر الطيور',
    notes: 'حمام جامبو العابد مجهز',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ab-2', date: '2026-08-18T17:30:00.000Z', quantity: 12, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'abed-pane-box',
    name: 'بانيه العابد (علبة / كرتونة)',
    emoji: '🥩',
    brand: 'العابد',
    category: 'poultry',
    unit: 'علبة',
    currentStock: 14,
    minCriticalThreshold: 4,
    healthyThreshold: 14,
    freezerLocation: 'فريزر العابد',
    notes: 'بانيه صدور العابد',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ab-3', date: '2026-08-18T17:30:00.000Z', quantity: 14, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },

  // ==================== 6. قسم الأجبان والمنتجات اللبنية ====================
  {
    id: 'cheese-roumi-old',
    name: 'جبنة رومي (قديم / بطارخ / شمع)',
    emoji: '🧀',
    brand: 'أجبان متنوعة',
    category: 'dairy',
    unit: 'كجم',
    currentStock: 25,
    minCriticalThreshold: 8,
    healthyThreshold: 25,
    freezerLocation: 'ثلاجة الأجبان 1',
    notes: 'رومي قديم درجة أولى معتق',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ch-1', date: '2026-08-18T18:00:00.000Z', quantity: 25, delta: 5, auditor: 'مسؤول الجرد', notes: 'استلام أقراص جديدة' }
    ]
  },
  {
    id: 'cheese-white-varieties',
    name: 'جبنة بيضاء (دوبل كريم / براميلي / إسطنبولي / فيتا)',
    emoji: '🧀',
    brand: 'أجبان بيضاء',
    category: 'dairy',
    unit: 'كجم',
    currentStock: 40,
    minCriticalThreshold: 15,
    healthyThreshold: 40,
    freezerLocation: 'ثلاجة الأجبان 1 - صف الجبن الأبيض',
    notes: 'صفائح وبراميل الجبن الأبيض',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ch-2', date: '2026-08-18T18:00:00.000Z', quantity: 40, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'cheese-mozzarella-1kg',
    name: 'جبنة موزاريلا (أطباق 200 جم / 500 جم / 1 كيلو)',
    emoji: '🧀',
    brand: 'موزاريلا',
    category: 'dairy',
    unit: 'كيس',
    currentStock: 35,
    minCriticalThreshold: 10,
    healthyThreshold: 35,
    freezerLocation: 'فريزر الأجبان المبشورة',
    notes: 'موزاريلا طبيعي مطاطية عالية للبيتزا',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ch-3', date: '2026-08-18T18:00:00.000Z', quantity: 35, delta: 10, auditor: 'مسؤول الجرد', notes: 'استلام شحنة' }
    ]
  },
  {
    id: 'cheese-cheddar-gouda',
    name: 'جبنة شيدر / جودة / فلمنك',
    emoji: '🧀',
    brand: 'أجبان مستوردة',
    category: 'dairy',
    unit: 'كجم',
    currentStock: 18,
    minCriticalThreshold: 5,
    healthyThreshold: 18,
    freezerLocation: 'ثلاجة الأجبان 2',
    notes: 'شيدر أحمر وأصفر وجودة هولندي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ch-4', date: '2026-08-18T18:00:00.000Z', quantity: 18, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'cheese-triangles-spread',
    name: 'جبنة مثلثات / كاسات (لافاشكيري / طعمة / أريج / أبو الولد)',
    emoji: '🧀',
    brand: 'مثلثات وكاسات',
    category: 'dairy',
    unit: 'علبة',
    currentStock: 50,
    minCriticalThreshold: 15,
    healthyThreshold: 50,
    freezerLocation: 'رف الألبان والمثلثات',
    notes: 'علب مثلثات وكاسات شيدر وقشطة',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-ch-5', date: '2026-08-18T18:00:00.000Z', quantity: 50, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },

  // ==================== 7. قسم المخللات والطرشي ====================
  {
    id: 'pickle-torshi-mixed',
    name: 'طرشي مشكل (بلدي / بوليف)',
    emoji: '🥗',
    brand: 'مخللات',
    category: 'pickles',
    unit: 'كجم',
    currentStock: 60,
    minCriticalThreshold: 20,
    healthyThreshold: 60,
    freezerLocation: 'قسم المخللات والبراميل',
    notes: 'طرشي مشكل خلطة ممتازة',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-pk-1', date: '2026-08-18T18:30:00.000Z', quantity: 60, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'pickle-cucumber',
    name: 'خيار مخلل (مقرمش / صغير)',
    emoji: '🥒',
    brand: 'مخللات',
    category: 'pickles',
    unit: 'كجم',
    currentStock: 30,
    minCriticalThreshold: 10,
    healthyThreshold: 30,
    freezerLocation: 'قسم المخللات',
    notes: 'خيار قتة مقرمش',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-pk-2', date: '2026-08-18T18:30:00.000Z', quantity: 30, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'pickle-olives-varieties',
    name: 'زيتون مخلل (تفاحي / كلاماتا / أسود)',
    emoji: '🫒',
    brand: 'مخللات',
    category: 'pickles',
    unit: 'كجم',
    currentStock: 45,
    minCriticalThreshold: 15,
    healthyThreshold: 45,
    freezerLocation: 'قسم المخللات - براميل الزيتون',
    notes: 'زيتون كلاماتا يوناني وتفاحي بلدي',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-pk-3', date: '2026-08-18T18:30:00.000Z', quantity: 45, delta: 5, auditor: 'مسؤول الجرد', notes: 'استلام برميل جديد' }
    ]
  },
  {
    id: 'pickle-lemon-varieties',
    name: 'ليمون مخلل (معصفر بحبة البركة / عادي)',
    emoji: '🍋',
    brand: 'مخللات',
    category: 'pickles',
    unit: 'كجم',
    currentStock: 25,
    minCriticalThreshold: 8,
    healthyThreshold: 25,
    freezerLocation: 'قسم المخللات',
    notes: 'ليمون معصفر بلدي بحبة البركة والعصفر',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-pk-4', date: '2026-08-18T18:30:00.000Z', quantity: 25, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  },
  {
    id: 'pickle-pepper-varieties',
    name: 'فلفل مخلل (حامي / مكسيكي هلابينو)',
    emoji: '🌶️',
    brand: 'مخللات',
    category: 'pickles',
    unit: 'كجم',
    currentStock: 20,
    minCriticalThreshold: 6,
    healthyThreshold: 20,
    freezerLocation: 'قسم المخللات',
    notes: 'فلفل هلابينو وبلدي شطة',
    createdAt: '2026-08-01T10:00:00.000Z',
    auditHistory: [
      { id: 'aud-pk-5', date: '2026-08-18T18:30:00.000Z', quantity: 20, delta: 0, auditor: 'مسؤول الجرد', notes: 'مطابق' }
    ]
  }
];
