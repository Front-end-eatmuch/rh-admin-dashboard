const filterMenuAllowed = (menu_list) => {
  const menu_allowed  = "all"
  console.log(menu_allowed)
  if (menu_allowed === "all") return menu_list;
  return menu_list.filter((menu) => {
    return (
      menu_allowed.includes(menu.value) ||
      (menu.children &&
        menu.children.filter((child) => {
          return menu_allowed.includes(child.value);
        }).length > 0)
    );
  });
};

export { filterMenuAllowed };
