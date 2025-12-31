import { Dispatch } from "react";
import { SetStateAction } from "react";

import CreateNaap from "./CreateNaap";

import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type FilterSearchProps = {
  filterText: string;
  setFilterText: Dispatch<SetStateAction<string>>;
};
export default function FilterSearch({
  filterText,
  setFilterText,
}: FilterSearchProps) {
  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Enter Phone Number"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
