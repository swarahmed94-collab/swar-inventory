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
  {
    "id": "prod-swar-0001",
    "name": "رصيد سابق",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "وحدة",
    "price": 500,
    "currentStock": 828.48,
    "minCriticalThreshold": 166,
    "healthyThreshold": 414,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.686Z",
    "auditHistory": [
      {
        "id": "aud-init-1",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 828.48,
        "delta": 828.48,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0002",
    "name": "فوارغ مخللات",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "وحدة",
    "price": 10,
    "currentStock": 986.3,
    "minCriticalThreshold": 197,
    "healthyThreshold": 493,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-2",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 986.3,
        "delta": 986.3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0003",
    "name": "اجنحه اطياب 700 جم [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 50,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-3",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0004",
    "name": "استربس كجم 5 شنطه",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "كجم",
    "price": 870,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-4",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0005",
    "name": "استربس اطياب كجم 1 [كرتون]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2900,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-5",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0006",
    "name": "استربس اطياب 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 290,
    "currentStock": 6,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-6",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 6,
        "delta": 6,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0007",
    "name": "استربس اطياب جم 400 [كرتون]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كرتون",
    "price": 3360,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-7",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0008",
    "name": "استربس اطياب جم 400 [علبة]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "علبة",
    "price": 140,
    "currentStock": 4,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-8",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 4,
        "delta": 4,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0009",
    "name": "استربس الوادي جم 900 [كيس]",
    "emoji": "🍗",
    "brand": "الوادي",
    "category": "poultry",
    "unit": "كيس",
    "price": 205,
    "currentStock": 9,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-9",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 9,
        "delta": 9,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0010",
    "name": "استربس الوادي جم 900 [كرتون]",
    "emoji": "🍗",
    "brand": "الوادي",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2460,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-10",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0011",
    "name": "استربس حلواني 1 كجم [كرتون]",
    "emoji": "🍗",
    "brand": "حلواني",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2550,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-11",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0012",
    "name": "استربس حلواني 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "حلواني",
    "category": "poultry",
    "unit": "كيس",
    "price": 255,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-12",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0013",
    "name": "استربس شيكيتيتا 1 كجم [كرتون]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2150,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-13",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0014",
    "name": "استربس شيكيتيتا كجم 1 [كيس]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كيس",
    "price": 215,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-14",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0015",
    "name": "استربس شيكيتيتا جم 400 [علبة]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "علبة",
    "price": 110,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-15",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0016",
    "name": "استربس شيكيتيتا جم 400 [كرتون]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1980,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-16",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0017",
    "name": "استربس مطاعم اطياب 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 175,
    "currentStock": 5,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-17",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 5,
        "delta": 5,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0018",
    "name": "استربس مطاعم اطياب كجم 1 [كرتون]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1750,
    "currentStock": 8,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-18",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 8,
        "delta": 8,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0019",
    "name": "استربس ملوكي كجم 1 [كيس]",
    "emoji": "🍗",
    "brand": "ملوكي",
    "category": "poultry",
    "unit": "كيس",
    "price": 240,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-19",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0020",
    "name": "استربس ملوكي 400 جم",
    "emoji": "🍗",
    "brand": "ملوكي",
    "category": "poultry",
    "unit": "جرام",
    "price": 92,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-20",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0021",
    "name": "استربس ميلينا 900 جم",
    "emoji": "🍗",
    "brand": "ميلينا",
    "category": "poultry",
    "unit": "جرام",
    "price": 170,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-21",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0022",
    "name": "استربس ولعتين 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "ولعتين",
    "category": "poultry",
    "unit": "كيس",
    "price": 260,
    "currentStock": 4,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-22",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 4,
        "delta": 4,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0023",
    "name": "استربس ولعتين 1 كجم [كرتون]",
    "emoji": "🍗",
    "brand": "ولعتين",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2600,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-23",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0024",
    "name": "استرتش الفهد جامبو [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 550,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-24",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0025",
    "name": "استرتش تغليف [كرتون]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 425,
    "currentStock": 7,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-25",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 7,
        "delta": 7,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0026",
    "name": "استرتش تغليف [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 212.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-26",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0027",
    "name": "استرتش تغليف Appel [كرتون]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 400,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-27",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0028",
    "name": "اسكالوب ولعتين كجم 1 [كيس]",
    "emoji": "🥩",
    "brand": "ولعتين",
    "category": "meat",
    "unit": "كيس",
    "price": 245,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-28",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0029",
    "name": "الحاتي بيفي مربع جرام 900 [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 55,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-29",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0030",
    "name": "الحمد صوص شيدر جم 200 [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 30,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-30",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0031",
    "name": "الحمد صوص شيدر جم 500 [كيس]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "كيس",
    "price": 58.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-31",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0032",
    "name": "الحمد موزاريلا طبيعي كجم 1 [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 190,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-32",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0033",
    "name": "الحمد موزاريلا طبيعي جم 500 [كيس]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "كيس",
    "price": 95,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-33",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0034",
    "name": "الحمد موزاريلا طبيعي جم 500 [كرتون]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "كرتون",
    "price": 1900,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-34",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0035",
    "name": "الشريف لانشون كجم 2 مربع فراخ [قطعة]",
    "emoji": "🥩",
    "brand": "الشريف",
    "category": "meat",
    "unit": "قطعة",
    "price": 220,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-35",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0036",
    "name": "الشريف لانشون كجم 3 [قطعة]",
    "emoji": "🥩",
    "brand": "الشريف",
    "category": "meat",
    "unit": "قطعة",
    "price": 225,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-36",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0037",
    "name": "الغاء كيلو 2",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "كجم",
    "price": 73,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-37",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0038",
    "name": "الغاء كيلو 3",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "كجم",
    "price": 73,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-38",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0039",
    "name": "ايلو كاتشب جم 200 [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 25,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-39",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0040",
    "name": "ايلو كاتشب جم 400 [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 35,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-40",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0041",
    "name": "باربكيو ايلو [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 17,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-41",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0042",
    "name": "باميه زيرو [كرتون]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 800,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-42",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0043",
    "name": "باميه زيرو [قطعة]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 40,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-43",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0044",
    "name": "باميه زيرو بسمه [قطعة]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 41.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-44",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0045",
    "name": "باميه لوكس فوديكو [كرتون]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 300,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-45",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0046",
    "name": "باميه لوكس فوديكو [كيس]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كيس",
    "price": 15,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-46",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0047",
    "name": "باميه ممتازه بسمه [قطعة]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 30,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-47",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0048",
    "name": "باميه ممتازه فوديكو [كرتون]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 500,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-48",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0049",
    "name": "باميه ممتازه فوديكو [كيس]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كيس",
    "price": 25,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-49",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0050",
    "name": "بانيه اطياب كجم 1 [كرتون]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2220,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-50",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0051",
    "name": "بانيه اطياب 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 185,
    "currentStock": 11,
    "minCriticalThreshold": 2,
    "healthyThreshold": 6,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-51",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 11,
        "delta": 11,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0052",
    "name": "بانيه اطياب 2 كجم [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 138.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-52",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0053",
    "name": "بانيه اطياب جم 400 [كرتون]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2808,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-53",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0054",
    "name": "بانيه اطياب جم 400 [علبة]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "علبة",
    "price": 117,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-54",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0055",
    "name": "بانيه التوابل الشرقيه [كيس]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "كيس",
    "price": 130,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-55",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0056",
    "name": "بانيه التوابل الشرقيه [كرتون]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1560,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-56",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0057",
    "name": "بانيه الوادي 900 جم",
    "emoji": "🍗",
    "brand": "الوادي",
    "category": "poultry",
    "unit": "جرام",
    "price": 105,
    "currentStock": 7,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-57",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 7,
        "delta": 7,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0058",
    "name": "بانيه الوادي جم 900 [كرتون]",
    "emoji": "🍗",
    "brand": "الوادي",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1260,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-58",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0059",
    "name": "بانيه حلواني 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "حلواني",
    "category": "poultry",
    "unit": "كيس",
    "price": 54,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-59",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0060",
    "name": "بانيه شيكيتيتا 1 كجم [كرتون]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1440,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-60",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0061",
    "name": "بانيه شيكيتيتا 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كيس",
    "price": 120,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-61",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0062",
    "name": "بانيه شيكيتيتا جم 400 [كرتون]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1224,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-62",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0063",
    "name": "بانيه شيكيتيتا جم 400 [علبة]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "علبة",
    "price": 68,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-63",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0064",
    "name": "بانيه فراتي 1 كجم [كرتون]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1116,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-64",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0065",
    "name": "بانيه فراتي 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "كيس",
    "price": 70,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.687Z",
    "auditHistory": [
      {
        "id": "aud-init-65",
        "date": "2026-08-19T13:14:50.687Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0066",
    "name": "بانيه كوكي جم 400 [كرتون]",
    "emoji": "🍗",
    "brand": "كوكي",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2208,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-66",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0067",
    "name": "بانيه كوكي جم 400 [علبة]",
    "emoji": "🍗",
    "brand": "كوكي",
    "category": "poultry",
    "unit": "علبة",
    "price": 92,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-67",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0068",
    "name": "بانيه مزايا جم 900 [كيس]",
    "emoji": "🍗",
    "brand": "مزايا",
    "category": "poultry",
    "unit": "كيس",
    "price": 75,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-68",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0069",
    "name": "بانيه مزايا جم 900 [كرتون]",
    "emoji": "🍗",
    "brand": "مزايا",
    "category": "poultry",
    "unit": "كرتون",
    "price": 750,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-69",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0070",
    "name": "بانيه ملوكي 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "ملوكي",
    "category": "poultry",
    "unit": "كيس",
    "price": 115,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-70",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0071",
    "name": "بانيه ملوكي جم 400 [طبق]",
    "emoji": "🍗",
    "brand": "ملوكي",
    "category": "poultry",
    "unit": "طبق",
    "price": 70,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-71",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0072",
    "name": "بانيه ميتلاند كجم 1 [كيس]",
    "emoji": "🍗",
    "brand": "ميتلاند",
    "category": "poultry",
    "unit": "كيس",
    "price": 85,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-72",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0073",
    "name": "برجر اطياب جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "كرتون",
    "price": 2472,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-73",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0074",
    "name": "برجر اطياب جم 400 [علبة]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "علبة",
    "price": 115,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-74",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0075",
    "name": "برجر الجوكر 1 كجم [كرتون]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "كرتون",
    "price": 720,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-75",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0076",
    "name": "برجر الجوكر 1 كجم [قطعة]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "قطعة",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-76",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0077",
    "name": "برجر الجوكر جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "كرتون",
    "price": 684,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-77",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0078",
    "name": "برجر الجوكر جم 400 [طبق]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "طبق",
    "price": 38,
    "currentStock": 13,
    "minCriticalThreshold": 3,
    "healthyThreshold": 7,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-78",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 13,
        "delta": 13,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0079",
    "name": "برجر الحسن 1 كجم [قطعة]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "قطعة",
    "price": 100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-79",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0080",
    "name": "برجر الحسن جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "كرتون",
    "price": 936,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-80",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0081",
    "name": "برجر الحسن جم 400 [طبق]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "طبق",
    "price": 52,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-81",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0082",
    "name": "برجر المذاق كجم 1 [قطعة]",
    "emoji": "🥩",
    "brand": "المذاق",
    "category": "meat",
    "unit": "قطعة",
    "price": 85,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-82",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0083",
    "name": "برجر المذاق جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "المذاق",
    "category": "meat",
    "unit": "كرتون",
    "price": 513,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-83",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0084",
    "name": "برجر جامبو اطياب [قطعة]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "قطعة",
    "price": 333.75,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-84",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0085",
    "name": "برجر حلواني 1 كجم [قطعة]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "قطعة",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-85",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0086",
    "name": "برجر حلواني جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "كرتون",
    "price": 1680,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-86",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0087",
    "name": "برجر حلواني جم 400 [طبق]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "طبق",
    "price": 105,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-87",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0088",
    "name": "برجر دجاج 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "كيس",
    "price": 200,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-88",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0089",
    "name": "برجر دجاج اطياب [علبة]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "علبة",
    "price": 125,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-89",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0090",
    "name": "برجر شيكيتيتا 1 كجم [كرتون]",
    "emoji": "🥩",
    "brand": "شيكيتيتا",
    "category": "meat",
    "unit": "كرتون",
    "price": 1200,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-90",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0091",
    "name": "برجر شيكيتيتا 1 كجم [قطعة]",
    "emoji": "🥩",
    "brand": "شيكيتيتا",
    "category": "meat",
    "unit": "قطعة",
    "price": 144,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-91",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0092",
    "name": "برجر فحم سوبر فروزن 800gm [قطعة]",
    "emoji": "🥩",
    "brand": "سوبر فروزن",
    "category": "meat",
    "unit": "قطعة",
    "price": 185,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-92",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0093",
    "name": "برجر فحم سوبر فروزن 800gm [كرتون]",
    "emoji": "🥩",
    "brand": "سوبر فروزن",
    "category": "meat",
    "unit": "كرتون",
    "price": 1850,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-93",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0094",
    "name": "برجر فحم شيدر سوبر فروزن 800gm [قطعة]",
    "emoji": "🥩",
    "brand": "سوبر فروزن",
    "category": "meat",
    "unit": "قطعة",
    "price": 215,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-94",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0095",
    "name": "برجر فودينا جم 400 [طبق]",
    "emoji": "🥩",
    "brand": "فودينا",
    "category": "meat",
    "unit": "طبق",
    "price": 58,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-95",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0096",
    "name": "برجر كاترينج اطياب كجم 1 [قطعة]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "قطعة",
    "price": 210,
    "currentStock": 7,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-96",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 7,
        "delta": 7,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0097",
    "name": "برجر كاترينج اطياب 1 كجم [كرتون]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "كرتون",
    "price": 2520,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-97",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0098",
    "name": "برجر ميت شيف 1 كجم [قطعة]",
    "emoji": "🥩",
    "brand": "ميت شيف",
    "category": "meat",
    "unit": "قطعة",
    "price": 73,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-98",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0099",
    "name": "برجر ميت شيف جم 400 [طبق]",
    "emoji": "🥩",
    "brand": "ميت شيف",
    "category": "meat",
    "unit": "طبق",
    "price": 37.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-99",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0100",
    "name": "برجر ميت شيف جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "ميت شيف",
    "category": "meat",
    "unit": "كرتون",
    "price": 675,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-100",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0101",
    "name": "برجر ميتلاند 1 كجم [قطعة]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "قطعة",
    "price": 200,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-101",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0102",
    "name": "برجر ميتلاند جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "كرتون",
    "price": 1600,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-102",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0103",
    "name": "برجر ميتلاند جم 400 [طبق]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "طبق",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-103",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0104",
    "name": "بسطرمه كيلو",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "كجم",
    "price": 525,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-104",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0105",
    "name": "بسطرمه شرائح جم 250 [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 125,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-105",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0106",
    "name": "بسله جزر النيل [كرتون]",
    "emoji": "🥦",
    "brand": "النيل",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 320,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-106",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0107",
    "name": "بسله جزر النيل [قطعة]",
    "emoji": "🥦",
    "brand": "النيل",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 16,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-107",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0108",
    "name": "بسله جزر بسمه [كرتون]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 270,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-108",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0109",
    "name": "بسله جزر بسمه [كيس]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "كيس",
    "price": 26.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-109",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0110",
    "name": "بسله جزر جافه [كرتون]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 400,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-110",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0111",
    "name": "بسله جزر جافه [قطعة]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 20,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-111",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0112",
    "name": "بسله جزر فوديكو [كرتون]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 510,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-112",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0113",
    "name": "بسله جزر فوديكو [كيس]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كيس",
    "price": 25.5,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-113",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0114",
    "name": "بسله ساده النيل [كرتون]",
    "emoji": "🥦",
    "brand": "النيل",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 500,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-114",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0115",
    "name": "بسله ساده النيل [قطعة]",
    "emoji": "🥦",
    "brand": "النيل",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 25,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-115",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0116",
    "name": "بسله ساده بسمه [كرتون]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 480,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-116",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0117",
    "name": "بسله ساده بسمه [كيس]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "كيس",
    "price": 45,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-117",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0118",
    "name": "بسله ساده جافه [كرتون]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 400,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-118",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0119",
    "name": "بسله ساده جافه [قطعة]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 20,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-119",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0120",
    "name": "بسله ساده فوديكو [كرتون]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 800,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-120",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0121",
    "name": "بسله ساده فوديكو [كيس]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كيس",
    "price": 40,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-121",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0122",
    "name": "بصل اورمه [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 230,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-122",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0123",
    "name": "بصل بكلز 5 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 320,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-123",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0124",
    "name": "بط سليم العابد كيلو",
    "emoji": "📦",
    "brand": "العابد",
    "category": "all",
    "unit": "كجم",
    "price": 110,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-124",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0125",
    "name": "بطاطس 1 كجم [كيس]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كيس",
    "price": 50,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-125",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0126",
    "name": "بطاطس 1 كجم [كرتون]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 500,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-126",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0127",
    "name": "بطاطس 2.5 ك [كرتون]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 560,
    "currentStock": 6,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-127",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 6,
        "delta": 6,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0128",
    "name": "بطاطس 2.5 ك [كيس]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كيس",
    "price": 140,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-128",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0129",
    "name": "بطاطس فارم 1 كجم [كيس]",
    "emoji": "🍟",
    "brand": "فارم",
    "category": "appetizers",
    "unit": "كيس",
    "price": 70,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-129",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0130",
    "name": "بطاطس فارم 1 كجم [كرتون]",
    "emoji": "🍟",
    "brand": "فارم",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 840,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-130",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0131",
    "name": "بطاطس فارم 2.5 كجم [كيس]",
    "emoji": "🍟",
    "brand": "فارم",
    "category": "appetizers",
    "unit": "كيس",
    "price": 142,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-131",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0132",
    "name": "بطاطس فارم 2.5 كجم [كرتون]",
    "emoji": "🍟",
    "brand": "فارم",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 710,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-132",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0133",
    "name": "بطاطس فورزينا 2.5 كجم [كرتون]",
    "emoji": "🍟",
    "brand": "فورزينا",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 700,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-133",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0134",
    "name": "بطاطس فورزينا 2.5 كجم [كيس]",
    "emoji": "🍟",
    "brand": "فورزينا",
    "category": "appetizers",
    "unit": "كيس",
    "price": 140,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-134",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0135",
    "name": "بقسماط ايزيس 500 غرام",
    "emoji": "🍟",
    "brand": "ايزيس",
    "category": "appetizers",
    "unit": "جرام",
    "price": 22,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-135",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0136",
    "name": "بلوبيف مربع اطياب كجم 2 [قطعة]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "قطعة",
    "price": 360,
    "currentStock": 10,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-136",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 10,
        "delta": 10,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0137",
    "name": "بلوبيف مربع اطياب كجم 2 [كرتون]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "كرتون",
    "price": 3600,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-137",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0138",
    "name": "بيف بيكون دايم كيلو",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "كجم",
    "price": 270,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-138",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0139",
    "name": "بيفي مربع امجاد كجم 3 [قطعة]",
    "emoji": "🥩",
    "brand": "امجاد",
    "category": "meat",
    "unit": "قطعة",
    "price": 200,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-139",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0140",
    "name": "بيفي مربع امجاد كجم 3 [كرتون]",
    "emoji": "🥩",
    "brand": "امجاد",
    "category": "meat",
    "unit": "كرتون",
    "price": 1200,
    "currentStock": 4,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-140",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 4,
        "delta": 4,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0141",
    "name": "بيفي مربع بونو كجم 3 [قطعة]",
    "emoji": "🥩",
    "brand": "بونو",
    "category": "meat",
    "unit": "قطعة",
    "price": 275,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-141",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0142",
    "name": "بيفى مربع بونو كجم 3 [كرتون]",
    "emoji": "📦",
    "brand": "بونو",
    "category": "all",
    "unit": "كرتون",
    "price": 1650,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-142",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0143",
    "name": "تشيكن فينجرز ولعتين [كيس]",
    "emoji": "📦",
    "brand": "ولعتين",
    "category": "all",
    "unit": "كيس",
    "price": 245,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-143",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0144",
    "name": "جبنة آل إدريس [صفيحة]",
    "emoji": "🧀",
    "brand": "آل إدريس",
    "category": "dairy",
    "unit": "صفيحة",
    "price": 1475,
    "currentStock": 4460,
    "minCriticalThreshold": 892,
    "healthyThreshold": 2230,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-144",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 4460,
        "delta": 4460,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0145",
    "name": "جبنة فيتا 5 كجم [صندوق]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "صندوق",
    "price": 350,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-145",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0146",
    "name": "جبنه ابوسيف [صفيحه]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "صفيحه",
    "price": 107,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-146",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0147",
    "name": "جبنه ال ادريس كجم 2 [صفيحه]",
    "emoji": "🧀",
    "brand": "ال ادريس",
    "category": "dairy",
    "unit": "صفيحه",
    "price": 275,
    "currentStock": 33,
    "minCriticalThreshold": 7,
    "healthyThreshold": 17,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-147",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 33,
        "delta": 33,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0148",
    "name": "جبنه ال ادريس ك 5 [صفيحه]",
    "emoji": "🧀",
    "brand": "ال ادريس",
    "category": "dairy",
    "unit": "صفيحه",
    "price": 600,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-148",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0149",
    "name": "جبنه الامبراطور [صفيحه]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "صفيحه",
    "price": 1350,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-149",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0150",
    "name": "جبنه المائده [صفيحه]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "صفيحه",
    "price": 1100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-150",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0151",
    "name": "جبنه شيدر الحمد 500 جم [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 45.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-151",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0152",
    "name": "جبنه قديمه 1 كجم [علبة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "علبة",
    "price": 45,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-152",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0153",
    "name": "جبنه قديمه 2 كجم [علبة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "علبة",
    "price": 85,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-153",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0154",
    "name": "جلاش الجوهرة [لفة]",
    "emoji": "🍟",
    "brand": "الجوهرة",
    "category": "appetizers",
    "unit": "لفة",
    "price": 390,
    "currentStock": 13,
    "minCriticalThreshold": 3,
    "healthyThreshold": 7,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-154",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 13,
        "delta": 13,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0155",
    "name": "جلاش الجوهرة [قطعة]",
    "emoji": "🍟",
    "brand": "الجوهرة",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 13,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-155",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0156",
    "name": "جلاش ايزيس [لفة]",
    "emoji": "🍟",
    "brand": "ايزيس",
    "category": "appetizers",
    "unit": "لفة",
    "price": 340,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-156",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0157",
    "name": "جلاش ايزيس [قطعة]",
    "emoji": "🍟",
    "brand": "ايزيس",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 11.33,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-157",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0158",
    "name": "جمبري اماراتي صغير [كيس]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كيس",
    "price": 45,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-158",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0159",
    "name": "جمبري اماراتي عادي [كرتون]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كرتون",
    "price": 1080,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-159",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0160",
    "name": "جمبري اماراتي عادي [كيس]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كيس",
    "price": 142,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-160",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0161",
    "name": "جمبري اماراتي وسط [كرتون]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كرتون",
    "price": 2640,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-161",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0162",
    "name": "جمبري اماراتي وسط [كيس]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كيس",
    "price": 210,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-162",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0163",
    "name": "جمبري كرسبي ولعتين 1 كجم [كيس]",
    "emoji": "🐟",
    "brand": "ولعتين",
    "category": "meat",
    "unit": "كيس",
    "price": 700,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-163",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0164",
    "name": "جناح شيكيتيتا 700 جم [كيس]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كيس",
    "price": 100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-164",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0165",
    "name": "جناح مشوي اطياب 500 جم [علبة]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "علبة",
    "price": 255,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-165",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0166",
    "name": "جود بيف مربع كجم 2 [قطعة]",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "قطعة",
    "price": 175,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-166",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0167",
    "name": "جيفركس ملوخيه [قطعة]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 20,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.688Z",
    "auditHistory": [
      {
        "id": "aud-init-167",
        "date": "2026-08-19T13:14:50.688Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0168",
    "name": "جيفركس ملوخيه [كرتون]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 600,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-168",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0169",
    "name": "حكايه لانشون كجم 3 [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 345,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-169",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0170",
    "name": "حلاوه [كرتون]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 330,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-170",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0171",
    "name": "حلاوه [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 33,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-171",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0172",
    "name": "حلواني اخوان لانشون ك 5 [قطعة]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "قطعة",
    "price": 248,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-172",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0173",
    "name": "خضار مشكل بسمه [كرتون]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 300,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-173",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0174",
    "name": "خضار مشكل بسمه [كيس]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "كيس",
    "price": 22.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-174",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0175",
    "name": "خضار مشكل فوديكو [كرتون]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 480,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-175",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0176",
    "name": "خضار مشكل فوديكو [كيس]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كيس",
    "price": 24,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-176",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0177",
    "name": "خيار عادي 5 كجم [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 180,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-177",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0178",
    "name": "خيار قشه 4 كجم [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 650,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-178",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0179",
    "name": "داركينز كاتشب 10 [جركن]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "جركن",
    "price": 240,
    "currentStock": 11,
    "minCriticalThreshold": 2,
    "healthyThreshold": 6,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-179",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 11,
        "delta": 11,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0180",
    "name": "دبوس اطياب [كرتون]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كرتون",
    "price": 107,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-180",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0181",
    "name": "دبوس اطياب [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 7.64,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-181",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0182",
    "name": "دبوس شيكيتيتا جرام 700 [كيس]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كيس",
    "price": 100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-182",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0183",
    "name": "دبوس كوكي [كرتون]",
    "emoji": "🍗",
    "brand": "كوكي",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2800,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-183",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0184",
    "name": "دبوس كوكي [كيس]",
    "emoji": "🍗",
    "brand": "كوكي",
    "category": "poultry",
    "unit": "كيس",
    "price": 130,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-184",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0185",
    "name": "دجاج شانكس اطياب جم 400 [علبة]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "علبة",
    "price": 140,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-185",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0186",
    "name": "رائش GSF 3.200 كيلو [قطعة]",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "قطعة",
    "price": 265,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-186",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0187",
    "name": "رقاق مربع الزهار [علبة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "علبة",
    "price": 30,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-187",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0188",
    "name": "رول اطياب 250 جم [كرتون]",
    "emoji": "📦",
    "brand": "اطياب",
    "category": "all",
    "unit": "كرتون",
    "price": 1625,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-188",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0189",
    "name": "رول اطياب 250 جم [قطعة]",
    "emoji": "📦",
    "brand": "اطياب",
    "category": "all",
    "unit": "قطعة",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-189",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0190",
    "name": "رول حلوانى 250 جم [قطعة]",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "قطعة",
    "price": 85,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-190",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0191",
    "name": "رومى الحمد 1 ك [قطعه]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعه",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-191",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0192",
    "name": "رومي جديده كيلو",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كجم",
    "price": 225,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-192",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0193",
    "name": "رومي قديم كيلو",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كجم",
    "price": 240,
    "currentStock": 197.035,
    "minCriticalThreshold": 39,
    "healthyThreshold": 99,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-193",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 197.035,
        "delta": 197.035,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0194",
    "name": "رومي وسط كيلو",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كجم",
    "price": 230,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-194",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0195",
    "name": "زبده فيرن 1 ك [كرتون]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كرتون",
    "price": 1500,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-195",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0196",
    "name": "زبده فيرن 1 ك [قطعة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعة",
    "price": 150,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-196",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0197",
    "name": "زبده فيرن 500 جم [كرتون]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كرتون",
    "price": 380,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-197",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0198",
    "name": "زبده فيرن 500 جم [قطعة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعة",
    "price": 61,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-198",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0199",
    "name": "زيتون اخضر 10 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 260,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-199",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0200",
    "name": "زيتون اخضر 1 ك [علبة]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "علبة",
    "price": 27,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-200",
        "date": "2026-08-19T13:14:50.689Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0201",
    "name": "زيتون اخضر 5 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 450,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.689Z",
    "auditHistory": [
      {
        "id": "aud-init-201",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0202",
    "name": "زيتون اسمر 5 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 450,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-202",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0203",
    "name": "زيتون دولسي 5 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 375,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-203",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0204",
    "name": "زيتون شرائح 5 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 550,
    "currentStock": 9,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-204",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 9,
        "delta": 9,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0205",
    "name": "زيتون طبيعي 10 كجم [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 850,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-205",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0206",
    "name": "زيتون طبيعي 5 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 550,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-206",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0207",
    "name": "زيتون كلاماتا 10 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 725,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-207",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0208",
    "name": "زيتون كلاماتا 5 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 200,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-208",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0209",
    "name": "زيتون محشي جزر كجم 5 [علبة]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "علبة",
    "price": 550,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-209",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0210",
    "name": "زيتون مفدغ كجم 5 [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 450,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-210",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0211",
    "name": "سبانخ بسمه [قطعة]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 51,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-211",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0212",
    "name": "سجق اطياب 350 جم [كرتون]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "كرتون",
    "price": 2250,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-212",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0213",
    "name": "سجق اطياب 350 جم [طبق]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "طبق",
    "price": 133,
    "currentStock": 4,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-213",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 4,
        "delta": 4,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0214",
    "name": "سجق الجوكر 1 ك [قطعة]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "قطعة",
    "price": 36,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-214",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0215",
    "name": "سجق الجوكر 400 جم [كرتون]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "كرتون",
    "price": 738,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-215",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0216",
    "name": "سجق الجوكر 400 جم [طبق]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "طبق",
    "price": 41,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-216",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0217",
    "name": "سجق الحسن 400 جم [كرتون]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "كرتون",
    "price": 846,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-217",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0218",
    "name": "سجق الحسن 400 جم [طبق]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "طبق",
    "price": 47,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-218",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0219",
    "name": "سجق المذاق 300 جم [كرتون]",
    "emoji": "🥩",
    "brand": "المذاق",
    "category": "meat",
    "unit": "كرتون",
    "price": 405,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-219",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0220",
    "name": "سجق المذاق 300 جم",
    "emoji": "🥩",
    "brand": "المذاق",
    "category": "meat",
    "unit": "جرام",
    "price": 22.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-220",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0221",
    "name": "سجق المذاق 5 ك",
    "emoji": "🥩",
    "brand": "المذاق",
    "category": "meat",
    "unit": "وحدة",
    "price": 450,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-221",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0222",
    "name": "سجق حلواني 1 ك [قطعة]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "قطعة",
    "price": 60,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-222",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0223",
    "name": "سجق حلواني 400 جم [كرتون]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "كرتون",
    "price": 700,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-223",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0224",
    "name": "سجق حلواني 400 جم [طبق]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "طبق",
    "price": 112.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-224",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0225",
    "name": "سجق فحم سوبر فروزن 400gm [قطعة]",
    "emoji": "🥩",
    "brand": "سوبر فروزن",
    "category": "meat",
    "unit": "قطعة",
    "price": 100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-225",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0226",
    "name": "سجق كاترينج اطياب 1 كجم [كيس]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "كيس",
    "price": 222,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-226",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0227",
    "name": "سجق ميت شيف جم 320 [طبق]",
    "emoji": "🥩",
    "brand": "ميت شيف",
    "category": "meat",
    "unit": "طبق",
    "price": 37.5,
    "currentStock": 13,
    "minCriticalThreshold": 3,
    "healthyThreshold": 7,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-227",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 13,
        "delta": 13,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0228",
    "name": "سجق ميت شيف جم 320 [كرتون]",
    "emoji": "🥩",
    "brand": "ميت شيف",
    "category": "meat",
    "unit": "كرتون",
    "price": 675,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-228",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0229",
    "name": "سجق ميتلاند 1 ك [قطعة]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "قطعة",
    "price": 145,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-229",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0230",
    "name": "سجق ميتلاند جم 350 [كرتون]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "كرتون",
    "price": 1700,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-230",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0231",
    "name": "سجق ميتلاند 350 جم [طبق]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "طبق",
    "price": 85,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-231",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0232",
    "name": "سلامي دايم شرائح جم 500 [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 140,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-232",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0233",
    "name": "سلطة جبنه تحابيش 2.5 كجم [علبة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "علبة",
    "price": 125,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-233",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0234",
    "name": "سلطة مش بلدي [جردل]",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "جردل",
    "price": 350,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-234",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0235",
    "name": "سمبوسه ايزيس [قطعة]",
    "emoji": "🍟",
    "brand": "ايزيس",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 27,
    "currentStock": 40,
    "minCriticalThreshold": 8,
    "healthyThreshold": 20,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-235",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 40,
        "delta": 40,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0236",
    "name": "سمبوسه ايزيس [لفة]",
    "emoji": "🍟",
    "brand": "ايزيس",
    "category": "appetizers",
    "unit": "لفة",
    "price": 330,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-236",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0237",
    "name": "سمك فيليه ولعتين [كيس]",
    "emoji": "🐟",
    "brand": "ولعتين",
    "category": "meat",
    "unit": "كيس",
    "price": 270,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-237",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0238",
    "name": "سوجود كبده 400 جم [طبق]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "طبق",
    "price": 95,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-238",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0239",
    "name": "سي فود بالعضم [كرتون]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كرتون",
    "price": 450,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-239",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0240",
    "name": "سي فود بالعضم [قطعة]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 65,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-240",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0241",
    "name": "سي فود مخلي [كرتون]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كرتون",
    "price": 370,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-241",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0242",
    "name": "سي فود مخلي [قطعة]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 65,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-242",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0243",
    "name": "شاورمه أطياب 400 جم [علبة]",
    "emoji": "🥩",
    "brand": "أطياب",
    "category": "meat",
    "unit": "علبة",
    "price": 175,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-243",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0244",
    "name": "شرائح هالبينو [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 200,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-244",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0245",
    "name": "شطه بيبا [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 150,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-245",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0246",
    "name": "شوربة خضار بسمه [قطعة]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 300,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-246",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0247",
    "name": "شوربه سي فود 10/10",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "وحدة",
    "price": 65,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-247",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0248",
    "name": "شوكولاته كيكي [علبة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "علبة",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-248",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0249",
    "name": "شيش اطياب 1 ك [كرتون]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2743,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-249",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0250",
    "name": "شيش اطياب 1 ك [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 215,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-250",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0251",
    "name": "شيش اطياب 400 جم [علبة]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "علبة",
    "price": 175,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-251",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0252",
    "name": "شيش الوادى 900 جم [كيس]",
    "emoji": "🍗",
    "brand": "الوادى",
    "category": "poultry",
    "unit": "كيس",
    "price": 220,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-252",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0253",
    "name": "شيش وفير 900 جم [كيس]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "كيس",
    "price": 185,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-253",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0254",
    "name": "شيش ولعتين 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "ولعتين",
    "category": "poultry",
    "unit": "كيس",
    "price": 265,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-254",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0255",
    "name": "طرشي عادي [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 35,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-255",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0256",
    "name": "طرشي فاخر كجم 5 [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 135,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-256",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0257",
    "name": "طرشي لوكس كجم 5 [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 95,
    "currentStock": 27,
    "minCriticalThreshold": 5,
    "healthyThreshold": 14,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-257",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 27,
        "delta": 27,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0258",
    "name": "طيبه لانشون بسطرمه كجم 5 [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 1000,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-258",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0259",
    "name": "عرض ثلاثي فودينا [كيس]",
    "emoji": "📦",
    "brand": "فودينا",
    "category": "all",
    "unit": "كيس",
    "price": 100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-259",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0260",
    "name": "عرض موزاريتوس 100 ج [كيس]",
    "emoji": "📦",
    "brand": "موزاريتوس",
    "category": "all",
    "unit": "كيس",
    "price": 92.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-260",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0261",
    "name": "عرض موزاريتوس 100 ج [كرتون]",
    "emoji": "📦",
    "brand": "موزاريتوس",
    "category": "all",
    "unit": "كرتون",
    "price": 555,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-261",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0262",
    "name": "عيش سوري [كيس]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كيس",
    "price": 32,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-262",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0263",
    "name": "عيش سوري [لفة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "لفة",
    "price": 320,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-263",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0264",
    "name": "عيش كريب [كيس]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كيس",
    "price": 26.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-264",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0265",
    "name": "عيش كريب [لفة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "لفة",
    "price": 530,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-265",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0266",
    "name": "غازي موزاريلا 1 كجم [كيس]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كيس",
    "price": 100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-266",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0267",
    "name": "فاصوليا بسمه [قطعة]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 20,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-267",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0268",
    "name": "فاصوليا فوديكو [كرتون]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 320,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-268",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0269",
    "name": "فراوله فوديكو [قطعة]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 40,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-269",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0270",
    "name": "فرخه اطياب سمره + بطاطس [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 250,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-270",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0271",
    "name": "فرخه الاسطوره [جردل]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "جردل",
    "price": 220,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-271",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0272",
    "name": "فرخه كوكي [كرتون]",
    "emoji": "🍗",
    "brand": "كوكي",
    "category": "poultry",
    "unit": "كرتون",
    "price": 2160,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-272",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0273",
    "name": "فرخه كوكي [كيس]",
    "emoji": "🍗",
    "brand": "كوكي",
    "category": "poultry",
    "unit": "كيس",
    "price": 192,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-273",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0274",
    "name": "فرخه مقليه اطياب [كرتون]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1900,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-274",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0275",
    "name": "فرخه مقليه اطياب [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 210,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-275",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0276",
    "name": "فرخه مقليه شيكيتيتا [كيس]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كيس",
    "price": 170,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-276",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0277",
    "name": "فرخه مقليه شيكيتيتا [كرتون]",
    "emoji": "🍗",
    "brand": "شيكيتيتا",
    "category": "poultry",
    "unit": "كرتون",
    "price": 1700,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-277",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0278",
    "name": "فرنكفورتر حلواني [قطعة]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "قطعة",
    "price": 17,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-278",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0279",
    "name": "فلافل فول بسمه [قطعة]",
    "emoji": "📦",
    "brand": "بسمه",
    "category": "all",
    "unit": "قطعة",
    "price": 34,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-279",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0280",
    "name": "فلتو روستي 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "روستي",
    "category": "poultry",
    "unit": "كيس",
    "price": 220,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-280",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0281",
    "name": "فلتو روستي 1 كجم [كرتون]",
    "emoji": "🍗",
    "brand": "روستي",
    "category": "poultry",
    "unit": "كرتون",
    "price": 3300,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-281",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0282",
    "name": "فلفل مكسيكي 1 ك [علبه]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "علبه",
    "price": 16,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-282",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0283",
    "name": "فلفل مكسيكي [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 180,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-283",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0284",
    "name": "فودينا مشكل 400 جم [علبة]",
    "emoji": "📦",
    "brand": "فودينا",
    "category": "all",
    "unit": "علبة",
    "price": 41,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-284",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0285",
    "name": "فيتا فضه 1 كجم [علبة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "علبة",
    "price": 55,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-285",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0286",
    "name": "فيليه ابيض [كرتون]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كرتون",
    "price": 936,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-286",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0287",
    "name": "فيليه ابيض [قطعة]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 325,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-287",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0288",
    "name": "فيليه احمر [كرتون]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "كرتون",
    "price": 350,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-288",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0289",
    "name": "فيليه دجاج متبل 500 جم [قطعة]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "قطعة",
    "price": 205,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.690Z",
    "auditHistory": [
      {
        "id": "aud-init-289",
        "date": "2026-08-19T13:14:50.690Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0290",
    "name": "فيليه دجاج مشوي 500 جم [قطعة]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "قطعة",
    "price": 255,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-290",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0291",
    "name": "فيليه مشوي ولعتين 1 كجم [كيس]",
    "emoji": "🐟",
    "brand": "ولعتين",
    "category": "meat",
    "unit": "كيس",
    "price": 275,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-291",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0292",
    "name": "قشطه فراخ دايم 500 جم [قطعة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعة",
    "price": 2900,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-292",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0293",
    "name": "قلقاس بسمه [قطعة]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 27,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-293",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0294",
    "name": "قلقاس فوديكو [قطعة]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 33,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-294",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0295",
    "name": "كابوريا [قطعة]",
    "emoji": "🐟",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 35,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-295",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0296",
    "name": "كاتشب المذاق 10kg [قطعة]",
    "emoji": "🍟",
    "brand": "المذاق",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 195,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-296",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0297",
    "name": "كاتشب ظرف 500 [كرتون]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "كرتون",
    "price": 165,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-297",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0298",
    "name": "كازابلانكا 2.5 كجم [علبة]",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "علبة",
    "price": 125,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-298",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0299",
    "name": "كاليماري ولعتين 1 كجم [كيس]",
    "emoji": "🐟",
    "brand": "ولعتين",
    "category": "meat",
    "unit": "كيس",
    "price": 238,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-299",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0300",
    "name": "كباب مشكل فحم 800 جم [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 212,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-300",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0301",
    "name": "كبده شرائح المروة جم 350 [علبة]",
    "emoji": "🥩",
    "brand": "المروة",
    "category": "meat",
    "unit": "علبة",
    "price": 62.5,
    "currentStock": 41,
    "minCriticalThreshold": 8,
    "healthyThreshold": 21,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-301",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 41,
        "delta": 41,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0302",
    "name": "كبده شرايح جرام 400 [طبق]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "طبق",
    "price": 70,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-302",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0303",
    "name": "كبده شرايح جرام 200 [طبق]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "طبق",
    "price": 35,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-303",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0304",
    "name": "كبده شرايح 500 جرام [طبق]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "طبق",
    "price": 77,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-304",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0305",
    "name": "كريستال زبده 500 جم [قطعة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعة",
    "price": 67,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-305",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0306",
    "name": "كفتة حاتي اطياب 350 جم [قطعة]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "قطعة",
    "price": 49.75,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-306",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0307",
    "name": "كفتة فحم JUST FROZEN [كرتون]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "كرتون",
    "price": 2016,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-307",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0308",
    "name": "كفتة فحم سوبر فروزن 400gm [قطعة]",
    "emoji": "🥩",
    "brand": "سوبر فروزن",
    "category": "meat",
    "unit": "قطعة",
    "price": 92.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-308",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0309",
    "name": "كفتة فحم سوبر فروزن 400gm [كرتون]",
    "emoji": "🥩",
    "brand": "سوبر فروزن",
    "category": "meat",
    "unit": "كرتون",
    "price": 1850,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-309",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0310",
    "name": "كفتة فحم سوبر فروزن 800gm [قطعة]",
    "emoji": "🥩",
    "brand": "سوبر فروزن",
    "category": "meat",
    "unit": "قطعة",
    "price": 185,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-310",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0311",
    "name": "كفتة فحم سوبر فروزن 800gm [كرتون]",
    "emoji": "🥩",
    "brand": "سوبر فروزن",
    "category": "meat",
    "unit": "كرتون",
    "price": 1850,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-311",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0312",
    "name": "كفته اطياب 350 جم",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "جرام",
    "price": 2000,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-312",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0313",
    "name": "كفته اطياب 350 جم",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "جرام",
    "price": 112,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-313",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0314",
    "name": "كفته الجوكر 400 جم [كرتون]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "كرتون",
    "price": 630,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-314",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0315",
    "name": "كفته الجوكر 400 جم [طبق]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "طبق",
    "price": 35,
    "currentStock": 8,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-315",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 8,
        "delta": 8,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0316",
    "name": "كفته الجوكر 900 جم [كرتون]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "كرتون",
    "price": 600,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-316",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0317",
    "name": "كفته الجوكر 900 جم [قطعة]",
    "emoji": "🥩",
    "brand": "الجوكر",
    "category": "meat",
    "unit": "قطعة",
    "price": 75,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-317",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0318",
    "name": "كفته الحسن 400 جم [كرتون]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "كرتون",
    "price": 864,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-318",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0319",
    "name": "كفته الحسن 400 جم [طبق]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "طبق",
    "price": 48,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-319",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0320",
    "name": "كفته الرايق 1 ك [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 55,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-320",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0321",
    "name": "كفته المذاق كجم 1 [كرتون]",
    "emoji": "🥩",
    "brand": "المذاق",
    "category": "meat",
    "unit": "كرتون",
    "price": 825,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-321",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0322",
    "name": "كفته المذاق كجم 1 [قطعة]",
    "emoji": "🥩",
    "brand": "المذاق",
    "category": "meat",
    "unit": "قطعة",
    "price": 75,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-322",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0323",
    "name": "كفته المذاق 300 جم [كرتون]",
    "emoji": "🥩",
    "brand": "المذاق",
    "category": "meat",
    "unit": "كرتون",
    "price": 405,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-323",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0324",
    "name": "كفته حلواني 400 جم [كرتون]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "كرتون",
    "price": 700,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-324",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0325",
    "name": "كفته حلواني 400 جم [طبق]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "طبق",
    "price": 92,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-325",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0326",
    "name": "كفته شيكيتيتا 350 جم [كيس]",
    "emoji": "🥩",
    "brand": "شيكيتيتا",
    "category": "meat",
    "unit": "كيس",
    "price": 27,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-326",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0327",
    "name": "كفته شيكيتيتا 900 جم [كيس]",
    "emoji": "🥩",
    "brand": "شيكيتيتا",
    "category": "meat",
    "unit": "كيس",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-327",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0328",
    "name": "كفته فودينا 300 جم [طبق]",
    "emoji": "🥩",
    "brand": "فودينا",
    "category": "meat",
    "unit": "طبق",
    "price": 22.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-328",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0329",
    "name": "كفته كاترينج اطياب 1 كجم [قطعة]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "قطعة",
    "price": 250,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-329",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0330",
    "name": "كفته ميتح شيف 320 جم [طبق]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "طبق",
    "price": 37.5,
    "currentStock": 9,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-330",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 9,
        "delta": 9,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0331",
    "name": "كفته ميت شيف جم 320 [كرتون]",
    "emoji": "🥩",
    "brand": "ميت شيف",
    "category": "meat",
    "unit": "كرتون",
    "price": 675,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-331",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0332",
    "name": "كفته ميت شيف 900 جم [قطعة]",
    "emoji": "🥩",
    "brand": "ميت شيف",
    "category": "meat",
    "unit": "قطعة",
    "price": 75,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-332",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0333",
    "name": "كفته ميتلاند 1 ك [كرتون]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "كرتون",
    "price": 550,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-333",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0334",
    "name": "كفته ميتلاند 1 ك [قطعة]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "قطعة",
    "price": 65,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-334",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0335",
    "name": "كفته ميتلاند 400 جم [كرتون]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "كرتون",
    "price": 1400,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-335",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0336",
    "name": "كفته ميتلاند 400 جم [طبق]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "طبق",
    "price": 70,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-336",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0337",
    "name": "كوردن بلو 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "كيس",
    "price": 175,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-337",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0338",
    "name": "كوكتيل حلواني جم 400 [كرتون]",
    "emoji": "📦",
    "brand": "حلواني",
    "category": "all",
    "unit": "كرتون",
    "price": 800,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-338",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0339",
    "name": "كوكتيل حلواني 400 جم [طبق]",
    "emoji": "📦",
    "brand": "حلواني",
    "category": "all",
    "unit": "طبق",
    "price": 85,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-339",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0340",
    "name": "لارنج 5 [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 130,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-340",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0341",
    "name": "لانشون اطياب 5 ك [كرتون]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "كرتون",
    "price": 4900,
    "currentStock": 11,
    "minCriticalThreshold": 2,
    "healthyThreshold": 6,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-341",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 11,
        "delta": 11,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0342",
    "name": "لانشون اطياب 5 ك [قطعة]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "قطعة",
    "price": 1225,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-342",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0343",
    "name": "لانشون الحسن 1 ك [قطعة]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "قطعة",
    "price": 70,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-343",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0344",
    "name": "لانشون الحسن 3 ك [كرتون]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "كرتون",
    "price": 1500,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-344",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0345",
    "name": "لانشون الحسن 3 ك [قطعة]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "قطعة",
    "price": 250,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-345",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0346",
    "name": "لانشون الحسن جم 500 [قطعة]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "قطعة",
    "price": 36,
    "currentStock": 6,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-346",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 6,
        "delta": 6,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0347",
    "name": "لانشون الحسن جم 500 [كرتون]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "كرتون",
    "price": 1296,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-347",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0348",
    "name": "لانشون امجاد 500 جم [قطعة]",
    "emoji": "🥩",
    "brand": "امجاد",
    "category": "meat",
    "unit": "قطعة",
    "price": 35,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-348",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0349",
    "name": "لانشون بدور جرام 200 [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 15,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-349",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0350",
    "name": "لانشون بدور 400 جم [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 18,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-350",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0351",
    "name": "لانشون بونو 500 جم [قطعة]",
    "emoji": "🥩",
    "brand": "بونو",
    "category": "meat",
    "unit": "قطعة",
    "price": 45,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-351",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0352",
    "name": "لانشون تربو 3 ك [كرتون]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "كرتون",
    "price": 1320,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-352",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0353",
    "name": "لانشون تربو 3 ك [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 220,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-353",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0354",
    "name": "لانشون دجاج اطياب 2.5 ك [قطعة]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "قطعة",
    "price": 620,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-354",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0355",
    "name": "لانشون سلامي 1.5 ك [قالب]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قالب",
    "price": 150,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-355",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0356",
    "name": "لانشون سما 3 ك [قطعة]",
    "emoji": "🥩",
    "brand": "سما",
    "category": "meat",
    "unit": "قطعة",
    "price": 290,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-356",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0357",
    "name": "لانشون سما 3 ك [كرتون]",
    "emoji": "🥩",
    "brand": "سما",
    "category": "meat",
    "unit": "كرتون",
    "price": 1740,
    "currentStock": 114,
    "minCriticalThreshold": 23,
    "healthyThreshold": 57,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-357",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 114,
        "delta": 114,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0358",
    "name": "لانشون سما 5 ك [قطعة]",
    "emoji": "🥩",
    "brand": "سما",
    "category": "meat",
    "unit": "قطعة",
    "price": 145,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-358",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0359",
    "name": "لانشون صقر كجم 3 [قطعة]",
    "emoji": "🥩",
    "brand": "صقر",
    "category": "meat",
    "unit": "قطعة",
    "price": 260,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-359",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0360",
    "name": "لانشون صقر كجم 3 [كرتون]",
    "emoji": "🥩",
    "brand": "صقر",
    "category": "meat",
    "unit": "كرتون",
    "price": 1560,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-360",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0361",
    "name": "لانشون فراخ كجم 3 [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 210,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-361",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0362",
    "name": "لانشون فراخ 500 جم [قطعة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "قطعة",
    "price": 36,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-362",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0363",
    "name": "لانشون فودينا 3 ك [كرتون]",
    "emoji": "🥩",
    "brand": "فودينا",
    "category": "meat",
    "unit": "كرتون",
    "price": 1800,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-363",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0364",
    "name": "لانشون فودينا 3 ك [قطعة]",
    "emoji": "🥩",
    "brand": "فودينا",
    "category": "meat",
    "unit": "قطعة",
    "price": 300,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-364",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0365",
    "name": "لانشون فودينا 5 ك [كرتون]",
    "emoji": "🥩",
    "brand": "فودينا",
    "category": "meat",
    "unit": "كرتون",
    "price": 4100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-365",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0366",
    "name": "لانشون فودينا 5 ك [قطعة]",
    "emoji": "🥩",
    "brand": "فودينا",
    "category": "meat",
    "unit": "قطعة",
    "price": 1025,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-366",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0367",
    "name": "لانشون ميتلاند 3 ك [سوال]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "سوال",
    "price": 3250,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-367",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0368",
    "name": "لانشون ميتلاند 3 ك [قطعة]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "قطعة",
    "price": 325,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-368",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0369",
    "name": "لانشون ميتلاند 5 كجم [قالب]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "قالب",
    "price": 24000,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-369",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0370",
    "name": "لانشون ميتلاند بيف 3 ك [سوال]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "سوال",
    "price": 3500,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-370",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0371",
    "name": "لانشون ميتلاند بيف 3 ك [قطعة]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "قطعة",
    "price": 350,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-371",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0372",
    "name": "لهاليبو 3 ك [علبة]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "علبة",
    "price": 75,
    "currentStock": 39,
    "minCriticalThreshold": 8,
    "healthyThreshold": 20,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-372",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 39,
        "delta": 39,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0373",
    "name": "ليمون اخضر 1 ك [علبة]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "علبة",
    "price": 16,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-373",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0374",
    "name": "ليمون اخضر 5 ك [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 175,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-374",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0375",
    "name": "ليمون معصفر 1 ك [علبة]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "علبة",
    "price": 16,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-375",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0376",
    "name": "ليمون معصفر [جردل]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "جردل",
    "price": 140,
    "currentStock": 3,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-376",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 3,
        "delta": 3,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0377",
    "name": "مايونيز 250 جم [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 180,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-377",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0378",
    "name": "مخلل فاخر 1 ك [علبه]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "علبه",
    "price": 16,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-378",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0379",
    "name": "مخلل فاخر 2 ك [علبه]",
    "emoji": "🫒",
    "brand": "عام",
    "category": "pickles",
    "unit": "علبه",
    "price": 60,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-379",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0380",
    "name": "مسحب ملوك الخير 1 كجم [علبة]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "علبة",
    "price": 270,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-380",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0381",
    "name": "مسحب ملوك الخير 400 جم [علبة]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "علبة",
    "price": 128,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-381",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0382",
    "name": "مسحب ولعتين 1 كجم [كيس]",
    "emoji": "🍗",
    "brand": "ولعتين",
    "category": "poultry",
    "unit": "كيس",
    "price": 315,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-382",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0383",
    "name": "مفروم صافي المريم 350 جم [علبة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "علبة",
    "price": 100,
    "currentStock": 32,
    "minCriticalThreshold": 6,
    "healthyThreshold": 16,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-383",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 32,
        "delta": 32,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0384",
    "name": "مفروم الحسن جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "الحسن",
    "category": "meat",
    "unit": "كرتون",
    "price": 486,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-384",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0385",
    "name": "مفروم حلواني [كرتون]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "كرتون",
    "price": 740,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-385",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0386",
    "name": "مفروم حلواني [طبق]",
    "emoji": "🥩",
    "brand": "حلواني",
    "category": "meat",
    "unit": "طبق",
    "price": 36,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-386",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0387",
    "name": "مفروم صافي سايب كيلو",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "كجم",
    "price": 245,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-387",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0388",
    "name": "مفروم مشغول جرام 200 [طبق]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "طبق",
    "price": 45,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.691Z",
    "auditHistory": [
      {
        "id": "aud-init-388",
        "date": "2026-08-19T13:14:50.691Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0389",
    "name": "مفروم مشغول جرام 350 [طبق]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "طبق",
    "price": 63,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-389",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0390",
    "name": "مفروم مشغول جرام 400 [طبق]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "طبق",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-390",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0391",
    "name": "ملوخيه اجا [كرتون]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 200,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-391",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0392",
    "name": "ملوخيه اجا [كيس]",
    "emoji": "🥦",
    "brand": "عام",
    "category": "vegetables",
    "unit": "كيس",
    "price": 10,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-392",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0393",
    "name": "ملوخيه بسمه [كرتون]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 400,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-393",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0394",
    "name": "ملوخيه بسمه [كيس]",
    "emoji": "🥦",
    "brand": "بسمه",
    "category": "vegetables",
    "unit": "كيس",
    "price": 20,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-394",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0395",
    "name": "ملوخيه فوديكو [كرتون]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كرتون",
    "price": 400,
    "currentStock": 9,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-395",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 9,
        "delta": 9,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0396",
    "name": "ملوخيه فوديكو [كيس]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "كيس",
    "price": 20,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-396",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0397",
    "name": "ممبار العابد 5 متر [علبة]",
    "emoji": "🥩",
    "brand": "العابد",
    "category": "meat",
    "unit": "علبة",
    "price": 37,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-397",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0398",
    "name": "منتج ملغي [علبة]",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "علبة",
    "price": 1,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-398",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0399",
    "name": "موزاريلا الأطباء 1 ك [قطعه]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعه",
    "price": 170,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-399",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0400",
    "name": "موزاريلا الأطباء جم 500 [قطعه]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعه",
    "price": 85,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-400",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0401",
    "name": "موزاريلا الحمد كجم 1 [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 138,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-401",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0402",
    "name": "موزاريلا الحمد 1 كجم [كرتون]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "كرتون",
    "price": 1380,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-402",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0403",
    "name": "موزاريلا الحمد 200 جم [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 29,
    "currentStock": 15,
    "minCriticalThreshold": 3,
    "healthyThreshold": 8,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-403",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 15,
        "delta": 15,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0404",
    "name": "موزاريلا الحمد جم 200 [كرتون]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "كرتون",
    "price": 1450,
    "currentStock": 6,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-404",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 6,
        "delta": 6,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0405",
    "name": "موزاريلا الحمد 400 جم [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 58,
    "currentStock": 13,
    "minCriticalThreshold": 3,
    "healthyThreshold": 7,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-405",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 13,
        "delta": 13,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0406",
    "name": "موزاريلا الحمد جم 400 [كرتون]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "كرتون",
    "price": 1450,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-406",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0407",
    "name": "موزاريلا الحمد 500 جم [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 72.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-407",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0408",
    "name": "موزاريلا الحمد جم 500 [كرتون]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "كرتون",
    "price": 1450,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-408",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0409",
    "name": "موزاريلا الحياه 1 ك [لفة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "لفة",
    "price": 430,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-409",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0410",
    "name": "موزاريلا الحياه 1 ك [كيس]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كيس",
    "price": 43,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-410",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0411",
    "name": "موزاريلا الحياه السوري [كيس]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كيس",
    "price": 80,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-411",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0412",
    "name": "موزاريلا تيب توب جم 200 [قطعة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعة",
    "price": 25,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-412",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0413",
    "name": "موزاريلا فور بيتزا 1 كجم [كرتون]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كرتون",
    "price": 1350,
    "currentStock": 6,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-413",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 6,
        "delta": 6,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0414",
    "name": "موزاريلا فور بيتزا 1 كجم [قطعة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعة",
    "price": 135,
    "currentStock": 5,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-414",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 5,
        "delta": 5,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0415",
    "name": "موزاريلا فوربيتزا جم 200 [كرتون]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كرتون",
    "price": 1120,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-415",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0416",
    "name": "فور بيتزا 200 [قطعة]",
    "emoji": "📦",
    "brand": "عام",
    "category": "all",
    "unit": "قطعة",
    "price": 28,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-416",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0417",
    "name": "موزاريلا فوربيتزا جم 320 [كرتون]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كرتون",
    "price": 500,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-417",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0418",
    "name": "موزاريلا فور بيتزا جم 320 [قطعة]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "قطعة",
    "price": 20,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-418",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0419",
    "name": "موزاريلا فور بيتزا 500 جم [كيس]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كيس",
    "price": 65,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-419",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0420",
    "name": "موزاريلا فور بيتزا جم 500 [كرتون]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كرتون",
    "price": 1040,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-420",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0421",
    "name": "موزاريلا وان 1 ك [كرتون]",
    "emoji": "🧀",
    "brand": "عام",
    "category": "dairy",
    "unit": "كرتون",
    "price": 420,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-421",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0422",
    "name": "ميتكو هوت دوج كجم 5 [كيس]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "كيس",
    "price": 590,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-422",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0423",
    "name": "ميكس الحمد كجم 1 [لفة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "لفة",
    "price": 1320,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-423",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0424",
    "name": "ميكس الحمد كجم 1 [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 132,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-424",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0425",
    "name": "200 ميكس الحمد جم [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 28,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-425",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0426",
    "name": "200 ميكس الحمد جم [كرتون]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "كرتون",
    "price": 1400,
    "currentStock": 1,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-426",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 1,
        "delta": 1,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0427",
    "name": "500 ميكس الحمد جم [قطعة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "قطعة",
    "price": 67.5,
    "currentStock": 16,
    "minCriticalThreshold": 3,
    "healthyThreshold": 8,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-427",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 16,
        "delta": 16,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0428",
    "name": "500 ميكس الحمد جم [لفة]",
    "emoji": "🥩",
    "brand": "الحمد",
    "category": "meat",
    "unit": "لفة",
    "price": 1350,
    "currentStock": 2,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.692Z",
    "auditHistory": [
      {
        "id": "aud-init-428",
        "date": "2026-08-19T13:14:50.692Z",
        "quantity": 2,
        "delta": 2,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0429",
    "name": "300 ميكس تيلا جم [قطعة]",
    "emoji": "🧀",
    "brand": "تيلا",
    "category": "dairy",
    "unit": "قطعة",
    "price": 42.5,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-429",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0430",
    "name": "900 ميكس تيلا جم [علبة]",
    "emoji": "🧀",
    "brand": "تيلا",
    "category": "dairy",
    "unit": "علبة",
    "price": 89,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-430",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0431",
    "name": "ميكس موزاريتوس جم 250 [قطعة]",
    "emoji": "🧀",
    "brand": "موزاريتوس",
    "category": "dairy",
    "unit": "قطعة",
    "price": 36,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-431",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0432",
    "name": "500 ميكس موزاريتوس جم [لفة]",
    "emoji": "🧀",
    "brand": "موزاريتوس",
    "category": "dairy",
    "unit": "لفة",
    "price": 880,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-432",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0433",
    "name": "ميكس موزاريتوس جم 500 [قطعة]",
    "emoji": "🧀",
    "brand": "موزاريتوس",
    "category": "dairy",
    "unit": "قطعة",
    "price": 75,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-433",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0434",
    "name": "ناجتس اطياب 1 ك [كيس]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "كيس",
    "price": 200,
    "currentStock": 8,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-434",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 8,
        "delta": 8,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0435",
    "name": "400 ناجتس اطياب جم [علبة]",
    "emoji": "🍗",
    "brand": "اطياب",
    "category": "poultry",
    "unit": "علبة",
    "price": 120,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-435",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0436",
    "name": "400 ناجتس المرح جم [علبة]",
    "emoji": "🍗",
    "brand": "عام",
    "category": "poultry",
    "unit": "علبة",
    "price": 87,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-436",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0437",
    "name": "نقانق سوري مشكل [علبة]",
    "emoji": "🥩",
    "brand": "عام",
    "category": "meat",
    "unit": "علبة",
    "price": 36,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-437",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0438",
    "name": "هامونيز كاتشب 1 كجم [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 38,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-438",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0439",
    "name": "هامونيز مايونيز 1 كجم [قطعة]",
    "emoji": "🍟",
    "brand": "عام",
    "category": "appetizers",
    "unit": "قطعة",
    "price": 55,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-439",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0440",
    "name": "هوت دوج اطياب 1 ك [قطعة]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "قطعة",
    "price": 215,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-440",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0441",
    "name": "هوت دوج اطياب 1 ك [كرتون]",
    "emoji": "🥩",
    "brand": "اطياب",
    "category": "meat",
    "unit": "كرتون",
    "price": 2520,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-441",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0442",
    "name": "هوت دوج فودينا 1 ك [قطعة]",
    "emoji": "🥩",
    "brand": "فودينا",
    "category": "meat",
    "unit": "قطعة",
    "price": 100,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-442",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0443",
    "name": "هوت دوج ميتلاند 1 ك [كيس]",
    "emoji": "🥩",
    "brand": "ميتلاند",
    "category": "meat",
    "unit": "كيس",
    "price": 160,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-443",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0444",
    "name": "وجبة دجاج ولعتين [كيس]",
    "emoji": "🍗",
    "brand": "ولعتين",
    "category": "poultry",
    "unit": "كيس",
    "price": 290,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-444",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  },
  {
    "id": "prod-swar-0445",
    "name": "ورق عنب فوديكو [قطعة]",
    "emoji": "🥦",
    "brand": "فوديكو",
    "category": "vegetables",
    "unit": "قطعة",
    "price": 33,
    "currentStock": 0,
    "minCriticalThreshold": 2,
    "healthyThreshold": 5,
    "freezerLocation": "ثلاجة العرض والمخزن",
    "notes": "",
    "createdAt": "2026-08-19T13:14:50.693Z",
    "auditHistory": [
      {
        "id": "aud-init-445",
        "date": "2026-08-19T13:14:50.693Z",
        "quantity": 0,
        "delta": 0,
        "auditor": "مسؤول الجرد",
        "notes": "الرصيد الافتتاحي المحدث"
      }
    ]
  }
];
