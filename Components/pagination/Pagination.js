import React from "react";
import { Pagination as PaginationSu } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function Pagination(props) {
  /* Destrucción del objeto props. */
  const { totalGames, page, limitPerPage } = props;
  /* Cálculo del número total de páginas. redondeado con ceil*/
  const totalPages = Math.ceil(totalGames / limitPerPage);
  const router = useRouter();
  const urlParse = queryString.parseUrl(router.asPath);

  const goToPage = (newPage) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };
  return (
    <div className="pagination">
      <PaginationSu
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        /* Una función de devolución de llamada que se llama cuando el usuario hace clic en un número
        de página. */
        onPageChange={(_, data) => goToPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
