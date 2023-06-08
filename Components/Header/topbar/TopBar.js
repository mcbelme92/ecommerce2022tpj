import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <a>
        {/* <Image className="Logotipo" alt="gaming" /> */}
        <Image alt="gaming" className="Logotipo" width={280} height={566} />
      </a>
    </Link>
  );
}
function Search() {
  const router = useRouter();
  const [searchStr, setSearchStr] = useState("");
  const [load, setLoad] = useState(false);

  //console.log(router);
  useEffect(() => {
    if (load) {
      router.push({
        pathname: "/search",
        query: { title: searchStr },
      });
    }
    setLoad(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);
  const escuchar = (e) => {
    router.replace("/search?title=");
  };

  return (
    <Input
      name=""
      id="search-game"
      icon={{ name: "search" }}
      //ESTO SE HIZO PARA PDOER USAR LA BARRA ESPACIADORA YA QUE NO SE PODIA USAR
      //sin embargo persiste el problema con la primer letra que se escribe ya que esta no se puede borrar cuando pones una letra
      //se le agrego " vacio ya que pone problema con el controller del input s"
      value={router.query.title || ""}
      onChange={(e) => setSearchStr(e.target.value)}
      onClick={escuchar}
    />
  );
}
