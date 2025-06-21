// import { Badge } from "./ui/badge";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { useNavigateWithLocale } from "react-router-dom";

// const SuggestedCategories = () => {
//   const navigate = useNavigateWithLocale();

//   const handleTagClick = (tag: string) => {
//     navigate(`/explore?tags=${encodeURIComponent(tag)}`);
//   };

//   return (
//     <div className="flex flex-wrap gap-3">
//       {suggetedCategories.map((cat, index) => (
//         <Badge
//           key={index}
//           className="bg-[rgba(150,150,150)]/[0.5] text-white text-sm cursor-pointer"
//           onClick={() => handleTagClick(cat)}
//         >
//           <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-1" />
//           {cat}
//         </Badge>
//       ))}
//     </div>
//   );
// };

// export default SuggestedCategories;
