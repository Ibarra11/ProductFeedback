import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
function Dropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span>Sort by:</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Least Comments</DropdownMenu.Item>
          <DropdownMenu.Item>Most Comments</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Dropdown;
