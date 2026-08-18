/**
 * Smart Arabic & English keyword-based emoji detection for frozen foods & groceries
 */
export const FROZEN_FOOD_EMOJIS = [
  '🍗', '🥩', '🍔', '🍟', '🥟', '🐟', '🍤', '🥦', '🥕', '🌭', 
  '🥙', '🍕', '🧀', '🧆', '🌽', '🫑', '🦑', '🦀', '🥓', '🍖', 
  '🍦', '🍓', '🍰', '🧇', '🥞', '🥐', '🍲', '🍱', '🥣', '🧊',
  '📦', '🏷️', '🍽️', '🥗'
];

export const suggestEmojiForProductName = (name = '', category = '') => {
  const text = (name + ' ' + category).toLowerCase();

  // Poultry & Chicken
  if (text.includes('ستربس') || text.includes('دجاج') || text.includes('فراخ') || text.includes('شاورما دجاج') || text.includes('ناجتس') || text.includes('chicken') || text.includes('strips') || text.includes('nuggets')) {
    return '🍗';
  }
  // Pane
  if (text.includes('بانيه') || text.includes('pane') || text.includes('شنيتزل') || text.includes('schnitzel')) {
    return '🥩';
  }
  // Burger
  if (text.includes('برجر') || text.includes('بورجر') || text.includes('burger')) {
    return '🍔';
  }
  // Fries & Potatoes
  if (text.includes('بطاطس') || text.includes('فريس') || text.includes('فريتس') || text.includes('fries') || text.includes('potato') || text.includes('pommes')) {
    return '🍟';
  }
  // Sambousek & Pastries
  if (text.includes('سمبوسك') || text.includes('سمبوسة') || text.includes('فطائر') || text.includes('عجينة') || text.includes('بف') || text.includes('pastry') || text.includes('sambousek')) {
    return '🥟';
  }
  // Fish & Seafood
  if (text.includes('سمك') || text.includes('فيليه') || text.includes('بياض') || text.includes('بلطي') || text.includes('سالمون') || text.includes('fish') || text.includes('fillet')) {
    return '🐟';
  }
  if (text.includes('جمبري') || text.includes('روبيان') || text.includes('كابوريا') || text.includes('shrimp') || text.includes('prawn')) {
    return '🍤';
  }
  if (text.includes('سبيط') || text.includes('كاليماري') || text.includes('squid') || text.includes('calamari')) {
    return '🦑';
  }
  // Meat & Kofta & Sausages
  if (text.includes('كفتة') || text.includes('سجق') || text.includes('سوسيس') || text.includes('هوت دوج') || text.includes('sausage') || text.includes('hotdog')) {
    return '🌭';
  }
  if (text.includes('لحم') || text.includes('مفروم') || text.includes('ستيك') || text.includes('كندوز') || text.includes('ضاني') || text.includes('beef') || text.includes('meat') || text.includes('steak')) {
    return '🥩';
  }
  if (text.includes('شاورما لحم') || text.includes('كباب') || text.includes('كبيبة')) {
    return '🥙';
  }
  // Vegetables
  if (text.includes('بسلة') || text.includes('فاصوليا') || text.includes('خضار') || text.includes('بروكلي') || text.includes('سبانخ') || text.includes('ملوخية') || text.includes('veggie') || text.includes('broccoli')) {
    return '🥦';
  }
  if (text.includes('جزر') || text.includes('carrot')) {
    return '🥕';
  }
  if (text.includes('ذرة') || text.includes('corn')) {
    return '🌽';
  }
  if (text.includes('فلفل') || text.includes('pepper')) {
    return '🫑';
  }
  // Cheese & Pizza
  if (text.includes('جبنة') || text.includes('موزاريلا') || text.includes('شيدر') || text.includes('cheese') || text.includes('mozzarella')) {
    return '🧀';
  }
  if (text.includes('بيتزا') || text.includes('pizza')) {
    return '🍕';
  }
  if (text.includes('فلافل') || text.includes('طعمية') || text.includes('falafel')) {
    return '🧆';
  }
  // Desserts / Frozen treats
  if (text.includes('ايس كريم') || text.includes('آيس كريم') || text.includes('ice cream')) {
    return '🍦';
  }
  if (text.includes('فراولة') || text.includes('توت') || text.includes('strawberry') || text.includes('berries')) {
    return '🍓';
  }

  // Category fallbacks
  if (category === 'poultry') return '🍗';
  if (category === 'meat') return '🥩';
  if (category === 'seafood') return '🐟';
  if (category === 'vegetables') return '🥦';
  if (category === 'appetizers') return '🥟';

  return '🧊';
};
