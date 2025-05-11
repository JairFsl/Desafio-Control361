import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface FilterSearchProps {
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onNewClick: VoidFunction;
}

const FilterSearch = ({
  filterValue,
  setFilterValue,
  searchValue,
  setSearchValue,
  onNewClick,
}: FilterSearchProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="flex flex-row w-full justify-between items-center text-white md:justify-start md:gap-32">
        <h1 className="font-poppins">Lista</h1>
        <RadioGroup
          value={filterValue}
          onValueChange={setFilterValue}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="tracked"
              id="tracked"
              className={`
                peer
                relative
                w-5 h-5
                border-2 border-blue-500
                rounded-full
                outline-none
                transition-colors
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                data-[state=checked]:bg-transparent
                data-[state=checked]:after:content-['']
                data-[state=checked]:after:absolute
                data-[state=checked]:after:top-1/2
                data-[state=checked]:after:left-1/2
                data-[state=checked]:after:-translate-x-1/2
                data-[state=checked]:after:-translate-y-1/2
                data-[state=checked]:after:w-2.5
                data-[state=checked]:after:h-2.5
                data-[state=checked]:after:rounded-full
                data-[state=checked]:after:bg-blue-500
              `}
            />
            <Label htmlFor="tracked" className="text-white font-inter">
              Rastreados
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="others"
              id="others"
              className={`
                peer
                relative
                w-5 h-5
                border-2 border-blue-500
                rounded-full
                outline-none
                transition-colors
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                data-[state=checked]:bg-transparent
                data-[state=checked]:after:content-['']
                data-[state=checked]:after:absolute
                data-[state=checked]:after:top-1/2
                data-[state=checked]:after:left-1/2
                data-[state=checked]:after:-translate-x-1/2
                data-[state=checked]:after:-translate-y-1/2
                data-[state=checked]:after:w-2.5
                data-[state=checked]:after:h-2.5
                data-[state=checked]:after:rounded-full
                data-[state=checked]:after:bg-blue-500
              `}
            />
            <Label htmlFor="others" className="text-white font-inter">
              Outros
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-row gap-3 h-[40px] w-full md:max-w-xl">
        <Input
          alt="Input de busca por placa ou frota"
          placeholder="Buscar por placa ou frota"
          className="h-auto text-white"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          className="bg-[#0796e3] hover:bg-[#0796e3b8] h-auto w-[100px]"
          onClick={onNewClick}
        >
          Novo
        </Button>
      </div>
    </div>
  );
};

export default FilterSearch;
