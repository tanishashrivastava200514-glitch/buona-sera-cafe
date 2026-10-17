// Placeholder WhatsApp number — replace with the cafe's real number (country code, digits only).
export const WHATSAPP_NUMBER = "919999999999";

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export type Dish = { name: string; price: number; desc?: string; veg?: boolean };

export const signature: Dish[] = [
  { name: "Chicken Espetada", price: 525, desc: "Boneless thigh, cafreal paste, spiced yogurt — off the sigri" },
  { name: "Alfredo Pasta", price: 545, desc: "Rich, creamy white sauce, generous melted cheese", veg: true },
  { name: "Farm House Pizza", price: 655, desc: "Wood-fired, tomato, mozzarella & garden vegetables", veg: true },
  { name: "Trilogy", price: 425, desc: "Hummus, falafel & warm pita — a mezze classic", veg: true },
  { name: "Mocha", price: 329, desc: "Handcrafted espresso, cocoa, steamed milk", veg: true },
];

export const menu: { title: string; items: Dish[] }[] = [
  { title: "Wood-Fired Pizza", items: [
    { name: "Margherita", price: 515, veg: true, desc: "Tomato, mozzarella, bocconcini, basil" },
    { name: "Quattro Formaggi", price: 549, veg: true, desc: "Four cheese, arugula, pickled aioli" },
    { name: "Fungi", price: 525, veg: true, desc: "Slow-cooked mushroom, smoked cheese" },
    { name: "Smoked Chicken", price: 695, desc: "Roasted garlic, arugula, balsamic" },
    { name: "Peri Peri Chicken", price: 579 },
    { name: "Lamb Pizza", price: 599, desc: "Minced lamb, rosemary, cherry mozzarella" },
  ]},
  { title: "Pasta & Plates", items: [
    { name: "Alfredo Pasta", price: 545, veg: true },
    { name: "Aglio Olio", price: 525, veg: true },
    { name: "Koobideh Kebab", price: 625, desc: "Ground lamb, smoked red glaze" },
    { name: "Chicken Shish Taouk", price: 495 },
    { name: "Avocado & Quinoa Salad", price: 495, veg: true },
    { name: "Chicken Wings", price: 525, desc: "BBQ · Jamaican jerk · peri peri" },
  ]},
  { title: "Signature Coffee", items: [
    { name: "Salted Caramel Mocha Latte", price: 399, veg: true },
    { name: "Coastal Mix", price: 399, veg: true, desc: "Pineapple, coconut, maple, iced espresso" },
    { name: "Cranberry Coffee", price: 399, veg: true },
    { name: "Flat White", price: 349, veg: true },
    { name: "Cappuccino", price: 299, veg: true },
    { name: "Affogato", price: 369, veg: true },
  ]},
  { title: "Matcha, Shakes & Mocktails", items: [
    { name: "Strawberry Matcha", price: 359, veg: true },
    { name: "Watermelon Matcha Tonic", price: 359, veg: true },
    { name: "Crunchy Nutella Monster Shake", price: 459, veg: true },
    { name: "Parle-G Nutella Shake", price: 389, veg: true },
    { name: "Passionate Kiss", price: 349, veg: true, desc: "Passion fruit, orange, mint, fizz" },
    { name: "Virgin Sangria", price: 349, veg: true },
  ]},
];
