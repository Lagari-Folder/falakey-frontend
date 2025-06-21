import { Collection } from "@/models/collection";
import { Tag } from "@/models/tag";
import {
  faPinterest,
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const types = [
  { title: "Photo", key: "photo" },
  { title: "Video", key: "video" },
  { title: "Vectors", key: "vectors" },
];

export const categories = [
  { name: "Wallpaper", key: "wallpaper" },
  { name: "Health & Wellness", key: "health-wellness" },
  { name: "Business & Work", key: "business-work" },
  { name: "Textures & Patterns", key: "textures-patterns" },
  { name: "Food", key: "food" },
  { name: "Summer", key: "summer" },
  { name: "Architecture & Interiors", key: "architecture-interiors" },
  { name: "Street Photography", key: "street-photography" },
  { name: "Wallpaper", key: "wallpaper" },
  { name: "Health & Wellness", key: "health-wellness" },
  { name: "Business & Work", key: "business-work" },
  { name: "Textures & Patterns", key: "textures-patterns" },
  { name: "Food", key: "food" },
  { name: "Summer", key: "summer" },
  { name: "Architecture & Interiors", key: "architecture-interiors" },
  { name: "Street Photography", key: "street-photography" },
  { name: "Wallpaper", key: "wallpaper" },
  { name: "Health & Wellness", key: "health-wellness" },
  { name: "Business & Work", key: "business-work" },
  { name: "Textures & Patterns", key: "textures-patterns" },
  { name: "Food", key: "food" },
  { name: "Summer", key: "summer" },
  { name: "Architecture & Interiors", key: "architecture-interiors" },
  { name: "Street Photography", key: "street-photography" },
];

export const tags: Tag[] = [
  { id: 0, name: "Food", key: "" },
  { id: 1, name: "Sport", key: "" },
  { id: 2, name: "Nature & Travel", key: "" },
  { id: 3, name: "Architecture", key: "" },
];
export const collections: Collection[] = [
  { id: 0, name: "Collection 1", key: "" },
  { id: 1, name: "Collection 2", key: "" },
  { id: 2, name: "Collection 3", key: "" },
  { id: 3, name: "Collection 4", key: "" },
  { id: 4, name: "Collection 5", key: "" },
  { id: 5, name: "Collection 6", key: "" },
];

export const socialMdeiaShare = [
  {
    icon: faFacebook,
    title: "Facebook",
    key: "facebook",
  },
  {
    icon: faPinterest,
    title: "Pinterest",
    key: "pinterest",
  },
  {
    icon: faTwitter,
    title: "Twitter",
    key: "twitter",
  },
  {
    icon: faWhatsapp,
    title: "Whatsapp",
    key: "whatsapp",
  },
  {
    icon: faEnvelope,
    title: "Email",
    key: "email",
  },
];

export const downloadType = [
  {
    title: "Thumbnail",
    size: "150 x 150",
    link: "",
  },
  {
    title: "Medium",
    size: "300 x 200",
    link: "",
  },
  {
    title: "Large",
    size: "640 x 427",
    link: "",
  },
  {
    title: "Full",
    size: "2560 x 1707",
    link: "",
  },
];

export const collectionsData = [
  {
    images: [
      "https://picsum.photos/420/800?random=1",
      "https://picsum.photos/420/800?random=2",
      "https://picsum.photos/420/800?random=3",
    ],
    title: "Cars",
    tags: [
      "Header",
      "Footer Column Front Pages",
      "Free",
      "Mobile Menu",
      "Variable Subscription",
      "Footer Column Listings",
      "3D",
    ],
  },
  {
    images: [
      "https://picsum.photos/420/800?random=4",
      "https://picsum.photos/420/800?random=5",
      "https://picsum.photos/420/800?random=6",
    ],
    title: "Street photography",
    tags: [
      "Header",
      "Footer Column Front Pages",
      "Free",
      "Mobile Menu",
      "Variable Subscription",
      "Footer Column Listings",
      "3D",
    ],
  },
  {
    images: [
      "https://picsum.photos/420/800?random=7",
      "https://picsum.photos/420/800?random=8",
      "https://picsum.photos/420/800?random=9",
    ],
    title: "Architecture & Interiors",
    tags: [
      "Header",
      "Footer Column Front Pages",
      "Free",
      "Mobile Menu",
      "Variable Subscription",
      "Footer Column Listings",
      "3D",
    ],
  },
  {
    images: [
      "https://picsum.photos/420/800?random=10",
      "https://picsum.photos/420/800?random=11",
      "https://picsum.photos/420/800?random=12",
    ],
    title: "Nature & Travel",
    tags: [
      "Header",
      "Footer Column Front Pages",
      "Free",
      "Mobile Menu",
      "Variable Subscription",
      "Footer Column Listings",
      "3D",
    ],
  },
];

