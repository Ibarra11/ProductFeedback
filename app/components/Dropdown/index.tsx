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

// export default () => (
//   <DropdownMenu.Root>
//     <DropdownMenu.Trigger />

//     <DropdownMenu.Portal>
//       <DropdownMenu.Content>
//         <DropdownMenu.Label />
//         <DropdownMenu.Item />

//         <DropdownMenu.Group>
//           <DropdownMenu.Item />
//         </DropdownMenu.Group>

//         <DropdownMenu.CheckboxItem>
//           <DropdownMenu.ItemIndicator />
//         </DropdownMenu.CheckboxItem>

//         <DropdownMenu.RadioGroup>
//           <DropdownMenu.RadioItem>
//             <DropdownMenu.ItemIndicator />
//           </DropdownMenu.RadioItem>
//         </DropdownMenu.RadioGroup>

//         <DropdownMenu.Sub>
//           <DropdownMenu.SubTrigger />
//           <DropdownMenu.Portal>
//             <DropdownMenu.SubContent />
//           </DropdownMenu.Portal>
//         </DropdownMenu.Sub>

//         <DropdownMenu.Separator />
//         <DropdownMenu.Arrow />
//       </DropdownMenu.Content>
//     </DropdownMenu.Portal>
//   </DropdownMenu.Root>
// );
