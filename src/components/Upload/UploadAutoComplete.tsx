import { Option } from "@/models/option";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, TextField } from "@mui/material";

const UploadAutoComplete = ({
  label,
  values,
  setSelectedValues,
}: {
  label: string;
  values: Option[];
  setSelectedValues: (value: Option[]) => void;
}) => {
  return (
    <Autocomplete
      multiple
      className="border border-gray-400 w-full min-h-[45px] px-3 flex justify-center items-center placeholder:text-gray-600"
      id="tags-standard"
      options={values}
      getOptionLabel={(option) => option.name}
      onChange={(_event, values) => {
        setSelectedValues(values);
      }}
      renderTags={(value: Option[], getTagProps) => {
        return value.map((val, index) => (
          <div
            key={val.id}
            className="rounded-md px-1 border bg-[#e4e4e4] mx-1 text-black text-sm flex gap-2 items-center"
          >
            <FontAwesomeIcon
              icon={faClose}
              className="size-[12px] cursor-pointer"
              onClick={(e) => getTagProps({ index }).onDelete(e)}
            />
            {val.name}
          </div>
        ));
      }}
      renderInput={(params) => {
        params.InputProps.endAdornment = "";
        return (
          <TextField
            className="!min-h-[45px] !m-0 !p-0 !flex  justify-center items-center !placeholder:text-red-600"
            {...params}
            variant="standard"
            placeholder={label}
          />
        );
      }}
    />
  );
};

export default UploadAutoComplete;
