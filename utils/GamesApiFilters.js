export const platformFilterUrl = `filters[$and][0][platform][title][$eq]`;
// esta url te devuevle todo ALL lo que contengan games api/games?populate=*&pagination[start]
export const gamesLimitPagination = `api/games?populate=*&pagination[start]`;
//url filtrado CONTADOR por plataforma
export const gamesCountUrl = "filters[$and][0][platform][url][$eq]";
//
export const filterOrderDes = "sort=createdAt:DESC";
export const filterInfoGame = "filters[$and][0][url][$eq]";
