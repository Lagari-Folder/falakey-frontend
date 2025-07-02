
const ContentTypeText = ({
  text,
  icon,
  color,
}: {
  text: string;
  icon: string;
  color: string;
}) => {
  return (
    <div className="mt-3 flex gap-1 items-center text-sm text-gray-600 bg-blue-50 p-2 rounded">
      <i className={`${icon} text-${color} mr-2`} />
      {text}
    </div>
  );
};

export default ContentTypeText;
